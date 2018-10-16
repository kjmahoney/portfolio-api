const mongoose = require('mongoose');

const ProjectSchema = mongoose.Schema({
  name: String,
  description: String,
  url: String,
  github_url: String,
  image: String
})

module.exports = mongoose.model('Project', ProjectSchema);
