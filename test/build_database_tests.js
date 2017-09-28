var assert = require('assert');

var DatabaseBuilder = require('../src/database');


describe("databaseBuilder", function () {
    var databaseBuilder = new DatabaseBuilder();

    describe('Build valid database', function () {

        it('should build the database', function () {
            var db = [
                "varon(juan).",
                "varon(pepe).",
                "padre(juan, pepe).",
                "hijo(X, Y) :- varon(X), padre(Y, X)."
            ]
            let database_result = databaseBuilder.build_database(db)
            let facts_map_result = database_result.fact_map
            let rules_map_result = database_result.rule_map
            assert(facts_map_result.get("varon").toString() === [["juan"],["pepe"]].toString())
            assert(facts_map_result.get("padre").toString() === [["juan","pepe"]].toString())
            assert(rules_map_result.get("hijo")[0].fact_name === "varon")
            assert(rules_map_result.get("hijo")[0].fact_numbers.toString() === [0].toString())
            assert(rules_map_result.get("hijo")[1].fact_name === "padre")
            assert(rules_map_result.get("hijo")[1].fact_numbers.toString() === [1,0].toString())
        });

    });

    describe('Build invalid database', function () {

        it('should return array of invalid strings', function () {
            var invalid_db = [
                "varonjuan).",
                "varon(pepe.",
                "varon(hector)",
                "",
                "varon(alejandro",
                "mujermaria.",
                "mujercecilia)",
                "padre(juan, pepe",
                "padrejuan pepa).",
                "padre(hector, maria",
                "hijoX, Y) - varon(X), padre(Y, X)",
                "hija(X, Y) :- mujer(X), padre(Y, X)"
            ];
            let database_result = databaseBuilder.build_database(invalid_db)
            assert(database_result.error.toString() === invalid_db.toString())
        });

    });

});


