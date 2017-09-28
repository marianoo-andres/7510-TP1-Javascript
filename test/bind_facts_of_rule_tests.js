var assert = require('assert');

var Query = require('../src/query');


describe("query", function () {

    var query = new Query();

    describe('bind facts of rule test', function () {

        it('Should bind the facts of the rule and return them', function () {
            let rule_value = [{fact_name: "varon", fact_numbers: [1]}, {fact_name: "padre", fact_numbers: [1,0]}]
            let rule_parameters = ["juan", "pepe"]
            let result = query.bind_facts_of_rule(rule_value, rule_parameters)
            assert(result[0].fact_name === "varon")
            assert(result[0].fact_values.toString() === ["pepe"].toString())
            assert(result[1].fact_name === "padre")
            assert(result[1].fact_values.toString() === ["pepe","juan"].toString())
        });
    });
});


