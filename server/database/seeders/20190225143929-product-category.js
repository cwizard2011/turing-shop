import productCategory from '../seed-data/productCategory';

module.exports = {
  up: queryInterface => queryInterface.bulkInsert('ProductCategories', [
    productCategory[0],
    productCategory[1],
    productCategory[2],
  ]),
  down: queryInterface => queryInterface.bulkDelete('ProductCategories', null, {})
};
