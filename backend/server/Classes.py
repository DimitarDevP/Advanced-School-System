# Thirdparty 
from flask import Flask, session, jsonify, request
import time    

# Application
from connect import *

class Classes:
    def __init__(self):
        pass

    def get_class(self, request):
        if not request.method == 'POST':
            return jsonify({
                "error_message" : "Bad request.",
                "error_code" : "400"
            })

        data = request.params

        class_id = fsql.read("""SELECT * FROM classes WHERE grade = %s AND class = %s""", (data["grade"], data["class"]), 0)["class_id"]
        students = fsql.read("""SELECT * FROM enrolled_classes WHERE class_id = %s""", (str(class_id)))
        
        students_array = list()
        
        for student in students:
            student = fsql.read("""SELECT * FROM users WHERE user_id = %s""", (str(student['student_id'])), 0)
            students_array.append(student)
        

        return jsonify({
            "students" : students_array,
            "error_code" : "200",
            "error_message" : "Success"
        })
    
    def create_class(self, request):
        if not request.method == 'POST':
            return jsonify({
                "error_message" : "Bad request.",
                "error_code" : "400"
            })
        
        data = request.params
        user = data['user']
        _class = data["class"]

        if user["user_role"] != "Professor":
            return jsonify({
                "error_message" : "Access Denied. Unauthorized user",
                "error_code" : "403"
            })
        
        if not self.auth_user(data['auth_key']):
            return jsonify({
                "error_message" : "Session Expired.",
                "error_code" : "401"
            })
        

        fsql.create("""INSERT INTO classes (professor_id, grade, class, _year) VALUES (%s, %s, %s, %s)""", (user["user_id"], _class["grade"], _class["class"], _class["year"]))

        return jsonify({
            "error_code" : "200",
            "error_message" : "Success"
        })

    def enroll_class(self, request):
        if not request.method == 'POST':
            return jsonify({
                "error_message" : "Bad request.",
                "error_code" : "400"
            })
        
        data = request.params
        user = data['user']
        _class = data["class"]
        print(user["user_role"])

        if user["user_role"] != "Student":
            return jsonify({
                "error_message" : "Access Denied. Unauthorized user",
                "error_code" : "403"
            })
        
        if not self.auth_user(data['auth_key']):
            return jsonify({
                "error_message" : "Session Expired.",
                "error_code" : "401"
            })

        class_id = fsql.read("""SELECT * FROM classes WHERE grade = %s AND class = %s AND _year = %s""", (_class["grade"], _class["class"], _class["year"]), 0)["class_id"]
        fsql.create("""INSERT INTO enrolled_classes (class_id, student_id) VALUES (%s, %s)""", (class_id, user['user_id']))
        
        return jsonify({
            "error_code" : "200",
            "error_message": "Success"
        })


    def auth_user(self, auth_key):
        for key in session.keys():
            if session[key] == auth_key:
                return True
            else:
                continue

        return False