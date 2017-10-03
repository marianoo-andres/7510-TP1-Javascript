var DatabaseBuilder = require('../src/database');
var Query = require('../src/query');
var Interpreter = function () {

    this.parseDB = function (db) {
        let databaseBuilder = new DatabaseBuilder()
        let result = databaseBuilder.build_database(db)
        if (result.error) {
            this.database = null
            return result.error
        }
        this.database = result
    }

    this.checkQuery = function (query_string) {
        let query = new Query()
        let result = query.get_query_result(this.database, query_string)
        if (result === null) throw new Error("Error al parsear la query")
        return result
    }

    this.database = null

}

module.exports = Interpreter;
