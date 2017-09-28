var Query = function () {
    String.prototype.replaceAll = function (search, replace) {
        return this.replace(new RegExp('[' + search + ']', 'g'), replace);
    };
}

/*
    fact_map: map constructed by DatabaseBuilder
    fact: {fact_name: name, fact_values: [fact_value_1,fact_value2..]}
    Return true if fact exists in database
    false if not
 */
Query.prototype.query_fact = function (fact_map, fact) {
    let fact_stored_value = fact_map.get(fact.fact_name)
    if (fact_stored_value === undefined) return false
    for (let i = 0; i < fact_stored_value.length; i++) {
        if (fact_stored_value[i].toString() === fact.fact_values.toString()) return true
    }
    return false
}
/*
    rule_value: [{fact_name: name, fact_numbers: [fact_number1,fact_number2..]}..]
    rule_parameters: [param1,param2..]
    Returns [{fact_name: name, fact_values: [fact_value1,fact_value2..]}..]
 */
Query.prototype.bind_facts_of_rule = function (rule_value, rule_parameters) {
    let facts_binded = []
    for (let i = 0; i < rule_value.length; i++) {
        let fact_values = []
        for (let j = 0; j < rule_value[i].fact_numbers.length; j++) {
            let value_binded = rule_parameters[rule_value[i].fact_numbers[j]]
            fact_values.push(value_binded)
        }
        facts_binded.push({fact_name: rule_value[i].fact_name, fact_values: fact_values})
    }
    return facts_binded
}

/*
    rule_map: map constructed by DatabaseBuilder
    fact_map: map constructed by DatabaseBuilder
    rule: {rule_name: name, rule_parameters: [param1, param2...]
 */
Query.prototype.query_rule = function (rule_map, fact_map, rule) {
    let rule_value = rule_map.get(rule.rule_name)
    if (rule_value === undefined) return false

    let facts_binded = this.bind_facts_of_rule(rule_value, rule.rule_parameters)
    for (let i = 0; i < facts_binded.length; i++) {
        if (!this.query_fact(fact_map, facts_binded[i])) return false
    }
    return true
}

/*
    Retunrs true if query_string matches regex
    false if not
 */
Query.prototype.query_string_is_valid = function (query_string) {
    regex = /^[a-zA-Z]+\([a-zA-Z]+(,[a-zA-Z]+)*\)$/
    return !(regex.exec(query_string) ===null)
}

/*
    Parse query_string into {query_name: name, query_parameters: [param1,param2..]}
 */
Query.prototype.parse_query = function(query_string) {
    if (!this.query_string_is_valid(query_string)) return null

    let query_string_splitted = query_string.replaceAll(" ","").replaceAll(")","").split("(")
    return {query_name: query_string_splitted[0], query_parameters: query_string_splitted[1].split(",")}
}
/*
    database: {fact_map map, rule_map: map} returned by DatabaseBuilder.build_database
    query_string: query to be evaluated
 */
Query.prototype.get_query_result = function (database, query_string) {
    let parsed_query = this.parse_query(query_string)
    if (parsed_query === null) return null

    let fact_query_result = this.query_fact(database.fact_map, {fact_name: parsed_query.query_name, fact_values: parsed_query.query_parameters})
    let rule_query_result = this.query_rule(database.rule_map, database.fact_map, {rule_name: parsed_query.query_name, rule_parameters: parsed_query.query_parameters})
    return fact_query_result || rule_query_result
}
module.exports = Query;