import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';
import userData from './helpers/userTestData';
import user from '../database/seed-data/user';


chai.use(chaiHttp);


describe('User SignUp', () => {
  describe('When passed invalid data', () => {
    it('It should throw an error if password and confirm password does not match.', (done) => {
      chai.request(app)
        .post('/api/users')
        .set('Content-Type', 'application/json')
        .send({
          user: { ...userData[0], password: 'password' }
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.errors.password[0]).to.equal('Password Mismatch.');
          if (err) return done(err);
          done();
        });
    });
    it('It should throw an error if password lenght is less than 8 characters.', (done) => {
      const userWithInvalidPasswordFormat = { ...userData[0], password: 'pass' };
      chai.request(app)
        .post('/api/users')
        .set('Content-Type', 'application/json')
        .send({
          user: userWithInvalidPasswordFormat
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.errors.password[0])
            .to.equal('The password is too short. Min length is 8 characters.');
          if (err) return done(err);
          done();
        });
    });
  });

  describe('When passed valid data', () => {
    it('it should create a new User and respond with success message.', (done) => {
      chai.request(app)
        .post('/api/users')
        .set('Content-Type', 'application/json')
        .send({
          user: userData.validUserSignup

        })
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.type).to.equal('application/json');
          expect(res.body.message).to.equal('Registration successful');
          if (err) return done(err);
          done();
        });
    });
    it('it should not create a new user with existing email ', (done) => {
      chai.request(app)
        .post('/api/users')
        .set('Content-Type', 'application/json')
        .send({
          user: userData.validUserSignup
        })
        .end((err, res) => {
          expect(res.status).to.equal(409);
          expect(res.body.message).to.equal('Email is already in use by another Customer.');
          if (err) return done(err);
          done();
        });
    });
  });
});

describe('User Login', () => {
  describe('When passed valid data/credentials', () => {
    it('It should authenticate a user and respond with jwt', (done) => {
      chai.request(app)
        .post('/api/users/login')
        .set('Content-Type', 'application/json')
        .send({
          user: {
            email: user[0].email,
            password: '1234esa2',
          }
        })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal('Congratulations, you are now logged in.');
          if (err) return done(err);
          done();
        });
    });
  });

  describe('When passed invalid data/credentials', () => {
    it('It should not authenticate a user if invalid credentials sent.', (done) => {
      chai.request(app)
        .post('/api/users/login')
        .set('Content-Type', 'application/json')
        .send({
          user: {
            email: user[0].email,
            password: 'september'
          }
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('Email or password does not match.');
          if (err) return done(err);
          done();
        });
    });
    describe('When User send Email that does not exist in the database', () => {
      it('it should return a message "User does not exist." if user not found', (done) => {
        const userInfo = { email: 'tt@tt.com', password: 'testingnow' };
        chai.request(app)
          .post('/api/users/login')
          .set('Content-Type', 'application/json')
          .send({
            user: userInfo
          })
          .end((err, res) => {
            expect(res.status).to.equal(404);
            expect(res.body.message).to.equal('You are yet to register. Kindly sign up.');
            if (err) return done(err);
            done();
          });
      });
    });
  });
});
