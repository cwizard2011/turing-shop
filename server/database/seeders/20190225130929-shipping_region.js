import shippingRegion from '../seed-data/shippingRegion';

module.exports = {
  up: queryInterface => queryInterface.bulkInsert('ShippingRegions', [
    shippingRegion[0],
    shippingRegion[1],
    shippingRegion[2],
    shippingRegion[3],
  ]),
  down: queryInterface => queryInterface.bulkDelete('ShippingRegions', null, {})
};
