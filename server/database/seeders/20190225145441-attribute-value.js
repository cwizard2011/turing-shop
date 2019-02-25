import attributeValue from '../seed-data/attributeValue';

module.exports = {
  up: queryInterface => queryInterface.bulkInsert('AttributeValues', [
    attributeValue[0],
    attributeValue[1],
    attributeValue[2],
    attributeValue[3],
  ]),
  down: queryInterface => queryInterface.bulkDelete('AttributeValues', null, {})
};
