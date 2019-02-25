import shipping from '../seed-data/shipping';

module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Shippings', [
    shipping[0],
    shipping[1],
    shipping[2],
  ]),
  down: queryInterface => queryInterface.bulkDelete('Shippings', null, {})
};
