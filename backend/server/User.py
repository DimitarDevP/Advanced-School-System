from flask import Flask, session, request, jsonify
from flask_mail import Message
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

from flaskSQL import *
from connect import *
from generateKey import genKey

class User:
    def __init__(self):
        pass


    def login(self, request):
        #
        # Expected Input - JSON data POST request
        #
        # {
        #   "email":
        #   "password":
        # }
        #
        # Returned data - user object and auth_key


        if not request.method == 'POST':
            return jsonify({
                "error_message" : "Bad request.",
                "error_code" : "400"
            })

        data = request.params
        user = fsql.read("""SELECT * FROM users WHERE email = %s AND _password = %s""", (data["email"], data["password"]), 0)
        
        if not isinstance(user, dict):
            return jsonify({
                "error_message" : "Email or Password is incorrect. Please try again.",
                "error_code" : "404"
            })

        [session.pop(key) for key in list(session.keys()) if (key == str(user["user_id"])+"auth_key")]
        session[str(user["user_id"])+"auth_key"] = genKey(64)
        
        return jsonify({
            "user" : user,
            "auth_key" : session[str(user["user_id"])+"auth_key"],
            "error_message" : "Success",
            "error_code" : "200"
        })
        

    def logout(self, request):
        #
        # Expected Input - JSON data POST request 
        #
        # auth_key


        if not request.method == 'POST':
            return jsonify({
                "error_message" : "Bad request.",
                "error_code" : "400"
            })

        data = request.params
        [session.pop(key) for key in list(session.keys()) if (session[key] == data["auth_key"])]
        
        return jsonify({
            "error_code" : "200", 
            "error_message" : "Success"
        })

        
    def register(self, request):
        #
        # Expected input - JSON data POST request
        #
        # {
        #   "user_role"
        #   "firstname"
        #   "lastname"
        #   "email"
        #   "password"
        #   "phone_number"
        #   "sex"
        #   "birth_date"
        #   "parent_name"
        #   "parent_lastname"
        #   "parent_phone"
        #   "salary"
        # }
        #
        # Returned data - user object and auth_key


        if not request.method == "POST":
            return jsonify({
                "error_message" : "Bad request.",
                "error_code" : "400"
            })

        data = request.params

        users = fsql.read(
            """SELECT * FROM users WHERE email = %s OR phone_number = %s""",
            (data['email'], data['phone_number'])
        )
        if len(users) != 0:
            return jsonify({
                "error_code" : "409",
                "error_message" : "Email or Phone already in use."
            })

        fsql.create(
            """INSERT INTO users (user_role, firstname, lastname, email, verified, _password, phone_number, sex, birth_date, parent_name, parent_lastname, parent_phone, present_status, salary, profile_picture) 
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)""",
            (data["user_role"], data["firstname"], data["lastname"], data["email"], 0, data["password"], data['phone_number'], data['sex'], data['birth_date'], data['parent_name'], data['parent_lastname'], data['parent_phone'], "Present", data['salary'], "/public/profile_pictures/default.png")
        )

        user = fsql.read(
            """SELECT * FROM users WHERE email = %s AND _password = %s""", 
            (data['email'], data['password']), 
            0
        )

        if not isinstance(user, dict):
            return jsonify({
                "error_message" : "Bad request.",
                "error_code" : "400"
            })

        [session.pop(key) for key in list(session.keys()) if (key == str(user["user_id"])+"auth_key")]
        session[str(user["user_id"])+"auth_key"] = genKey(64)
        
        self.send_validation_mail(user)

        return jsonify({
            "user" : user,
            "auth_key" : session[str(user["user_id"])+"auth_key"],
            "error_message" : "Success",
            "error_code" : "200"
        })

    
    def send_validation_mail(self, user):
        msg = MIMEMultipart('alternative')
        msg['Subject'] = "Email Verification"
        msg['From'] = "advancedschoolsystemservice@gmail.com"
        msg['To'] = user["email"]

        html = ("""
                <html>
                    <body   style='padding: 50px 20px; min-height: 330px; margin: auto; max-width: 450px; text-align:center; background: #BFC9CA'>
                        <h1 style='color: #5D6D7E; font-family: sans-serif;'>Verification Email</h1>
                        <h3 style='line-height: 1.8em; margin: 70px 0px; color: #5D6D7E; font-family: sans-serif;'>To verify your identity, Advanced School needs to authenticate the validity of the E-Mail address you provided. To do so, simply click the button below.</h3>
                        <a  style='text-decoration: none; background: #34495E; text-align: center; padding: 10px 20px; color: #FFF; font-family: sans-serif; font-weight: bold;' href='http://localhost:5000/api/user/validate_email?user_id=%s'>Verify</a>
                    </body>
                </html>
            """ %45 )
        
        msg.attach(MIMEText(html, 'html'))

        server = smtplib.SMTP("smtp.gmail.com", 587)
        server.starttls()
        server.login("advancedschoolsystemservice@gmail.com", "asspass123!@#")
        server.sendmail("advancedschoolsystemservice@gmail.com", user["email"], msg.as_string())
        server.quit()
        
    def update_image(self, request):
        #
        # Expected input - JSON data POST request
        #
        # {
        #   "auth_key",
        #   "user_id",
        #   "image",
        # }


        if not request.method == 'PATCH':
            return jsonify({
                "error_message" : "Bad request.",
                "error_code" : "400"
            })
            
        image = request.files['image']
        data = request.params
        
        if not self.auth_user(data['auth_key']):
            return jsonify({
                "error_message" : "Session Expired.",
                "error_code" : "401"
            })
        
        image.save("./public/profile_pictures/user_p_picture_id_"+data['user_id']+".jpg")
        fsql.update("""UPDATE users SET profile_picture = %s WHERE user_id = %s""", ("/public/profile_pictures/user_p_picture_id_"+data['user_id']+".jpg", data['user_id']))
        
        return jsonify({
            "error_code" : "200", 
            "error_message" : "Success"
        })  


    def validate_email(self, request):
        # Expected input - GET request
        # get(user_id)


        if not request.method == 'GET':
            return jsonify({
                "error_message" : "Bad request.",
                "error_code" : "400"
            })

        user_id = request.args.get('user_id')
        fsql.update("""UPDATE users SET verified = %s WHERE user_id = %s""", (1, user_id))
        return jsonify({
            "error_message" : "Success",
            "error_code" : "200"
        })


    def auth_user(self, auth_key):
        for key in session.keys():
            if session[key] == auth_key:
                return True
            else:
                continue

        return False
