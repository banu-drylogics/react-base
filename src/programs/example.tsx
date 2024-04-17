const jsonData = require('./data.json');
const _ = require('lodash');


interface ConditionProps {
    [index: number]: any | any[];
}

const filterData = (condition: ConditionProps) => {
    const key = condition[0];
    const value = condition[1];
    const nKey = key === 'from_country' ? 'country' : 'gender_is' ? 'gender' : key;

    if (Array.isArray(value)) {
        return _.filter(jsonData, (d: any) => value.includes(d[nKey]))
    }
    else {
        return _.filter(jsonData, (d: any) => d[nKey] === value)
    }
}

console.log(filterData(['from_country', 'India']))
console.log(filterData(['from_country', ['India', 'Russia']]))
console.log(filterData(['gender_is', ['Male']]))





