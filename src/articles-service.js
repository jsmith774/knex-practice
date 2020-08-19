const ArticlesService = {
  getAllArticles(knex) {
    //return 'all the articles!!';   //String for initial tests
    //return Promise.resolve('all the articles!!');  //Promise for test framework
    return knex.select('*').from('blogful_articles'); //Actual implementation
  },
};

module.exports = ArticlesService;
