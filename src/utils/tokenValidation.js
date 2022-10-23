import _ from 'lodash';

export const validateToken = (() => {
    const lcstrg = localStorage.getItem("salon_token");
    const token = JSON.parse(lcstrg);
    const hasToken = _.isEmpty(token);
    return !hasToken;
})
