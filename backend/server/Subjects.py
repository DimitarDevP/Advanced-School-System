from flask import Flask, session, jsonify, request
import time
import datetime
import jwt

from connect import *

class Subjects:
    def __init__(self):
        pass

    def create_subject(self, request):
        #
        # Expected input - JSON data POST request
        #
        # {
        #   "professor_id"
        #   "subject_name"
        #   "subject_description"
        # }


        if not request.method == 'POST':
            return jsonify({
                "error_message" : "Bad request.",
                "error_code" : "400"
            })

        data = request.params
        professor = fsql.read("""SELECT * FROM users WHERE user_id = %s""", (data['professor_id']), 0)

        if professor["user_role"] != "Professor":
            return jsonify({
                "error_message" : "Access Denied. Unauthorized user",
                "error_code" : "403"
            })

        if not self.auth_user(data['auth_key']):
            return jsonify({
                "error_message" : "Session Expired.",
                "error_code" : "401"
            })
        
        fsql.create("""INSERT INTO subjects (professor_id, subject_name, subject_description) VALUES (%s, %s, %s)""", (data["professor_id"], data["subject_name"], data["subject_description"]))

        return jsonify({
            "error_code" : "200", 
            "error_message" : "Success"
        })


    def get_subject_classes(self, request):
        if not request.method == 'POST':
            return jsonify({
                "error_message" : "Bad request.",
                "error_code" : "400"
            })

        data = request.params

        enrolls = fsql.read("""SELECT * FROM enrolled_subjects WHERE subject_id = %s""", (data["subject_id"], ))
        student_classes = list()

        for enroll in enrolls:
            student_class = fsql.read("""SELECT * FROM enrolled_classes WHERE student_id = %s""", (enroll["student_id"], ), 0)
            student_classes.append(student_class)

        classes = []
        for class_id in student_classes:
            _class = fsql.read("""SELECT* FROM classes WHERE class_id = %s""", (class_id["class_id"], ), 0)
            if not _class in classes:
                classes.append(_class)

        return jsonify({"classes" : classes})

    
    def enroll_subject(self, request):
        #
        # Expected input - JSON data POST request
        #
        # {
        #     "subject_id"
        #     "student_id"
        # }


        if not request.method == "POST":
            return jsonify({
                "error_message" : "Bad request.",
                "error_code" : "400"
            })

        data = request.params
        
        if not self.auth_user(data['auth_key']):
            return jsonify({
                "error_message" : "Session Expired.",
                "error_code" : "401"
            })

        fsql.create("""INSERT INTO enrolled_subjects (subject_id, student_id) VALUES (%s, %s)""", (data["subject_id"], data["student_id"]))

        return jsonify({
            "error_code" : "200", 
            "error_message" : "Success"
        })

    def get_subject(self, request):
        if not request.method == "GET":
            return jsonify({
                "error_message" : "Bad request.",
                "error_code" : "400"
            })

        subject_id = request.args.get('subject_id')

        subject = fsql.read("""SELECT * FROM subjects WHERE subject_id = %s""", (str(subject_id)), 0)

        return jsonify({
            "subject" : subject,
            "error_message" : "Success",
            "error_code" : "200"
        })

    def get_all_subjects(self, request):
        if not request.method == "GET":
            return jsonify({
                "error_message" : "Bad request.",
                "error_code" : "400"
            })

        subjects = fsql.read("""SELECT * FROM subjects""", ())

        return jsonify({
            "subjects" : subjects,
            "error_message" : "Success",
            "error_code" : "200"
        })

    def get_enrolled_subjects(self, request):
        if not request.method == "GET":
            return jsonify({
                "error_message" : "Bad request.",
                "error_code" : "400"
            })

        student_id = request.args.get('user_id')

        enrolled_subjects = fsql.read("""SELECT * FROM enrolled_subjects WHERE student_id = %s""", (str(student_id)))

        subjects = list()

        for subject in enrolled_subjects:
            subjects.append(fsql.read("""SELECT * FROM subjects WHERE subject_id = %s""", (str(subject["subject_id"])), 0))

        return jsonify({
            "enrolled_subjects" : subjects,
            "error_code" : "200",
            "error_message" : "Success"
        })


    def auth_user(self, auth_key):
        try:
            beginning = auth_key[:0]
            ending = auth_key[2:]
            auth_key = beginning + ending
            auth_key = auth_key[:len(auth_key) - 1]
            jwt.decode(auth_key, "randKey")
            print(auth_key)
            return False
        except:
            return True
