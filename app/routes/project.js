module.exports = (app) => {
  const projects = require('../controllers/projects');

  app.get('/projects', projects.findAll);

  // app.get('projects/delete', (req, res) => {
  //   console.log('delete this')
  // });

  app.post('/projects', projects.create);

  app.get('/projects/:id', projects.findOne);

  app.put('/projects/:id', projects.update);

  app.delete('/projects/:id', projects.delete);
}
