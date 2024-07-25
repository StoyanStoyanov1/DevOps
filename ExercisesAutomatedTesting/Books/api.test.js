const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('./server'); // Уверете се, че пътят до server.js е правилен

const expect = chai.expect;

chai.use(chaiHttp);

describe('Books', () => {


	it('should POST a book', (done) => {
		const book = {id: '1', title: "Test Book", author: "Test Author"};

		chai.request(server)
			.post('/books')
			.send(book)
			.end((err, res) => {
				if (err) done(err);

				const body = res.body;
				expect(res.statusCode, "Status code").to.equal(201);
				expect(body.id, "Book ID Property").to.be.equal(book.id);
				expect(body.title, "Book Title Property").to.be.equal(book.title);
				expect(body.author, "Book Author").to.be.equal(book.author);
				done();
			});

	});
	it('should GET all books', (done) => {
		chai.request(server)
			.get('/books')
			.end((err, res) => {
				expect(res).to.have.status(200);
				expect(res.body).to.be.a('array');
				done();
			});
	});

	it('should GET a single book', (done) => {
		const bookId = 1;

		chai.request(server)
			.get(`/books/${bookId}`)
			.end((err, res) => {
				expect(res).to.have.status(200)
				expect(res.body).to.be.a('object');
				expect(res.body).to.have.property('id');
				expect(res.body).to.have.property('title');
				expect(res.body).to.have.property('author');
				done();
			})
	})

	it('should PUT an existing book', (done) => {
		const bookId = 1;
		const updatedBook = {id: bookId, title: 'Updated Test Book', author: 'Updated Test Author'};

		chai.request(server)
			.put(`/books/${bookId}`)
			.send(updatedBook)
			.end((err, res) => {
				expect(res).to.have.status(200);
				expect(res.body).to.be.a('object');
				expect(res.body.title).to.equal('Updated Test Book');
				expect(res.body.author).to.equal('Updated Test Author');
				done();
			})
	});

	it('should DELETE a book', (done) => {
		const bookId = '1';
		const book = { id: bookId, title: "Test Book", author: "Test Author" };

		chai.request(server)
			.post('/books')
			.send(book)
			.end((err, res) => {
				expect(res).to.have.status(201);
				expect(res.body).to.be.an('object');
				expect(res.body).to.have.property('id').eql(bookId);

				chai.request(server)
					.delete(`/books/${bookId}`)
					.end((err, res) => {
						expect(res).to.have.status(204);
						done();
					});
			});
	});


})