const ShoppingListService = require('../src/shopping-list-service');
const knex = require('knex');

describe(`ShoppingList service object`, function () {
  let db;

  // todo SETUP TEST SCAFFOLDING
  let testItems = [
    {
      id: 1,
      name: 'Potato Chips',
      price: '3.49',
      date_added: new Date('2020-01-01T12:28:32.615Z'),
      checked: false,
      category: 'Snack',
    },
    {
      id: 2,
      name: 'Milk',
      price: '3.99',
      date_added: new Date('2020-08-08T16:28:32.615Z'),
      checked: true,
      category: 'Snack',
    },
    {
      id: 3,
      name: 'Apples',
      price: '2.79',
      date_added: new Date('2020-08-02T14:28:32.615Z'),
      checked: false,
      category: 'Lunch',
    },
  ];

  // SETUP CONNECTION TO INJECT DEPENDENCY INTO SERVICE
  before(() => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    });
  });
  // TRUNCATE old data
  before(() => db('shopping_list').truncate());
  // LOAD TEST DATA
  before(() => {
    return db.into('shopping_list').insert(testItems);
  });
  // CLOSE CONNECTION
  after(() => db.destroy());

  describe(`getAllItems()`, () => {
    it(`resolves all items from shopping_list table`, () => {
      return ShoppingListService.getAllItems(db).then((actual) => {
        expect(actual).to.eql(testItems);
      });
    });
  });
});
