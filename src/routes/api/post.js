const crypto = require('crypto');
const { writeApplication } = require('../../model/applications');

module.exports = (req, res) => {
  const application = {
    id: crypto.randomUUID(),
    company: req.body.company,
    role: req.body.role,
    status: req.body.status || 'applied',
    dateApplied: req.body.dateApplied,
    postingUrl: req.body.postingUrl,
    notes: req.body.notes,
  };

  writeApplication(application);

  res.status(201).json({
    status: 'ok',
    application,
  });
};