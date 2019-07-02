const Cloudant = require('@cloudant/cloudant');

const cloudant = new Cloudant({
  account: '160f8cad-0578-453b-973c-7644fb30bfea-bluemix',
  plugins: {
    iamauth: {
      iamApiKey: process.env.iamApiKey
    }
  }
});
const db = cloudant.db.use('contact-entry-db');

exports.list = () => new Promise(((resolve, reject) => {
  db.list({
    include_docs: true
  }, (err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve(res);
    }
  });
}));

exports.listSpecificRecord = id => new Promise(((resolve, reject) => {
  db.get(id, (err, res) => {
    if (err) {
      reject(new Error('No record found'));
    } else {
      resolve(res);
    }
  });
}));

/* istanbul ignore next */
exports.save = data => new Promise(((resolve, reject) => {
  db.insert(data, (err, res) => {
    if (err) {
      reject(err);
    } else {
      resolve(res);
    }
  });
}));

/* istanbul ignore next */
exports.update = (id, data) => new Promise((async (resolve, reject) => {
  try {
    const doc = await module.exports.listSpecificRecord(id);
    db.insert({ _id: id, _rev: doc._rev, data: data }, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  } catch (err) {
    console.error(err);
    reject(err);
  }
}));

/* istanbul ignore next */
exports.deleteSpecificRecord = id => new Promise((async (resolve, reject) => {
  try {
    const doc = await module.exports.listSpecificRecord(id);
    db.destroy(id, doc._rev, (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  } catch (err) {
    console.error(err);
    reject(err);
  }
}));
