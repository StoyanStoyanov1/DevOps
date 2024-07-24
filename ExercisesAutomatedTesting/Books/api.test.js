const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('./server'); // Уверете се, че пътят до server.js е правилен

const expect = chai.expect;

chai.use(chaiHttp);

it('Should POST a book', (done) => {
	const book = { id: '1', title: "Test Book", author: "Test Author" };

	chai.request(server)
		.post('/books')
		.send(book)
		.end((err, res) => {
			if (err) done(err);


			expect(res.statusCode).to.equal(200);

			done();
		});
});
