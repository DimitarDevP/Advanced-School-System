from flask import Flask, session, jsonify, request
from werkzeug.utils import secure_filename
import time
import datetime
import jwt

from connect import *

class Assignments:
    def __init__(self):
        pass

    def create_assignments(self, request):
        
        if not request.method == "POST":
            return jsonify({
                "error_message" : "Bad request.",
                "error_code" : "400"
            })

        data = request.params
        user = data['user']
        assignment = data['assignment']

        # if not self.auth_user(user["auth_key"]):
        #     return jsonify({
        #         "error_message" : "Session Expired.",
        #         "error_code" : "401"
        #     })

        if not user["user"]["user_role"] == "Professor":
            return jsonify({
                "error_message" : "Access Denied. Unauthorized user",
                "error_code" : "403"
            })

        fsql.create("INSERT INTO assignments (creator_id, assignment_name, assignemnt_description, assignment_status) VALUES (%s, %s, %s, %s)", 
            (user["user"]["user_id"], assignment["name"], assignment["description"], "Opened")
        )

        return jsonify({
            "error_code" : "200", 
            "error_message" : "Success"
        })


    def set_assignment_status(self, request):

        if not request.method == "POST":
            return jsonify({
                "error_message" : "Bad request.",
                "error_code" : "400"
            })

        data = request.params
        user = data['user']
        assignment = data['assignment']
        status = data["status"]

        if not self.auth_user(user["auth_key"]):
            return jsonify({
                "error_message" : "Session Expired.",
                "error_code" : "401"
            })

        if not user["user"]["user_role"] == "Professor":
            return jsonify({
                "error_message" : "Access Denied. Unauthorized user",
                "error_code" : "403"
            })

        fsql.update("""UPDATE assignments SET assignment_status = %s WHERE assignment_id = %s""", (status, assignment["assignment_id"]))

        return jsonify({
            "error_code" : "200", 
            "error_message" : "Success"
        })


    def get_assignments(self, request):

        if not request.method == "GET":
            return jsonify({
                "error_message" : "Bad request.",
                "error_code" : "400"
            })

        assignments = fsql.read("""SELECT * FROM assignments""", ())
        submissions = fsql.read("""SELECT * FROM assignment_submissions""", ())
        for assignment in assignments:
            assignment["submissions"] = list()
            for submission in submissions:
                if assignment["assignment_id"] == submission["assignment_id"]:
                    assignment["submissions"].append(submission)

        return jsonify({
            "assignments" : assignments,
            "error_code" : "200", 
            "error_message" : "Success"
        })

    
    def get_submission(self, request):
        
        if not request.method == "GET":
            return jsonify({
                "error_message" : "Bad request.",
                "error_code" : "400"
            })

        

    def add_submission(self, request):

        if not request.method == "POST":
            return jsonify({
                "error_message" : "Bad request.",
                "error_code" : "400"
            })

        if(request.args.get('assignment_id')):
            assignments = fsql.read("""SELECT * FROM assignments WHERE assignment_id = %s""", (request.args.get('assignment_id'), ), 0)
        else:
            assignments = fsql.read("""SELECT * FROM assignments""", ())

        data = request.params

        if not self.auth_user(data["auth_key"]):
            return jsonify({
                "error_message" : "Session Expired.",
                "error_code" : "401"
            })

        submission = request.files['submission']
        filename = secure_filename(submission.filename)
        extension = filename.split(".")[len(filename.split(".")) - 1]

        submission_file = "/public/assignments/student_" + str(data["user_id"]) + "_assignemnt_" + str(data["assignment_id"]) + "_submission." + extension
        submission.save("."+submission_file)

        fsql.create("""INSERT INTO assignment_submissions (submitter_id, assignment_id, submission_file) VALUES (%s, %s, %s)""", (data["user_id"], data["assignment_id"], submission_file))

        return jsonify({
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
            return False
        except:
            return True

