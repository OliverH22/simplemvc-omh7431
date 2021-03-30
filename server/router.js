const controllers = require('./controllers');

const router = (app) => {
  app.get('/page1', controllers.page1);
  app.get('/page2', controllers.page2);
  app.get('/page3', controllers.page3);
  app.get('/getName', controllers.getName);
  app.get('/getName2', controllers.getName2);
  app.get('/findByName', controllers.searchName);
  app.get('/findByDogName', controllers.searchDogName);

  app.get('/', controllers.index);

  app.get('/*', controllers.notFound);

  app.post('/setName', controllers.setName);

  app.post('/setName2', controllers.setName2);

  app.post('/updateLast', controllers.updateLast);
};

// export the router function
module.exports = router;
