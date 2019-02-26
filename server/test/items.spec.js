import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';

chai.use(chaiHttp);


describe('Get all items', () => {
  it('It should return all items in the database', (done) => {
    chai.request(app)
      .get('/api/items')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.items).to.be.an('array');
        if (err) return done(err);
        done();
      });
  });
  it('It should return a single item', (done) => {
    chai.request(app)
      .get('/api/items/1')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.product.name).to.equal('Arc d\'Triomphe');
        if (err) return done(err);
        done();
      });
  });
  it('It should return item by department', (done) => {
    chai.request(app)
      .get('/api/items?department=regional')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.items).to.be.an('array');
        if (err) return done(err);
        done();
      });
  });
  it('It should return item by department and category', (done) => {
    chai.request(app)
      .get('/api/items?department=regional&category=french')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.items).to.be.an('array');
        expect(res.body.items[0].Categories).to.be.an('array');
        if (err) return done(err);
        done();
      });
  });
  it('It should search by item name', (done) => {
    chai.request(app)
      .get('/api/items?search=arc')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.items).to.be.an('array');
        if (err) return done(err);
        done();
      });
  });
  it('It should return error message for items that doesnt exist', (done) => {
    chai.request(app)
      .get('/api/items/150')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('Item not found');
        if (err) return done(err);
        done();
      });
  });
});
