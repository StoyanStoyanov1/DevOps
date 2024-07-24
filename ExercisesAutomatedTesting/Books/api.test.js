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

			const body = res.body;
			expect(res.statusCode, "Status code").to.equal(200);
			expect(body.id, "Book ID Property").to.be.equal(book.id);
			expect(body.title, "Book Title Property").to.be.equal(book.title);
			expect(body.author, "Book Author").to.be.equal(book.author);
			done();
		});
});
