let supertest = require('supertest');
let expect = require('chai').expect;
var data = require('../utils/test_data');
const chai = require('chai');
const asserttype = require('chai-asserttype');
chai.use(asserttype);
var app = 'https://jsonplaceholder.typicode.com';

describe('JSON place holder home page', () => {
  it('Home page: should return a 200 response', (done) => {
    supertest(app)
      .get('/')
      .expect('Content-Type', 'text/html; charset=UTF-8')
      .expect(200, done);
  });

  it('Validates json response data from /posts/1', (done) => {
    supertest(app)
      .get('/posts/1')
      .end(function (err, res) {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.userId).to.equal(1);
        expect(res.body.id).to.equal(1);
        expect(res.body.title).not.null;
        done();
      });
  });

  it('Validates json response data from /users/1', (done) => {
    supertest(app)
      .get('/users/1')
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.name).to.be.string();
        expect(res.body.id).to.be.number();
        expect(res.body.company).to.be.object();
        done();
      });
  });

  it('Validates the response from POST method', (done) => {
    var test_data = JSON.parse(data);
    supertest(app)
      .post('/posts')
      .send(data)
      .set('Content-type', 'application/json; charset=UTF-8')
      .end(function (err, res) {
        if (err) return done(err);
        expect(res.status).to.equal(201);
        expect(res.body.id).to.equal(101);
        expect(res.body.title).to.equal(test_data.title);
        expect(res.body.userId).to.equal(test_data.userId);
        done();
      });
  });

  it('Validates response from DELETE method', (done) => {
    supertest(app)
      .delete('/posts/2')
      .end(function (err, res) {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.empty;
        done();
      });
  });

  it('Validates response from PUT method', (done) => {
    var test_data = JSON.parse(data);
    supertest(app)
      .put('/posts/1')
      .send(data)
      .set('Content-type', 'application/json; charset=UTF-8')
      .end(function (err, res) {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.id).to.equal(1);
        // expect(res.body.title).to.equal(test_data.title);
        expect(res.body.userId).to.equal(test_data.userId);
        done();
      });
  });

  it('Validates value of userId before & after PATCH method', (done) => {
    supertest(app)
      .patch('/posts/1')
      .expect('"userId": 1')
      .send({ userId: 202 })
      .end(function (err, res) {
        expect(res.status).to.equal(200);
        expect(res.body.userId).to.equal(202);
        done();
      });
  });

  it('Validates value of count of users', (done) => {
    supertest(app)
      .get('/users')
      .end(function (err, res) {
        expect(res.status).to.equal(200);
        expect(Object.keys(res.body).length).to.equal(10);
        done();
      });
  });
});
