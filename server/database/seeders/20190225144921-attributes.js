import attributes from '../seed-data/attributes';

module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Attributes', [
    attributes[0],
    attributes[1],
  ]),
  down: queryInterface => queryInterface.bulkDelete('Attributes', null, {})
};
