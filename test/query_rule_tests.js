var assert = require('assert');

var Query = require('../src/query');


describe("query", function () {

    var query = new Query();

    describe('query rule test', function () {

        it('Should return false as amigos(maria,juan) is not present in rule_map', function () {
            let fact_map = new Map()
            fact_map.set("varon", [["juan"],["pepe"],["carlos"]])
            fact_map.set("padre", [["juan","pepe"],["pepe","carlos"]])
            let rule_map = new Map()
            rule_map.set("hijo", [{fact_name: "varon", fact_numbers: [1]},{fact_name: "padre", fact_numbers: [1,0]}])
            assert(!query.query_rule(rule_map, fact_map, {rule_name: "hijo", rule_parameters: ["juan","pepe"]}))
        });

        it('Should return true as facts varon(juan) and padre(juan,pepe) are true', function () {
            let fact_map = new Map()
            fact_map.set("varon", [["juan"],["pepe"],["carlos"]])
            fact_map.set("padre", [["juan","pepe"],["pepe","carlos"]])
            let rule_map = new Map()
            rule_map.set("hijo", [{fact_name: "varon", fact_numbers: [1]},{fact_name: "padre", fact_numbers: [1,0]}])
            assert(query.query_rule(rule_map, fact_map, {rule_name: "hijo", rule_parameters: ["pepe","juan"]}))
        });

        it('Should return false as facts varon(juan) is true but padre(juan,pepe) is false', function () {
            let fact_map = new Map()
            fact_map.set("varon", [["juan"],["pepe"],["carlos"]])
            fact_map.set("padre", [["pepe","carlos"]])
            let rule_map = new Map()
            rule_map.set("hijo", [{fact_name: "varon", fact_numbers: [1]},{fact_name: "padre", fact_numbers: [1,0]}])
            assert(!query.query_rule(rule_map, fact_map, {rule_name: "hijo", rule_parameters: ["pepe","juan"]}))
        });

        it('Should return false as facts varon(juan) is false and padre(juan,pepe) is false', function () {
            let fact_map = new Map()
            fact_map.set("varon", [["pepe"],["carlos"]])
            fact_map.set("padre", [["pepe","carlos"]])
            let rule_map = new Map()
            rule_map.set("hijo", [{fact_name: "varon", fact_numbers: [1]},{fact_name: "padre", fact_numbers: [1,0]}])
            assert(!query.query_rule(rule_map, fact_map, {rule_name: "hijo", rule_parameters: ["pepe","juan"]}))
        });

    });
});


