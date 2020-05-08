# Thirdparty
from flask import Flask, session, jsonify, request
import time
import datetime
import jwt

# Application
from connect import *


class Grades:
    def __init__(self):
        pass

    def get_student_grades(self, request):
        if not request.method == "POST":
            return jsonify({"error_message": "Bad reqiest", "error_code": "400"})

        data = request.params

        if not self.auth_user(data["auth_key"]):
            return jsonify({"error_message": "Session Expired.", "error_code": "401"})

        student_grades = fsql.read(
            """SELECT * FROM marks WHERE student_id = %s""", (data["user"]["user_id"],)
        )

        return jsonify(
            {"grades": student_grades, "error_message": "Success", "error_code": "200"}
        )

    def get_subject_grades(self, request):
        if not request.method == "GET":
            return jsonify({"error_message": "Bad reqiest", "error_code": "400"})

        subject_id = request.args.get("subject_id")
        student_id = request.args.get("student_id")

        grades = fsql.read(
            """SELECT * FROM marks WHERE subject_id = %s AND student_id = %s""",
            (subject_id, student_id),
        )

        quarters = [
            {"activity": "", "exam": ""},
            {"activity": "", "exam": ""},
            {"activity": "", "exam": ""},
            {"activity": "", "exam": ""},
        ]

        for i in range(1, 5):
            for grade in grades:
                if str(grade["quarter"]) == str(i):
                    print(True)
                    quarters[i - 1][grade["_type"]] = grade["_value"]

        return jsonify(
            {"subject_grades": quarters, "error_message": "Success", "error_code": "200"}
        )

    def set_grade1(self, request):
        if not request.method == "POST":
            return jsonify({"error_message": "Bad reqiest", "error_code": "400"})

        data = request.params
        professor = data["user"]
        grade = data["grade"]

        print(grade)

        if not self.auth_user(professor["auth_key"]):
            return jsonify({"error_message": "Session Expired.", "error_code": "401"})

        fsql.create(
            """INSERT INTO marks (student_id, subject_id, quarter, _value, _type) VALUES (%s, %s, %s, %s, %s)""",
            (
                grade["student_id"],
                grade["subject_id"],
                grade["quarter"],
                grade["value"],
                grade["type"],
            ),
        )

        return jsonify({"error_message": "Success", "error_code": "200"})

    def set_grade(self,request):
        if not request.method == "POST":
            return jsonify({"error_message": "Bad reqiest", "error_code": "400"})

        data = request.params
        i = 1
        for quarter in data["quarters"]:
            for key, value in quarter.items():
                key_res = fsql.read("""SELECT * FROM marks WHERE student_id = %s AND subject_id = %s AND  quarter = %s AND _type = %s""",
                (data["student_id"], data["subject_id"], i, key), 0)
                if not isinstance(key_res, dict):
                    if value != "":
                        print(data["student_id"], data["subject_id"], value, i, key)
                        fsql.create("""INSERT INTO marks (student_id, subject_id, _value, quarter, _type) VALUES (%s, %s, %s, %s, %s)""",
                            (data["student_id"], data["subject_id"], value, i, key)
                        )
                else:
                    if value != "":
                        print(value, data["student_id"], data["subject_id"], i, key)
                        fsql.update("""UPDATE marks SET _value = %s WHERE student_id = %s AND subject_id = %s AND quarter = %s AND _type = %s""",
                            (value, data["student_id"], data["subject_id"], i, key)
                        )
            i = i + 1

        grades = fsql.read(
            """SELECT * FROM marks WHERE subject_id = %s AND student_id = %s""",
            (data["subject_id"], data["student_id"]),
        )

        quarters = [
            {"activity": "", "exam": ""},
            {"activity": "", "exam": ""},
            {"activity": "", "exam": ""},
            {"activity": "", "exam": ""},
        ]

        for i in range(1, 5):
            for grade in grades:
                if str(grade["quarter"]) == str(i):
                    print(True)
                    quarters[i - 1][grade["_type"]] = grade["_value"]

        return jsonify(
            {"subject_grades": quarters, "error_message": "Success", "error_code": "200"}
        )

    def auth_user(self, auth_key):
        try:
            beginning = auth_key[:0]
            ending = auth_key[2:]
            auth_key = beginning + ending
            auth_key = auth_key[: len(auth_key) - 1]
            jwt.decode(auth_key, "randKey")
            print(auth_key)
            return True
        except:
            return True
