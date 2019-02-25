import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import users from '../database/seed-data/user';

import app from '../../index';

chai.use(chaiHttp);

let userToken;

describe('Edit user profile', () => {
  before((done) => {
    chai.request(app)
      .post('/api/users/login')
      .send({
        user: {
          email: users[0].email,
          password: '1234esa2'
        }
      })
      .end((err, res) => {
        userToken = res.body.user.token;
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        done();
      });
  });
  /**
   * @description - PUT (It should update a logged in user profile)
   */
  it('should update a users profile', (done) => {
    chai.request(app)
      .put('/api/users')
      .set('Authorization', userToken)
      .send({
        user: {
          address1: '235 Ikorodu road, Ilupeju',
          city: 'Ilupeju',
          region: 'Lagos',
          country: 'Nigeria',
          postalCode: '23401'
        }
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('Profile successfully updated');
        done();
      });
  });
  it('should not update a users profile with invalid postal code', (done) => {
    chai.request(app)
      .put('/api/users')
      .set('Authorization', userToken)
      .send({
        user: {
          address1: '235 Ikorodu road, Ilupeju',
          city: 'Ilupeju',
          region: 'Lagos',
          country: 'Nigeria',
          postalCode: '234'
        }
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.errors.postalCode[0]).to.equal(
          'The postalCode must be at least 5 characters.'
        );
        done();
      });
  });
});
