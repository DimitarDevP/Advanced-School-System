# Thirdparty 
from flask import Flask, session, jsonify, request
import time
import datetime
import jwt

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

        _class = fsql.read("""SELECT * FROM classes WHERE class_id = %s""", (data["class_id"], ), 0)
        students = fsql.read("""SELECT * FROM enrolled_classes WHERE class_id = %s""", (_class["class_id"], ))
        students_array = list()
        
        for student in students:
            student = fsql.read("""SELECT * FROM users WHERE user_id = %s""", (student['student_id'], ), 0)
            students_array.append(student)
        

        return jsonify({
            "class": _class,
            "students" : students_array,
            "error_code" : "200",
            "error_message" : "Success"
        })

    def get_homeroom_classes(self, request):
        if not request.method == 'POST':
            return jsonify({
                "error_message" : "Bad request.",
                "error_code" : "400"
            })

        data = request.params
        if data["user_role"] == "Professor":
            _classes = fsql.read("""SELECT * FROM classes WHERE professor_id = %s""", (data["user_id"], ))
        else:
            ids = fsql.read("""SELECT * FROM enrolled_classes WHERE student_id = %s""", (data["user_id"], ))
            _classes = []
            for _id in ids:
                _class = fsql.read("""SELECT * FROM classes WHERE class_id = %s""", (_id["class_id"], ), 0)
                _classes.append(_class)

        return jsonify({
            "currentUserClasses": _classes,
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

        if data["user_role"] != "Professor":
            return jsonify({
                "error_message" : "Access Denied. Unauthorized user",
                "error_code" : "403"
            })
        
        # if not self.auth_user(data['auth_key']):
        #     return jsonify({
        #         "error_message" : "Session Expired.",
        #         "error_code" : "401"
        #     })
        

        fsql.create("""INSERT INTO classes (professor_id, grade, class, _year) VALUES (%s, %s, %s, %s)""", (data["user_id"], data["grade"], data["class"], data["year"]))

        createdClass = fsql.read("""SELECT * FROM classes WHERE professor_id = %s AND grade = %s AND class = %s  ANd _year = %s""", (data["user_id"], data["grade"], data["class"], data["year"]), 0)

        return jsonify({
            "class" : createdClass,
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

        if user["user_role"] != "Student":
            return jsonify({
                "error_message" : "Access Denied. Unauthorized user",
                "error_code" : "403"
            })
        if not self.auth_user(user['auth_key']):
            return jsonify({
                "error_message" : "Session Expired.",
                "error_code" : "401"
            })

        _class = fsql.read("""SELECT * FROM classes WHERE grade = %s AND class = %s AND _year = %s""", (_class["grade"], _class["class"], _class["year"]), 0)
        fsql.create("""INSERT INTO enrolled_classes (class_id, student_id) VALUES (%s, %s)""", (_class["class_id"], user['user_id']))
        
        return jsonify({
            "class": _class,
            "error_code" : "200",
            "error_message": "Success"
        })


    def auth_user(self, auth_key):
        try:
            beginning = auth_key[:0]
            ending = auth_key[2:]
            auth_key = beginning + ending
            auth_key = auth_key[:len(auth_key) - 1]
            jwt.decode(auth_key, "randKey")
            return True
        except:
            return True