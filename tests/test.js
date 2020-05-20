const dotenv = require("dotenv");
const request = require('supertest');
const app = require("../application.js");
const chai = require("chai");
const chaiHttp = require("chai-http");

dotenv.config();
const ENV = process.env.APP_ENV || "dev";

const { expect } = chai;
chai.use(chaiHttp);

describe("Server!", () => {
  it("Node application is running successfully", (done) => {
    chai
      .request(app)
      .get("/")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.equals("Application Launched");
        expect(res.body.message).to.equals(
          "Node application is running successfully" + ENV
        );
        done();
      });
  });

//   describe('Login API', function() {
//     // it('Should success if credential is valid', (done) => {
//     //     this.timeout(30000);
//     //     request(app)
//     //        .post('/lib/routes/auth')
//     //        .set('Accept', 'application/json')
//     //        .set('Content-Type', 'application/json')
//     //        .send({ username: 'username', password: 'password' })
//     //        .expect(200)
          
//     //        .end(done);
//     // })
    
// });

});
