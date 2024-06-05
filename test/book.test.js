const { createBook, getBookById, getBooks, updateBook, deleteBook } = require('../controllers/bookController');
const BookModel = require('../models/book');
const sequelize = require('../config/database'); // Asegúrate de que este archivo exporte tu instancia de Sequelize

jest.mock('../models/book'); // Mockea el modelo Book

// Desactiva los logs de Sequelize durante las pruebas
console.log = jest.fn();

describe('Book Controller', () => {
  let req, res;

  beforeAll(async () => {
    await sequelize.sync({ force: true }); // Sincroniza las tablas antes de todas las pruebas
  });

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };
  });

  afterAll(async () => {
    await sequelize.close(); // Cierra la conexión de Sequelize después de todas las pruebas
  });

  describe('createBook', () => {
    it('should create a new book and return status 200', async () => {
      const payload = { title: 'Book Title', summary: 'Book Summary', authId: 1 };
      req.body = payload;
      BookModel.createBook.mockResolvedValue(payload);

      await createBook(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({
        status: true,
        message: 'Book is created ',
        data: payload
      });
    });

    it('should return status 500 if there is an error', async () => {
      req.body = {};
      BookModel.createBook.mockRejectedValue(new Error('Error'));

      await createBook(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith({
        status: false,
        message: 'Cant create book',
        error: expect.any(Error)
      });
    });
  });

  describe('getBookById', () => {
    it('should get a book by ID and return status 200', async () => {
      const book = { id: 1, title: 'Book Title', summary: 'Book Summary', authId: 1 };
      req.params = { id: 1 };
      BookModel.findOne.mockResolvedValue(book);

      await getBookById(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({
        status: 200,
        message: 'data by id',
        data: book
      });
    });

    it('should return status 500 if there is an error', async () => {
      req.params = { id: 1 };
      BookModel.findOne.mockRejectedValue(new Error('Error'));

      await getBookById(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith({
        status: false,
        error: expect.any(Error)
      });
    });
  });

  describe('getBooks', () => {
    it('should get all books and return status 200', async () => {
      const books = [{ id: 1, title: 'Book Title', summary: 'Book Summary', authId: 1 }];
      BookModel.findAll.mockResolvedValue(books);

      await getBooks(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({
        status: true,
        msg: 'all books',
        getAllBooks: books
      });
    });

    it('should return status 500 if there is an error', async () => {
      BookModel.findAll.mockRejectedValue(new Error('Error'));

      await getBooks(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith({
        status: false,
        msg: 'Error to get',
        error: expect.any(Error)
      });
    });
  });

  describe('updateBook', () => {
    it('should update a book and return status 200', async () => {
      const payload = { title: 'Updated Book Title', summary: 'Updated Book Summary', authId: 1 };
      req.params = { id: 1 };
      req.body = payload;
      const book = { id: 1, ...payload };
      BookModel.findOne.mockResolvedValue(book);
      BookModel.update.mockResolvedValue([1]); // Sequelize returns an array with the number of affected rows

      await updateBook(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({
        status: true,
        msg: 'Update data',
        data: [1]
      });
    });

    it('should return status 500 if there is an error', async () => {
      req.params = { id: 1 };
      req.body = {};
      BookModel.findOne.mockRejectedValue(new Error('Error'));

      await updateBook(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith({
        status: false,
        message: 'Cant update',
        err: expect.any(Error)
      });
    });
  });

  describe('deleteBook', () => {
    it('should delete a book and return status 200', async () => {
      req.params = { id: 1 };
      BookModel.destroy.mockResolvedValue(1); // Sequelize returns the number of affected rows

      await deleteBook(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({
        status: true,
        msg: 'delete book'
      });
    });

    it('should return status 500 if there is an error', async () => {
      req.params = { id: 1 };
      BookModel.destroy.mockRejectedValue(new Error('Error'));

      await deleteBook(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith({
        status: false,
        msg: 'cant delete'
      });
    });
  });
});
