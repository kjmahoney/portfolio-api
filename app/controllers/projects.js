const Project = require('../models/project')

exports.create = (req, res) => {
  if(!req.body.name) {
    return res.status(400).send({
      message: `project can't be empty`
    })
  }

  const project = new Project({
    name: req.body.name,
    description: req.body.description,
    url: req.body.url,
    github_url: req.body.github_url,
    image: req.body.image,
  });

  project.save()
    .then( data => {
      res.send(data);
    }).catch(err => {
      res.status(500).send({
        message: err.message
      })
    })
};

exports.findAll = (req, res) => {
    Project.find()
    .then(projects => {
      console.log('finding all');
      console.log(projects);
      res.render('index', { projects: projects });
    }).catch(err => {
      res.status(500).send({
        message: err.message
      })
    })
};

exports.findOne = (req, res) => {
  console.log('FOUND IT' + req.params.id);
  Project.findById(req.params.id)
    .then(project => {
      if(!project) {
        return res.status(404).send({
          message: `Project doesnt exist with that id ${req.params.Id}`
        })
      }
      res.send(project);
    }).catch(err => {
      return res.status(500).send({
        message: `Error retrieving project with id ${req.params.noteId}`
      })
    })
}

exports.update = (req, res) => {
  if(!req.body.content) {
    return res.status(400).send({
           message: "Project content can not be empty"
      });
   }
   Project.findByIdAndUpdate(req.params.Id, {
     name: req.body.title,
     description: req.body.description,
     url: req.body.url,
     github_url: req.body.github_url,
     image: req.body.image,
   }, { new: true })
   .then(project => {
     if(!project) {
      return res.status(404).send({
        message: "Project not found with id " + req.params.Id
      });
    }
    res.send(project);
  }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Project not found with id " + req.params.Id
            });
        }
        return res.status(500).send({
            message: "Error updating project with id " + req.params.Id
        });
    });
};

exports.delete = (req, res) => {
  console.log('DELETING');
  Project.findByIdAndRemove(req.params.id)
  .then(project => {
       if(!project) {
           return res.status(404).send({
               message: "Project not found with id " + req.params.id
           });
       }
       res.send({message: "Project deleted successfully!"});
   }).catch(err => {
       if(err.kind === 'ObjectId' || err.name === 'NotFound') {
           return res.status(404).send({
               message: "Project not found with id " + req.params.id
           });
       }
       return res.status(500).send({
           message: "Could not delete project with id " + req.params.id
       });
   });
};
