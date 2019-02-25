import items from '../seed-data/items';

module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Products', [
    items[0],
    items[1],
    items[2]
  ]),
  down: queryInterface => queryInterface.bulkDelete('Products', null, {})
};
