from Flabstraction.connect import sql, STATIC_PATH, helper, jsonify

class Assignments:
    def __init__(self):
        pass

    def create(self, request):
        assignment = request.params["assignment"]
        query = sql.prepare(assignment, "_assignements")

        conn = sql.open()

        sql.execute(query["string"], query["params"], conn)
        assignment = sql.read("""SELECT * FROM _assignements WHERE _id = LAST_INSERT_ID()""", (), conn)
        
        if sql.close() == False:
            abort(500)

        return jsonify({
            "assignment" : assignment
        })

    def read(self, request):
        assignments = sql.read("""SELECT * FROM _assignements""", (), [], True, True)

        return jsonify({
            "assignments" : assignments
        })

    def update(self, request):
        assignment = request.params["class"]
        _id = assignment["_id"]
        query = sql.prepare(assignment, "_assignements", "update", "_id")

        sql.execute(query["string"], query["params"], [], True)
        assignment["_id"] = _id

        return jsonify({
            "assignment" : assignment
        })

    def delete(self, request):
        _id = request.params["id"]

        if sql.execute("""DELETE * FROM _assignements WHERE _id = %s""", (_id), [], True) == False:
            abort(500)

        return jsonify({
            "id" : _id
        })

class AssignmentEntries:
    def __init__(self):
        pass

    def create(self, request):
        entry = request.params["entroll"]
        query = sql.prepare(entry, "_assignment_entries")

        conn = sql.open()

        sql.execute(query["string"], query["params"], conn)
        entry = sql.read("""SELECT * FROM _assignment_entries WHERE _id = LAST_INSERT_ID()""", (), conn)
        
        if sql.close() == False:
            abort(500)

        return jsonify({
            "entry" : entry
        })

    def read(self, request):
        entries = sql.read("""SELECT * FROM _assignment_entries""", (), [], True, True)

        return jsonify({
            "entries" : entries
        })

    def update(self, request):
        entry = request.params["entry"]
        _id = entry["_id"]
        query = sql.prepare(entry, "_assignment_entries", "update", "_id")

        sql.execute(query["string"], query["params"], [], True)
        entry["_id"] = _id

        return jsonify({
            "entry" : entry
        })

    def delete(self, request):
        _id = request.params["id"]

        if sql.execute("""DELETE * FROM _assignment_entries WHERE _id = %s""", (_id), [], True) == False:
            abort(500)

        return jsonify({
            "id" : _id
        })