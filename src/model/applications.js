// In-memory "database" — just an array, lives only as long as the process runs
let applications = [];

function listApplications() {
  return applications;
}

function writeApplication(application) {
  applications.push(application);
  return application;
}

function readApplication(id) {
  return applications.find((a) => a.id === id);
}

function deleteApplication(id) {
  applications = applications.filter((a) => a.id !== id);
}

function updateApplication(id, updates) {
  const application = readApplication(id);
  if (!application) {
    return undefined;
  }
  Object.assign(application, updates);
  return application;
}

module.exports = { listApplications, writeApplication, readApplication, deleteApplication, updateApplication};