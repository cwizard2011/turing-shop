import category from '../seed-data/category';

module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Categories', [
    category[0],
    category[1],
  ]),
  down: queryInterface => queryInterface.bulkDelete('Categories', null, {})
};
