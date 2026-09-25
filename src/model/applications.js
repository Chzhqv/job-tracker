let applications = [];

function listApplications(ownerId) {
  return applications.filter((a) => a.ownerId === ownerId);
}

function writeApplication(application) {
  applications.push(application);
  return application;
}

function readApplication(id, ownerId) {
  return applications.find((a) => a.id === id && a.ownerId === ownerId);
}

function deleteApplication(id, ownerId) {
  applications = applications.filter((a) => !(a.id === id && a.ownerId === ownerId));
}

function updateApplication(id, ownerId, updates) {
  const application = readApplication(id, ownerId);
  if (!application) {
    return undefined;
  }
  Object.assign(application, updates);
  return application;
}

module.exports = { listApplications, writeApplication, readApplication, deleteApplication, updateApplication};