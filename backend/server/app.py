# Thirdparty
from flask import Flask, send_from_directory
from flask import request
from datetime import timedelta
from flask_cors import *
from flask_jwt_extended import create_access_token
import jwt
import pprint

# Application
from connect import app
from User import *
from Abscences import *
from Subjects import *
from Classes import *
from Grades import *
from Assignments import *

user = User()
abscences = Abscences()
subjects = Subjects()
classes = Classes()
grades = Grades()
assignments = Assignments()

@app.route('/api/user/login', methods=['POST'])
def login():
    return user.login(request)

@app.route('/public/user/profile/<path:filename>', methods=['GET'])
def test(filename):
    return send_from_directory("./public/profile_pictures/", filename, as_attachment=True)

@app.route('/public/assignments/<path:filename>')
def file(filename):
    return send_from_directory("./public/assignments/", filename, as_attachment=True)

@app.route('/api/user/logout', methods=['POST'])
def logout():
    return user.logout(request)

@app.route('/api/user/update_image', methods=['PATCH'])
def update_image():
    return user.update_image(request)

@app.route('/api/user/register', methods=['POST'])
def register():
    return user.register(request)

@app.route('/api/user/validate_email', methods=['GET'])
def validate_email():
    return user.validate_email(request)

@app.route('/api/user/get_all_users', methods=['POST'])
def get_all_users():
    return user.get_all_users(request)

@app.route("/api/abscences/register_rfid_present_status", methods=['POST'])
def register_rfid_present_status():
    return abscences.register_rfid_present_status(request)

@app.route("/api/abscences/add_abscences", methods=["POST"])
def add_abscences():
    return abscences.add_abscences(request)

@app.route("/api/abscences/set_abscences_status", methods=["POST"])
def set_abscences_status():
    return abscences.set_abscences_status(request)

@app.route("/api/abscences/get_abscences", methods=['POST'])
def get_abscences():
    return abscences.get_abscences(request)

@app.route("/api/subjects/create_subject", methods=["POST"])
def create_subject():
    return subjects.create_subject(request)

@app.route("/api/subjects/enroll_subject", methods=["POST"])
def enroll_subject():
    return subjects.enroll_subject(request)

@app.route('/api/subjects/get_subject', methods=['GET'])
def get_subject():
    return subjects.get_subject(request)

@app.route('/api/subjects/get_all_subjects', methods=['GET'])
def get_all_subjects():
    return subjects.get_all_subjects(request)

@app.route('/api/subjects/get_enrolled_subjects', methods=['GET'])
def get_enrolled_subjects():
    return subjects.get_enrolled_subjects(request)

@app.route("/api/subjects/get_subject_classes", methods=["POST"])
def get_subject_classes():
    return subjects.get_subject_classes(request)

@app.route("/api/classes/get_class", methods=["POST"])
def get_class():
    return classes.get_class(request)

@app.route("/api/classes/get_homeroom_classes", methods=["POST"])
def get_homeroom_classes():
    return classes.get_homeroom_classes(request)

@app.route("/api/classes/create_class", methods=["POST"])
def create_class():
    return classes.create_class(request)

@app.route("/api/classes/enroll_class", methods=["POST"])
def enroll_class():
    return classes.enroll_class(request)

@app.route("/api/grades/get_student_grades", methods=["POST"])
def get_student_grades():
    return grades.get_student_grades(request)

@app.route("/api/grades/get_subject_grades", methods=["GET"])
def get_subject_grades():
    return grades.get_subject_grades(request)

@app.route("/api/grades/set_grade", methods=["POST"])
def set_grade():
    return grades.set_grade(request)

@app.route("/api/assignments/create_assignments", methods=["POST"])
def create_assignments():
    return assignments.create_assignments(request)

@app.route("/api/assignments/set_assignment_status", methods=["POST"])
def set_assignment_status():
    return assignments.set_assignment_status(request)

@app.route("/api/assignments/get_assignments", methods=["GET"])
def get_assignments():
    return assignments.get_assignments(request)

@app.route("/api/assignments/add_submission", methods=["PATCH"])
def add_submission():
    return assignments.add_submission(request)

if __name__ == "__main__":
      app.run(debug=True)