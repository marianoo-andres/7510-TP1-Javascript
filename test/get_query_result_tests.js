var assert = require('assert');

var Query = require('../src/query');


describe("query", function () {

    var query = new Query();

    describe('get query result test', function () {

        it('Should return false as amigos(maria,juan) is not present in database', function () {
            let fact_map = new Map()
            fact_map.set("varon", [["juan"],["pepe"],["carlos"]])
            fact_map.set("padre", [["juan","pepe"],["pepe","carlos"]])
            let rule_map = new Map()
            rule_map.set("hijo", [{fact_name: "varon", fact_numbers: [1]},{fact_name: "padre", fact_numbers: [1,0]}])
            let database = {fact_map: fact_map, rule_map: rule_map}
            assert(!query.get_query_result(database, "amigos(maria,juan)"))
        });

        it('Should return false as varon(jorge) is not present in database', function () {
            let fact_map = new Map()
            fact_map.set("varon", [["juan"],["pepe"],["carlos"]])
            fact_map.set("padre", [["juan","pepe"],["pepe","carlos"]])
            let rule_map = new Map()
            rule_map.set("hijo", [{fact_name: "varon", fact_numbers: [1]},{fact_name: "padre", fact_numbers: [1,0]}])
            let database = {fact_map: fact_map, rule_map: rule_map}
            assert(!query.get_query_result(database, "varon(jorge)"))
        });

        it('Should return false as padre(jorge,pedro) is not present in database', function () {
            let fact_map = new Map()
            fact_map.set("varon", [["juan"],["pepe"],["carlos"]])
            fact_map.set("padre", [["juan","pepe"],["pepe","carlos"]])
            let rule_map = new Map()
            rule_map.set("hijo", [{fact_name: "varon", fact_numbers: [1]},{fact_name: "padre", fact_numbers: [1,0]}])
            let database = {fact_map: fact_map, rule_map: rule_map}
            assert(!query.get_query_result(database, "padre(jorge,pedro)"))
        });

        it('Should return false as facts varon(juan) is true but padre(juan,pepe) is false', function () {
            let fact_map = new Map()
            fact_map.set("varon", [["juan"],["pepe"],["carlos"]])
            fact_map.set("padre", [["pepe","carlos"]])
            let rule_map = new Map()
            rule_map.set("hijo", [{fact_name: "varon", fact_numbers: [1]},{fact_name: "padre", fact_numbers: [1,0]}])
            let database = {fact_map: fact_map, rule_map: rule_map}
            assert(!query.get_query_result(database, "hijo(pepe,juan)"))
        });

        it('Should return false as facts varon(juan) is false and padre(juan,pepe) is false', function () {
            let fact_map = new Map()
            fact_map.set("varon", [["pepe"],["carlos"]])
            fact_map.set("padre", [["pepe","carlos"]])
            let rule_map = new Map()
            rule_map.set("hijo", [{fact_name: "varon", fact_numbers: [1]},{fact_name: "padre", fact_numbers: [1,0]}])
            let database = {fact_map: fact_map, rule_map: rule_map}
            assert(!query.get_query_result(database, "hijo(pepe,juan)"))
        });

        it('Should return true as varon(juan) is present in database', function () {
            let fact_map = new Map()
            fact_map.set("varon", [["juan"],["pepe"],["carlos"]])
            fact_map.set("padre", [["juan","pepe"],["pepe","carlos"]])
            let rule_map = new Map()
            rule_map.set("hijo", [{fact_name: "varon", fact_numbers: [1]},{fact_name: "padre", fact_numbers: [1,0]}])
            let database = {fact_map: fact_map, rule_map: rule_map}
            assert(query.get_query_result(database, "varon(juan)"))
        });

        it('Should return true as padre(juan,pepe) is present in database', function () {
            let fact_map = new Map()
            fact_map.set("varon", [["juan"],["pepe"],["carlos"]])
            fact_map.set("padre", [["juan","pepe"],["pepe","carlos"]])
            let rule_map = new Map()
            rule_map.set("hijo", [{fact_name: "varon", fact_numbers: [1]},{fact_name: "padre", fact_numbers: [1,0]}])
            let database = {fact_map: fact_map, rule_map: rule_map}
            assert(query.get_query_result(database, "padre(juan,pepe)"))
        });

        it('Should return true as facts varon(juan) and padre(juan,pepe) are true', function () {
            let fact_map = new Map()
            fact_map.set("varon", [["juan"],["pepe"],["carlos"]])
            fact_map.set("padre", [["juan","pepe"],["pepe","carlos"]])
            let rule_map = new Map()
            rule_map.set("hijo", [{fact_name: "varon", fact_numbers: [1]},{fact_name: "padre", fact_numbers: [1,0]}])
            let database = {fact_map: fact_map, rule_map: rule_map}
            assert(query.get_query_result(database, "hijo(pepe,juan)"))
        });
    });
});


