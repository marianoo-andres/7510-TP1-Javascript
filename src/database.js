var DatabaseBuilder = function () {
    String.prototype.replaceAll = function (search, replace) {
        return this.replace(new RegExp('[' + search + ']', 'g'), replace);
    };
}

DatabaseBuilder.prototype.add_fact =

    /*  facts_map: a Map with key = name of fact and value array of arrays as [[fact_value_1, fact_value2..],[fact_value1,fact_value2..]..]
        fact: {fact_name: name, fact_values: [fact_value_1,fact_value2..]}
        Adds the fact to the facts_map
    */
    function (facts_map, fact) {
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
DatabaseBuilder.prototype.add_rule = function (rules_map, rule) {
        rules_map.set(rule.rule_name, rule.rule_values)
    }
    /*
        rule_parameters = {rule_variables: [rule_variable1, rule_variable2..] rule_facts: [{fact_name: name, fact_values: [fact_value1..]}]..}
        Returns the rule values with rule_variables replaced by index numbers.
        Example: rule_parameters = {rule_variables: ['X','Y'], rule_facts: [{fact_name: 'varon', fact_values: ['Y']}, {fact_name: 'padre', fact_values: ['Y', 'X']}]}
                 returns [{fact_name: 'varon', fact_numbers: [1]}, {fact_name: 'padre', fact_numbers: [1,0]}]
     */
DatabaseBuilder.prototype.to_rule_parameters_with_numbers = function (rule_parameters) {
        let rule_values = []
        for (let i = 0; i < rule_parameters.rule_facts.length; i++) {
            let rule_fact = {}
            rule_fact.fact_name = rule_parameters.rule_facts[i].fact_name
            let rule_fact_fact_numbers = []
            for (let j = 0; j < rule_parameters.rule_facts[i].fact_values.length; j++) {
                let variable = rule_parameters.rule_facts[i].fact_values[j]
                let index_mapped = rule_parameters.rule_variables.indexOf(variable)
                rule_fact_fact_numbers.push(index_mapped)
            }
            rule_fact.fact_numbers = rule_fact_fact_numbers
            rule_values.push(rule_fact)
        }
        return rule_values
    }
    /*
        Return true if fact_string matches the regex
        false if not
     */
DatabaseBuilder.prototype.fact_string_is_valid = function(rule_string){
    rule_string = rule_string.replaceAll(" ","")
    let regex = /^[a-zA-Z]*\([a-zA-Z]+(,[a-zA-Z]*)*\)\.$/
    return !(regex.exec(rule_string) === null)
}
/*
    Returns true if rule_sting mathes the regex
    false if not
 */
DatabaseBuilder.prototype.rule_string_is_valid = function(rule_string) {
    rule_string = rule_string.replaceAll(" ","")
    let regex = /^[a-zA-Z]*\([a-zA-Z]+(,[a-zA-Z]*)*\):-[a-zA-Z]*\([a-zA-Z]+(,[a-zA-Z]*)*\)(,[a-zA-Z]*\([a-zA-Z]+(,[a-zA-Z]*)*\))*\.$/
    return !(regex.exec(rule_string) === null)
}
    /*
        Parses the fact string. Returns a fact {fact_name: name, fact_values: [fact_value_1,fact_value2..]}
     */
DatabaseBuilder.prototype.to_fact = function (fact_string) {
        let fact_string_splitted = fact_string.replaceAll(")","").split("(")
        let fact_name = fact_string_splitted[0]
        let fact_values = fact_string_splitted[1].split(",")
        return {fact_name: fact_name, fact_values: fact_values}

    }

    /*
    Parses the rule string.
 */
DatabaseBuilder.prototype.to_rule = function (rule_string) {
        let rule_string_splitted = rule_string.split(":-")
        let rule_string_splitted_first_splitted = rule_string_splitted[0].replaceAll(")","").split("(")
        let rule_name = rule_string_splitted_first_splitted[0]
        let rule_variables = rule_string_splitted_first_splitted[1].split(",")
        let facts_string = rule_string_splitted[1].split("),")
        let rule_facts = facts_string.map(DatabaseBuilder.prototype.to_fact)
        return {rule_name: rule_name, rule_variables: rule_variables, rule_facts: rule_facts}

    }
    /*
        db: database array as in acceptance test
        Returns the facts string and rules string. On error on validating the strings
        return {error: list of invalid strings}
     */
DatabaseBuilder.prototype.get_facts_and_rules_string = function (db) {
        let invalid_strings = []
        for (let i = 0; i < db.length; i++) {
            if (!this.fact_string_is_valid(db[i]) && !this.rule_string_is_valid(db[i])) {
                invalid_strings.push(db[i])
            }
        }
        if (invalid_strings.length > 0) {return {error: invalid_strings}}

        let db_splitted = db.join("\n").replaceAll("\n", "").replaceAll("\t", "").replaceAll(" ", "").split(".").filter(function(i){return i})
        let facts_string = db_splitted.filter(function (element) {
            return !element.includes(":-")
        })
        let rules_string = db_splitted.filter(function (element) {
            return element.includes(":-")
        })
        return {facts_string: facts_string, rules_string: rules_string}
    }
    /*
        returns the facts map
     */
DatabaseBuilder.prototype.build_facts_map = function(facts) {
        let facts_map = new Map()
        for (let i=0; i < facts.length; i++){
            this.add_fact(facts_map, facts[i])
        }
        return facts_map
    }
    /*
        return the rules map
     */
DatabaseBuilder.prototype.build_rules_map = function(rules) {
        let rules_numbered = rules.map(function (element) {
            return {rule_name: element.rule_name, rule_values: DatabaseBuilder.prototype.to_rule_parameters_with_numbers({rule_variables: element.rule_variables, rule_facts: element.rule_facts})}
        })
        let rules_map = new Map()
        for (let i=0; i < rules.length; i++){
            this.add_rule(rules_map, rules_numbered[i])
        }
        return rules_map
    }
    /*
        parses and builds the database. Returns {fact_map: value, rules_map: value}.
        On error returns array of invalid strings
     */
DatabaseBuilder.prototype.build_database= function(db) {
        let facts_and_rules_stirng = this.get_facts_and_rules_string(db)

        if (facts_and_rules_stirng.error) return facts_and_rules_stirng.error

        let facts = facts_and_rules_stirng.facts_string.map(this.to_fact)
        let rules = facts_and_rules_stirng.rules_string.map(this.to_rule)
        return {fact_map: this.build_facts_map(facts), rule_map: this.build_rules_map(rules)}
    }


module.exports = DatabaseBuilder;