const jsonVal = require('./data.json');
const _ = require('lodash');


interface ConditionProps {
    [index: number]: any | any[];
}

const isOperator = (val: string) => ['not', 'or', 'and'].includes(val);
const filterOperator = (conditions: ConditionProps) => {

    return _.find(conditions, (condition: ConditionProps) => {
        if ((typeof (condition) === 'string') && (isOperator(condition))) {
            return condition;
        };
    });
};

const filterCriterias = (conditions: ConditionProps) => {
    const criterias: any[] = [];
    _.forEach(conditions, (condition: any) => {
        if (Array.isArray(condition) || !isOperator(condition)) {
            criterias.push(condition);
        }
    })
    return criterias;
}

const hasCondition = (item: any, criteria: ConditionProps) => {
    const hasOperator = filterOperator(criteria);
    if (hasOperator) {
        const nextCri = filterCriterias(criteria);
        return applyCondition(item, hasOperator, nextCri)
    }
    const key = criteria[0];
    const values = criteria[1];
    const nKey = key === 'from_country' ? 'country' : 'gender_is' ? 'gender' : key;
    if (Array.isArray(values)) {
        return values.includes(item[nKey])
    }
    else {
        return item[nKey] === values
    }
};

const applyCondition = (item: any, operator: string, criterias: any): boolean => {
    switch (operator) {
        case 'and':
            return criterias.every((criteria: any) => hasCondition(item, criteria));
        case 'or':
            return criterias.some((criteria: any) => hasCondition(item, criteria));
        case 'not':
            return criterias.every((criteria: any) => !hasCondition(item, criteria));
        default:
            return hasCondition(item, criterias)
    }
}


export const filterData = (jsonVal: any, conditions: ConditionProps | ConditionProps[]) => {
    return jsonVal.filter((data: any) => {
        const operator = filterOperator(conditions);
        const criterias = filterCriterias(conditions);
        return applyCondition(data, operator, criterias);
    });
}
// console.log(filterData(jsonVal, ['from_country', 'India']))
// console.log(filterData(jsonVal, ['from_country', ['India', 'Russia']]))
// console.log(filterData(jsonVal, ['gender_is', ['Male']]))
// console.log(filterData(jsonVal, ['not', ['from_country', ['France', 'China']]]))
console.log(filterData(jsonVal, ['or', ['from_country', ['Russia']], ['gender_is', ['Male']]]))
// console.log(filterData(jsonVal, ['and', ['from_country', ['Russia', 'Mexico']], ['not', ['gender_is', 'Male']]]))

