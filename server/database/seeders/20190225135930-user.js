import users from '../seed-data/user';

module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Customers', [
    users[0],
  ]),
  down: queryInterface => queryInterface.bulkDelete('Customers', null, {})
};
