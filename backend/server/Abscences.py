from flask import Flask, session, jsonify, request
import datetime
import jwt
import time


from connect import *


class Abscences:
    def __init__(self):
        pass

    def register_rfid_present_status(self, request):
        #
        # Expected input - JSON object POST request
        #
        # {
        #   "grade": 
	    #   "class": 
	    #   "period":
	    #   "present_ids": []
        # }


        if not request.method == 'POST':
            return jsonify({
                "error_message" : "Bad request.",
                "error_code" : "400"
            })

        data = request.params

        class_id = fsql.read("""SELECT * FROM classes WHERE grade = %s AND class = %s""", (data["grade"], data["class"]), 0)['class_id']
        students = fsql.read("""SELECT * FROM enrolled_classes WHERE class_id = %s""", (str(class_id)))
        today = time.strftime('%Y-%d-%m')
        
        for student in students:
            if not student["student_id"] in data["present_ids"]:
                fsql.create("""INSERT INTO abscences (student_id, _status, _description, _date, _period) VALUES (%s, %s, %s, %s, %s)""",
                    (student["student_id"], "Pending", "Student was late for class", str(today), data['period'])
                )

        return jsonify({
            "error_message" : "Success",
            "error_code" : "200"
        })

    
    def add_abscences(self, request):
        #
        # Expected input - JSON object POST request
        #
        # {
        #   "abscence": {
        #      "description":
        #      "period":
        #      "user_id":
        #   },
        #   "user" : {
        #       "user_id"
        #       "auth_key":
        #   }
        # }


        if not request.method == 'POST':
            return jsonify({
                "error_message" : "Bad request.",
                "error_code" : "400"
            })

        data = request.params

        professor = fsql.read("""SELECT * FROM users WHERE user_id = %s""", (str(data["user"]["user_id"], )), 0)

        if not professor['user_role'] == "Professor":
            return jsonify({
                "error_message" : "Access Denied. Unauthorized user",
                "error_code" : "403"
            })

        if not self.auth_user(data["user"]['auth_key']):
            return jsonify({
                "error_message" : "Session Expired.",
                "error_code" : "401"
            })

        today = time.strftime('%Y-%d-%m')

        fsql.create("""INSERT INTO abscences (student_id, _status, _description, _date, _period) VALUES (%s, %s, %s, %s, %s)""",
            (data["abscence"]['user_id'], "Prazno", data["abscence"]["_description"], today, data['abscence']['_period'])
        )

        abscences = fsql.read("""SELECT * FROM abscences""", ())

        return jsonify({
            "abscences": abscences,
            "error_message" : "Success",
            "error_code" : "200"
        })

            
        

    def get_abscences(self, request):
        #
        # Expected input - JSON object POST request
        #
        # {
        #   "auth_key",
        #   "user_id"
        # }
        #
        # Returned data - All absences from a class where "professor_id" is "user_id"
        #


        if not request.method == "POST":
            return jsonify({
                "error_message" : "Bad request.",
                "error_code" : "400"
            })

        data = request.params

        # if not self.auth_user(data['auth_key']):
        #     return jsonify({
        #         "error_message" : "Session Expired.",
        #         "error_code" : "401"
        #     })

        # _class = fsql.read("""SELECT * FROM classes WHERE professor_id = %s""", (str(data['user_id'])), 0)["class_id"]
        # students = fsql.read("""SELECT * FROM enrolled_classes WHERE class_id = %s""", (str(_class)))
        # abscences = list()

        # for student in students:
        #     student_abscnecnes = fsql.read("""SELECT * FROM abscences WHERE student_id = %s""", (str(student['student_id'])))
        #     for abscence in student_abscnecnes:
        #         abscences.append(abscence)
        returned_abscences = list()
        abscences = fsql.read("""SELECT * FROM abscences""", (), 1)
    
        return jsonify({
            "abscences" : abscences,
            "error_code" : "200",
            "error_message" : "Success"
        })  


    def set_abscences_status(self, request):
        #
        # Expected input - JSON object POST request
        #
        # {
        #   "user": {
        #     "auth_key": 
        #     "user_id": 
        #   },
        #   "abscence" : {
        #     "_date": 
        #     "_description": 
        #     "_period":
        #     "_status":
        #     "absence_id":
        #     "student_id":
        #   }
        # }


        if not request.method == 'POST':
            return jsonify({
                "error_message" : "Bad request.",
                "error_code" : "400"
            })

        data = request.params

        professor = data['user']
        abscences = data['abscences']

        if not self.auth_user(professor['auth_key']):
            return jsonify({
                "error_message" : "Session Expired.",
                "error_code" : "401"
            })

        class_id = fsql.read("""SELECT * FROM classes WHERE professor_id = %s""", (str(professor['user_id'])), 0)["class_id"]
        student = fsql.read("""SELECT * FROM enrolled_classes WHERE class_id = %s AND student_id = %s""", (class_id, abscences[0]['student_id']), 0)

        if not isinstance(student, dict):
            return jsonify({
                "error_message" : "Student not found in database",
                "error_code" : "404"
            })
            
        for abscence in abscences:
            fsql.update("""UPDATE abscences SET _status = %s, _description = %s WHERE absence_id = %s""", 
            (abscence['_status'], abscence['_description'], abscence['abscence_id'])
            )
        
        abscences = fsql.read("""SELECT * FROM abscences""", ())
        
        return jsonify({
            "abscences": abscences,
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
            return True
        except:
            return True