require('dotenv').config();
const knex = require('knex');

const dbConnUrl = process.env.DB_URL;

const knexInstance = knex({
  client: 'pg',
  connection: dbConnUrl,
});

function searchByListItemName(searchTerm) {
  knexInstance
    .select('*')
    .from('shopping_list')
    .where('name', 'ILIKE', `%${searchTerm}%`)
    .then((result) => {
      console.log(`\n\nsearchByListItemName(${searchTerm})`);
      console.log(result);
    });
}

function paginateItems(page) {
  const itemsPerPage = 6;
  const offset = itemsPerPage * (page - 1);
  knexInstance
    .select('*')
    .from('shopping_list')
    .limit(itemsPerPage)
    .offset(offset)
    .then((result) => {
      console.log(`\n\npaginateItems(${page})`);
      console.log(result);
    });
}

function itemsAddedAfterDaysAgo(daysAgo) {
  knexInstance
    .select('*')
    .from('shopping_list')
    .where(
      'date_added',
      '>',
      knexInstance.raw(`now() - '?? days'::INTERVAL`, daysAgo)
    )
    .then((result) => {
      console.log(`\n\nitemsAddedAfterDaysAgo(${daysAgo})`);
      console.log(result);
    });
}

function totalPriceByCategory() {
  knexInstance
    .select('category')
    .sum('price')
    .from('shopping_list')
    .groupBy('category')
    .then((result) => {
      console.log(`\n\ntotalPriceByCategory()`);
      console.log(result);
    });
}

searchByListItemName('%burg%');
paginateItems(3);
itemsAddedAfterDaysAgo(2);
totalPriceByCategory();
