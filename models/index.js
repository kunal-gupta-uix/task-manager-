const {User} = require('./User');
const {Project} = require('./Project');
const {ProjectMember} = require('./ProjectMember');
const applyAssociations = require('./associations');

applyAssociations();

module.exports = {User, Project, ProjectMember};