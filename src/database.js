var DatabaseBuilder = function () {

    /* Returns the database object */
    this.build_database = function (db_string) {

    }
    /*  facts_map: a Map with key = name of fact and value array of arrays as [[fact_value_1, fact_value2..],[fact_value1,fact_value2..]..]
        fact: {fact_name: name, fact_values: [fact_value_1,fact_value2..]}
        Adds the fact to the facts_map
    */
    this.add_fact = function (facts_map, fact) {
        let value = facts_map.get(fact.fact_name)
        if (value === undefined) {
            facts_map.set(fact.fact_name, [fact.fact_values])
        }
        else {
            value.push(fact.fact_values)
        }
    }
    /*
        rules_map: Map with key = name of rule and value = array as [{fact_name: name, fact_numbers: [fact_number1,fact_number2..]}..]
        rule: {rule_name: name, rule_values: [{fact_name: name, fact_numbers: [fact_number1,fact_number2..]}..]
        Adds the rule to the rules_map
     */
    this.add_rule = function (rules_map, rule) {
        rules_map.set(rule.rule_name, rule.rule_values)
    }
    /*
        rule_parameters = {rule_variables: [rule_variable1, rule_variable2..] rule_facts: [{fact_name: name, rule_variables: [rule_variable1..]}]..}
        Returns the rule values with rule_variables replaced by index numbers.
        Example: rule_parameters = {rule_variables: ['X','Y'], rule_facts: [{fact_name: 'varon', rule_variables: ['Y']}, {fact_name: 'padre', rule_variables: ['Y', 'X']}]}
                 returns [{fact_name: 'varon', fact_numbers: [1]}, {fact_name: 'padre', fact_numbers: [1,0]}]
     */
    this.to_rule_parameters_with_numbers = function (rule_parameters) {
        let rule_values = []
        for (let i = 0; i < rule_parameters.rule_facts.length; i++) {
            let rule_fact = {}
            rule_fact.fact_name = rule_parameters.rule_facts[i].fact_name
            let rule_fact_fact_numbers = []
            for (let j = 0; j < rule_parameters.rule_facts[i].rule_variables.length; j++) {
                let variable = rule_parameters.rule_facts[i].rule_variables[j]
                let index_mapped = rule_parameters.rule_variables.indexOf(variable)
                rule_fact_fact_numbers.push(index_mapped)
            }
            rule_fact.fact_numbers = rule_fact_fact_numbers
            rule_values.push(rule_fact)
        }
        return rule_values
    }
}

module.exports = DatabaseBuilder;