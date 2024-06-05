const { createAuthor, getAuthorById, getAuthors, updateAuthor, deleteAuthor } = require('../controllers/authorController');
const AuthorModel = require('../models/author');

jest.mock('../models/author');

describe('Author Controller', () => {
  let req, res;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };
  });

  describe('createAuthor', () => {
    it('should create a new author and return status 200', async () => {
      const payload = { name: 'Author Name', bio: 'Author Bio' };
      req.body = payload;
      AuthorModel.create.mockResolvedValue(payload);

      await createAuthor(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({
        status: true,
        msg: 'Author created',
        author: payload
      });
    });

    it('should return status 500 if there is an error', async () => {
      req.body = {};
      AuthorModel.create.mockRejectedValue(new Error('Error'));

      await createAuthor(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith({
        status: false,
        msg: 'Error when try create',
        error: expect.any(Error)
      });
    });
  });

  describe('getAuthorById', () => {
    it('should get an author by ID and return status 200', async () => {
      const author = { id: 1, name: 'Author Name', bio: 'Author Bio' };
      req.params = { id: 1 };
      AuthorModel.findOne.mockResolvedValue(author);

      await getAuthorById(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({
        status: true,
        msg: 'author by id',
        data: author
      });
    });

    it('should return status 500 if there is an error', async () => {
      req.params = { id: 1 };
      AuthorModel.findOne.mockRejectedValue(new Error('Error'));

      await getAuthorById(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith({
        status: false,
        msg: 'error try get author',
        error: expect.any(Error)
      });
    });
  });

  describe('getAuthors', () => {
    it('should get all authors and return status 200', async () => {
      const authors = [{ id: 1, name: 'Author Name', bio: 'Author Bio' }];
      AuthorModel.findAll.mockResolvedValue(authors);

      await getAuthors(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({
        status: true,
        msg: 'get all authors',
        data: authors
      });
    });

    it('should return status 500 if there is an error', async () => {
      AuthorModel.findAll.mockRejectedValue(new Error('Error'));

      await getAuthors(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith({
        status: false,
        msg: 'error to get author',
        error: expect.any(Error)
      });
    });
  });

  describe('updateAuthor', () => {
    it('should update an author and return status 200', async () => {
      const payload = { name: 'Updated Author' };
      req.params = { id: 1 };
      req.body = payload;
      AuthorModel.update.mockResolvedValue([1]); // Sequelize returns an array with the number of affected rows

      await updateAuthor(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({
        status: true,
        msg: 'update author',
        authorsResult: [1]
      });
    });

    it('should return status 500 if there is an error', async () => {
      req.params = { id: 1 };
      req.body = {};
      AuthorModel.update.mockRejectedValue(new Error('Error'));

      await updateAuthor(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith({
        status: false,
        error: expect.any(Error)
      });
    });
  });

  describe('deleteAuthor', () => {
    it('should delete an author and return status 200', async () => {
      req.params = { id: 1 };
      AuthorModel.destroy.mockResolvedValue(1); // Sequelize returns the number of affected rows

      await deleteAuthor(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({
        status: true,
        msg: 'Delete author'
      });
    });

    it('should return status 500 if there is an error', async () => {
      req.params = { id: 1 };
      AuthorModel.destroy.mockRejectedValue(new Error('Error'));

      await deleteAuthor(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith({
        status: false,
        error: expect.any(Error)
      });
    });
  });
});
