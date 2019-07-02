const deepcopy = require('deepcopy');
const utils = require('./lib/utils');

/**
 * Send results from services back to client with http status code 201
 *
 * @param results
 * @param res The response object to return
 */
/* istanbul ignore next */
function sendResults(results, res) {
  return res.status(201).json(results);
}

/**
 * Send error object back to client along with http status code 500
 * @param errorObj Error object returned from server
 * @param res Response object used to return error to client.
 */
/* istanbul ignore next */
function handleError(errorObj, res) {
  const error = deepcopy(errorObj);
  let httpStatus = 500;

  console.error('Error handler sending error.', error);

  if (typeof error.status !== 'undefined') {
    httpStatus = error.status;
  }

  return res.status(httpStatus).json(error.message);
}

exports.executeListAllContact = async () => {
  const data = await utils.list();
  const response = [];
  data.rows.forEach((record) => {
    // const pawan = record.doc.data ? record.doc.data.name : record.doc.name;
    response.push({
      id: record.id,
      name: record.doc.data ? record.doc.data.name : record.doc.name,
      address: record.doc.data ? record.doc.data.address : record.doc.name,
      phone: record.doc.data ? record.doc.data.phone : record.doc.name,
      email: record.doc.data ? record.doc.data.email : record.doc.name,
    });
  });
  return response;
};

/* istanbul ignore next */
exports.listAllContacts = async (req, res) => {
  try {
    const response = await module.exports.executeListAllContact();
    sendResults(response, res);
  } catch (ex) {
    handleError(ex, res);
  }
};

exports.executeCreateContact = async (query) => {
  const allDocs = await utils.list();
  if (!allDocs.total_rows) {
    query._id = '1';
  } else {
    const latestID = parseInt(allDocs.rows[allDocs.total_rows - 1].id, 10) + 1;
    query._id = latestID.toString();
  }
  const result = await utils.save(query);
  return result;
};

/* istanbul ignore next */
exports.createContact = async (req, res) => {
  try {
    const result = await module.exports.executeCreateContact(req.body);
    sendResults(result, res);
  } catch (ex) {
    handleError(ex, res);
  }
};

/* istanbul ignore next */
exports.updateContact = async (req, res) => {
  try {
    const result = await utils.update(req.params.id, req.body);
    sendResults(result, res);
  } catch (ex) {
    handleError(ex, res);
  }
};

/* istanbul ignore next */
exports.getSpecificContact = async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const result = await utils.listSpecificRecord(id);
    sendResults(result, res);
  } catch (ex) {
    handleError(ex, res);
  }
};

/* istanbul ignore next */
exports.deleteContact = async (req, res) => {
  try {
    const {
      id
    } = req.params;
    await utils.deleteSpecificRecord(id);
    sendResults({
      msg: `Document with id ${id} successfully deleted.`
    }, res);
  } catch (ex) {
    handleError(ex, res);
  }
};
