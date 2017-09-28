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
        return query.get_query_result(this.database, query_string)
    }

    this.database = null

}

module.exports = Interpreter;
