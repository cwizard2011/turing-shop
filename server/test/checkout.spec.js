import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import users from '../database/seed-data/user';

import app from '../../index';

chai.use(chaiHttp);

let userToken;

describe('Checkout', () => {
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
  it('should not checkout if shipping id is invalid', (done) => {
    chai.request(app)
      .post('/api/checkout')
      .set('Authorization', userToken)
      .send({ shippingId: 10 })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('The shipping id provided is invalid, please check again'); // eslint-disable-line
        done();
      });
  });
});
