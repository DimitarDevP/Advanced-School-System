from Flabstraction.connect import app, jwt, fcfg
from flask import request, jsonify, abort
from flask_jwt_extended import jwt_required

from routes.User import User, UserImages, UserAuth, UserTypes, Genders
from routes.Subjects import Subjects, SubjectGroups, EnrolledSubjects, SubjectEnteries
from routes.Grades import Grades
from routes.Abscences import Abscences, AbscenceStatuses
from routes.Classes import Classes, ClassEnrollments, Areas
from routes.Assignments import Assignments, AssignmentEntries


# ==================================================================================== #

users = User()
images = UserImages()
auth = UserAuth()
usertypes = UserTypes()
genders = Genders()

@app.route('/api/user/login', methods=["POST"])
def user_login():
    return auth.login(request)

@app.route('/api/user/verify', methods=["GET"])
def user_verify():
    return auth.verify(request)

@app.route('/api/user/users', methods=["POST", "GET", "PUT", "DELETE"])
def user_route():
    return fcfg.create_routes(request, users)

@app.route('/api/user/images', methods=["POST", "GET", "PUT", "DELETE"])
def images_route():
    return fcfg.create_routes(request, images)

@app.route('/api/user/types', methods=["POST", "GET", "PUT", "DELETE"])
def types_route():
    return fcfg.create_routes(request, usertypes)

@app.route('/api/user/genders', methods=["POST", "GET", "PUT", "DELETE"])
def genders_route():
    return fcfg.create_routes(request, genders)

# ==================================================================================== #


# ==================================================================================== #

subjects = Subjects()
groups = SubjectGroups()
enrolls = EnrolledSubjects()
enteries = SubjectEnteries()

@app.route('/api/subject/subjects', methods=["POST", "GET", "PUT", "DELETE"])
def subjects_route():
    return fcfg.create_routes(request, subjects)

@app.route('/api/subject/groups', methods=["POST", "GET", "PUT", "DELETE"])
def subject_groups_route():
    return fcfg.create_routes(request, groups)

@app.route('/api/subject/enrolls', methods=["POST", "GET", "PUT", "DELETE"])
def subject_enrolls_route():
    return fcfg.create_routes(request, enrolls)

@app.route('/api/subject/enteries', methods=["POST", "GET", "PUT", "DELETE"])
def subject_enteries_route():
    return fcfg.create_routes(request, enteries)
    

# ==================================================================================== #


# ==================================================================================== #

grades = Grades()

@app.route('/api/grade/grades', methods=["POST", "GET", "PUT", "DELETE"])
def grades_routes():
    return fcfg.create_routes(request, grades)

# ==================================================================================== #


# ==================================================================================== #

abscences = Abscences()
abscencestatuses = AbscenceStatuses()

@app.route('/api/abscence/abscences', methods=["POST", "GET", "PUT", "DELETE"])
def abscences_routes():
    return fcfg.create_routes(request, abscences)

@app.route('/api/abscence/statuses', methods=["POST", "GET", "PUT", "DELETE"])
def abscence_statuses_routes():
    return fcfg.create_routes(request, abscencestatuses)

# ==================================================================================== #


# ==================================================================================== #

assignments = Assignments()
assignmententries = AssignmentEntries()

@app.route('/api/assignment/assignments', methods=["POST", "GET", "PUT", "DELETE"])
def assignments_routes():
    return fcfg.create_routes(request, assignments)

@app.route('/api/assignment/enteries', methods=["POST", "GET", "PUT", "DELETE"])
def assignment_entries_routes():
    return fcfg.create_routes(request, assignmententries)

# ==================================================================================== #


# ==================================================================================== #

classes = Classes()
classenrollments = ClassEnrollments()
areas = Areas()

@app.route('/api/class/classes', methods=["POST", "GET", "PUT", "DELETE"])
def classes_routes():
    return fcfg.create_routes(request, classes)

@app.route('/api/class/enrollments', methods=["POST", "GET", "PUT", "DELETE"])
def class_enrollment_routes():
    return fcfg.create_routes(request, classenrollments)

@app.route('/api/class/areas', methods=["POST", "GET", "PUT", "DELETE"])
def class_areas_routes():
    return fcfg.create_routes(request, areas)

# ==================================================================================== #


if __name__ == "__main__":
    app.run("0.0.0.0", "5000", True)