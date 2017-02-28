const moment = require('moment');

// var date = moment();

// console.log(date);

// console.log(date.format('MMM Do, YYYY'));

const createdAt = new Date().getTime() - 460000;
const date = moment(createdAt);

console.log(date.format('h:mm a'));

console.log(moment().valueOf());