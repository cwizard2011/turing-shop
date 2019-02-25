import productAttributeValue from '../seed-data/productAttributeValue';

module.exports = {
  up: queryInterface => queryInterface.bulkInsert('ProductAttributes', [
    productAttributeValue[0],
    productAttributeValue[1],
    productAttributeValue[2],
    productAttributeValue[3],
    productAttributeValue[4],
    productAttributeValue[5],
  ]),
  down: queryInterface => queryInterface.bulkDelete('ProductAttributes', null, {})
};
