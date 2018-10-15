module.exports = (app) => {
  const projects = require('../controllers/projects');

  app.get('/projects', projects.findAll);

  app.post('/projects', projects.create);

  app.get('/projects/:id', projects.findOne);

  app.post('/projects/edit/:id', projects.update);

  app.post('/projects/delete/:id', projects.delete);
}
