import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import users from '../database/seed-data/user';

import app from '../../index';

chai.use(chaiHttp);

let userToken;

describe('Shopping Cart', () => {
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
  it('should add items to shopping cart', (done) => {
    chai.request(app)
      .post('/api/cart')
      .set('Authorization', userToken)
      .send({
        cart: {
          productId: '1',
          attributes: ['L', 'White'],
          quantity: 3

        }
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message');
        expect(res.body.cart.quantity).to.equal(3);
        expect(res.body.message).to.equal('Item added to cart successfully');
        done();
      });
  });
  it('should not add items to shopping cart if an attribute does not exist', (done) => {
    chai.request(app)
      .post('/api/cart')
      .set('Authorization', userToken)
      .send({
        cart: {
          productId: '1',
          attributes: ['XXL', 'White'],
          quantity: 3

        }
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('The attribute value provided does not exist');
        done();
      });
  });
  it('should not add items to shopping cart if product Id is not provided', (done) => {
    chai.request(app)
      .post('/api/cart')
      .set('Authorization', userToken)
      .send({
        cart: {
          attributes: ['L', 'White'],
          quantity: 3

        }
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body.errors.productId[0]).to.equal('productId field cannot be empty');
        done();
      });
  });
  it('should not add items to shopping cart if attribute is not provided', (done) => {
    chai.request(app)
      .post('/api/cart')
      .set('Authorization', userToken)
      .send({
        cart: {
          productId: 1,
          quantity: 3

        }
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body.errors.attributes[0]).to.equal('attributes field cannot be empty');
        done();
      });
  });
  it('should not add items to shopping cart if quantity is not provided', (done) => {
    chai.request(app)
      .post('/api/cart')
      .set('Authorization', userToken)
      .send({
        cart: {
          productId: 1,
          attributes: ['L', 'White'],
        }
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body.errors.quantity[0]).to.equal('quantity field cannot be empty');
        done();
      });
  });
  it('should update quantity of item in shopping cart', (done) => {
    chai.request(app)
      .put('/api/cart/1')
      .set('Authorization', userToken)
      .send({
        cart: {
          quantity: 5
        }
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.updatedItem.item.quantity).to.equal(5);
        done();
      });
  });
  it('should not update quantity of item in shopping cart if quantity is invalid', (done) => {
    chai.request(app)
      .put('/api/cart/1')
      .set('Authorization', userToken)
      .send({
        cart: {
          quantity: 'asd5'
        }
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body.errors.quantity[0]).to.equal('The quantity must be an integer.');
        done();
      });
  });
  it('should get items in the shopping cart', (done) => {
    chai.request(app)
      .get('/api/cart')
      .set('Authorization', userToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.items).to.have.property('count');
        done();
      });
  });
  it('should not delete item with invalid cart id', (done) => {
    chai.request(app)
      .delete('/api/cart/111')
      .set('Authorization', userToken)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.equal('Item not found in the cart');
        done();
      });
  });
  it('should delete item in the shopping cart', (done) => {
    chai.request(app)
      .delete('/api/cart/1')
      .set('Authorization', userToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.equal('Item successfully deleted');
        done();
      });
  });
});
