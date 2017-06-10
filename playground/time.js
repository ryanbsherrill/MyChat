const moment = require('moment');

const timeStamp = moment().valueOf();
console.log(timeStamp);
const createdAt = 1234;
const date = moment(createdAt);

console.log(date.format('h:mm a'));
