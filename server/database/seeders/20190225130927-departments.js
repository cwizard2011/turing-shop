import departments from '../seed-data/departments';

module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Departments', [
    departments[0],
    departments[1],
    departments[2],
  ]),
  down: queryInterface => queryInterface.bulkDelete('Departments', null, {})
};
