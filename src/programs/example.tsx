const jsonVal = require('./data.json');
const _ = require('lodash');


interface ConditionProps {
    [index: number]: string | string[] | ConditionProps[];
}

interface JsonItemsProps {
    first_name: string;
    last_name: string;
    email: string;
    gender: string;
    country: string;
    [key: string]: string; // Index signature to allow any additional properties
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
    const criterias: ConditionProps[] = [];
    _.forEach(conditions, (condition: ConditionProps[]) => {
        if (Array.isArray(condition) || !isOperator(condition)) {
            criterias.push(condition as string[]);
        }
    })
    return criterias;
}

const updateKey = (key: string): string => key === 'from_country' ? 'country' : 'gender_is' ? 'gender' : key;

const checkCondition = (item: JsonItemsProps, criteria: ConditionProps): any => {
    const hasOperator = filterOperator(criteria);
    if (hasOperator) {
        const nextCriteria = filterCriterias(criteria);
        return applyCondition(item, hasOperator, nextCriteria as string[])
    }
    const key = criteria[0];
    const values = criteria[1];
    const nKey = updateKey(key as string)
    if (Array.isArray(values)) {
        return values.includes(item[nKey])
    }
    else {
        return values === item[nKey]
    }
};

const applyCondition = (item: JsonItemsProps, operator: string | undefined, criterias: ConditionProps): boolean => {
    switch (operator) {
        case 'and':
            return _.every(criterias, (criteria: ConditionProps) => checkCondition(item, criteria));
        case 'or':
            return _.some(criterias, (criteria: ConditionProps) => checkCondition(item, criteria));
        case 'not':
            return _.every(criterias, (criteria: ConditionProps) => !checkCondition(item, criteria));
        default:
            return checkCondition(item, criterias)
    }
}


export const filterData = (jsonVal: JsonItemsProps[], conditions: ConditionProps) => {
    return _.filter(jsonVal, (data: JsonItemsProps) => {
        const operator = filterOperator(conditions);
        const criterias = filterCriterias(conditions);
        return applyCondition(data, operator, criterias as string[]);
    });
}
// console.log(filterData(jsonVal, ['from_country', 'India']))
// console.log(filterData(jsonVal, ['from_country', ['India', 'Russia']]))
// console.log(filterData(jsonVal, ['gender_is', ['Male']]))
// console.log(filterData(jsonVal, ['not', ['from_country', ['France', 'China']]]))
// console.log(filterData(jsonVal, ['or', ['from_country', ['Russia']], ['gender_is', ['Male']]]))
console.log(filterData(jsonVal, ['and', ['from_country', ['Russia', 'Mexico']], ['not', ['gender_is', 'Male']]]))

