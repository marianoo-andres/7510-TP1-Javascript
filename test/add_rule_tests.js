var assert = require('assert');

var DatabaseBuilder = require('../src/database');


describe("databaseBuilder", function () {

    var databaseBuilder = new DatabaseBuilder();

    describe('Add rule', function () {

        it('should add the rule', function () {
            let rules_map = new Map();
            databaseBuilder.add_rule(rules_map, {rule_name: 'hijo', rule_values: [{fact_name: 'varon', fact_numbers: [1]},
                {fact_name: 'padre', fact_numbers: [1,0]}]})
            let result_rule = rules_map.get('hijo')
            assert(result_rule[0].fact_name === 'varon')
            assert(result_rule[0].fact_numbers.toString() === [1].toString())
            assert(result_rule[1].fact_name === 'padre')
            assert(result_rule[1].fact_numbers.toString() === [1,0].toString())
        });
    });
});


