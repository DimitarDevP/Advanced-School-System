from Flabstraction.connect import sql, STATIC_PATH, helper, jsonify

class Subjects:
    def __init__(self):
        pass

    def create(self, request):
        subject = request.params["subject"]
        query = sql.prepare(subject, "_subjects")

        conn = sql.open()

        sql.execute(query["string"], query["params"], conn)
        subject = sql.read("""SELECT * FROM _subjects WHERE _id = LAST_INSERT_ID()""", (), conn)
        
        if sql.close() == False:
            abort(500)

        return jsonify({
            "subject" : _subject
        })

    def read(self, request):
        subjects = sql.read("""SELECT * FROM _subjects""", (), [], True, True)

        return jsonify({
            "subjects" : subjects
        })

    def update(self, request):
        subject = request.params["_subject"]
        id = subject["_id"]
        query = sql.prepare(_subject, "_subjects", "update", "_id")

        sql.execute(query["string"], query["params"], [], True)
        subject["_id"] = id

        return jsonify({
            "subject" : subject
        })

    def delete(self, request):
        _id = request.params["id"]

        if sql.execute("""DELETE * FROM _subjects WHERE _id = %s""", (_id), [], True) == False:
            abort(500)

        return jsonify({
            "id" : id
        })

class SubjectGroups:
    def __init__(self):
        pass

    def create(self, request):
        # Getting data from request
        subject_group = request.params["subject_group"]

        # Preparing query for execution
        query = sql.prepare(subject_group, "_subject_groups")

        # Opening connection
        conn = sql.open()
        
        # Executing queries
        sql.execute(query["string"], query["params"], conn)
        subject_group = sql.read("""SELECT * FROM _subject_groups WHERE _id = LAST_INSERT_ID()""", (), conn)

        # Closing connection
        if sql.close() == False:
            abort(500)

        # Returning
        return jsonify({
            "group" : subject_group
        })

    def read(self, request):
        # Executing an autocimmit query
        subject_groups = sql.read("""SELECT * FROM _subject_groups""", (), [], True, True)

        # Returning 
        return jsonify({
            "groups" : subject_groups
        })

    def update(self, request):
        # Getting data from request
        subject_group = request.params["subject_group"]
        _id = _subject_group["_id"]

        # Preparing query for execution
        query = sql.prepare(subject_group, "_subject_groups", "update", "_id")

        # Running a query with implicit autocommit
        if sql.execute(query["string"], query["params"], [], True) == False:
            abort(500)
        
        subject_group["_id"] = _id

        return jsonify({
            "group" : subject_group
        })

    def delete(self, request):
        _id = request.params["id"]

        if sql.execute("""DELETE * FROM _subject_groups WHERE _id = %s""", (_id), [], True)  == False:
            abort(500)

        return jsonify({
            "id" : _id
        })

class EnrolledSubjects:
    def __init__(self):
        pass

    def create(self, request):
        # Getting data from request
        students = request.params["students"]
        subject_group = request.params["subject_group"]

        # Preparing query for execution
        queries = []
        for student in students:
            enroll = dict()
            enroll["_student_id"] = student["_id"]
            enroll["_subject_group_id"] = subject_group["_id"]
            queries.push(sql.prepare(enroll, "_enrolled_subjects"))

        # Opening connection
        conn = sql.open()
        
        # Executing queries
        enrolled_subjects = []
        for q in queries:
            sql.execute(q["string"], q["params"], conn)
            enroll = sql.read("""SELECT * FROM _enrolled_subjects WHERE _id = LAST_INSERT_ID()""", (), conn)
            enrolled_subjects.push(enroll)

        # Closing connection
        if sql.close() == False:
            abort(500)

        # Returning
        return jsonify({
            "enrolls" : enrolled_subjects
        })

    def read(self, request):
        # Executing an autocimmit query
        enrolled_subjects = sql.read("""SELECT * FROM _enrolled_subjects""", (), [], True, True)

        # Returning 
        return jsonify({
            "enrolls" : enrolled_subjects
        })

    def update(self, request):
        # Getting data from request
        students = request.params["students"]
        groupd_id = students[0]["_subject_group_id"]
        _ids = []
        
        for s in students:
            _ids.push(s["_id"])

        # Opening connection
        conn = sql.open()

        enrolls = sql.read("""SELECT _student_id FROM _enrolled_subjects WHERE _subject_group_id = %s""", (groupd_id), conn)

        for e in enrolls:
            if int(e["_student_id"]) not in _ids:
                sql.execute("""DELETE * FROM _enrolled_subjects WHERE _subject_group_id = %s AND _student_id = %s""", (group_id, e["_student_id"]), conn)

        for i in _ids:
            _id = dict()
            dict["_student_id"] = i
            if _id not in enrolls:
                sql.execute("""INSERT INTO _enrolled_subjects (_subject_group_id, _student_id)""", (groupd_id, _id["_student_id"]), conn)

        enrolled_subjects = sql.read("""SELECT * FROM _enrolled_subjects WHERE _subject_group_id = %s""", (groupd_id), conn)

        # Closing connection
        if sql.close() == False:
            abort(500)

        return jsonify({
            "enrolls" : enrolled_subjects
        })

    def delete(self, request):
        _id = request.params["_id"]

        if sql.execute("""DELETE * FROM _enrolled_subjects WHERE _id = %s""", (_id), [], True) == False:
            abort(500)

        return jsonify({
            "id" : _id
        })

class SubjectEnteries:
    def __init__(self):
        pass

    def create(self, request):
        entry = request.params["entry"]
        query = sql.prepare(entry, "_subject_entries")

        conn = sql.open()

        sql.execute(query["string"], query["params"], conn)
        entry = sql.read("""SELECT * FROM _subject_entries WHERE _id = LAST_INSERT_ID()""", (), conn)
        
        if sql.close() == False:
            abort(500)

        return jsonify({
            "entry" : entry
        })

    def read(self, request):
        enteries = sql.read("""SELECT * FROM _subject_entries""", (), [], True, True)

        return jsonify({
            "enteries" : enteries
        })

    def update(self, request):
        entry = request.params["entry"]
        _id = subject["_id"]
        query = sql.prepare(entry, "_subject_entries", "update", "_id")

        sql.execute(query["string"], query["params"], [], True)
        entry["_id"] = _id

        return jsonify({
            "entry" : entry
        })

    def delete(self, request):
        _id = request.params["id"]

        if sql.execute("""DELETE * FROM _subject_entries WHERE _id = %s""", (_id), [], True) == False:
            abort(500)

        return jsonify({
            "id" : _id
        })