const { updateApplication } = require('../../model/applications');

module.exports = (req, res) => {
  const application = updateApplication(req.params.id, req.body);

  if (!application) {
    return res.status(404).json({
      status: 'error',
      error: { message: 'application not found', code: 404 },
    });
  }

  res.status(200).json({ status: 'ok', application });
};