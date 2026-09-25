const { listApplications } = require('../../model/applications');

module.exports = (req, res) => {
  res.status(200).json({
    status: 'ok',
    applications: listApplications(),
  });
};