
const chai = require('chai');
const chaiHttp = require('chai-http');
const contactEntry = require('../contact-entry.js');
const utils = require('../lib/utils.js');

chai.use(chaiHttp);

describe('contact-entry.js', () => {
  it('Should create a new contact', async () => {
    try {
      const requestBody = {
        name: {
          first: 'Harold',
          middle: 'Francis',
          last: 'Gilkey'
        },
        address: {
          street: '8360 High Autumn Row',
          city: 'Cannon',
          state: 'Delaware',
          zip: '19797'
        },
        phone: [{
          number: '302-611-9148',
          type: 'home'
        },
        {
          number: '302-532-9427',
          type: 'mobile'
        }
        ],
        email: 'harold.gilkey@yahoo.com'
      };
      const result = await contactEntry.executeCreateContact(requestBody);
      chai.expect(parseInt(result.id, 10)).greaterThan(0);
      chai.expect(result.ok).to.equal(true);
    } catch (error) {
      chai.expect(error.message).to.equal('This should not happen');
    }
  });
  it('Should list all contacts', async () => {
    try {
      const result = await contactEntry.executeListAllContact();
      chai.expect(result.length).greaterThan(0);
      chai.expect(result[0]).to.have.property('name');
    } catch (error) {
      chai.expect(error.message).to.equal('This should not happen');
    }
  });


  it('Should list all contacts', async () => {
    try {
      const result = await utils.list();
      chai.expect(result.rows.length).greaterThan(0);
      chai.expect(result.rows[0].doc).to.have.property('name');
    } catch (error) {
      chai.expect(error.message).to.equal('This should not happen');
    }
  });

  it('Should list a aspecific contact record', async () => {
    try {
      const result = await utils.listSpecificRecord('1');
      chai.expect(result._id).equals('1');
    } catch (error) {
      chai.expect(error.message).to.equal('This should not happen');
    }
  });
});
