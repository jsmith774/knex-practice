const ShoppingListService = {
  getAllItems(knex) {
    //return 'all the shopping list items!!'; //String for initial tests
    //return Promise.resolve('all the shopping list items!!'); //Promise for test framework
    return knex.select('*').from('shopping_list'); //Actual implementation
  },
};

module.exports = ShoppingListService;
