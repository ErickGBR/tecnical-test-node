const { createAuthor, getAuthorById, getAuthors, updateAuthor, deleteAuthor } = require('../controllers/authorController');

const AuthorModel = require('../models/author');
jest.mock('../models/author')

describe('Author Controller', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('createAuthor should create a new author', async () => {
        const req = {
            body: { name: 'Author Name', bio: 'test' }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };

        AuthorModel.create.mockResolvedValue(req.body);
        await createAuthor(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith({
            status: true,
            msg: "Author created",
            author: req.body
        });
    });

    test('getAuthorById should return an author by id', async () => {
        const req = {
            params: { id: 1 }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };

        AuthorModel.findOne.mockResolvedValue({ id: 1, name: 'Author Name', bio: 'test' });

        await getAuthorById(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith({
            status: true,
            msg: "author by id",
            data: { id: 1, name: 'Author Name', bio: 'test' }
        });
    });

    test('getAuthors should return all authors', async () => {
        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };

        AuthorModel.findAll.mockResolvedValue([
            { id: 1, name: 'Author Name 1', bio: 'test' },
            { id: 2, name: 'Author Name 2', bio: 'test' }
        ]);

        await getAuthors(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith({
            status: true,
            msg: "get all authors",
            data: [
                { id: 1, name: 'Author Name 1', bio: 'test' },
                { id: 2, name: 'Author Name 2', bio: 'test' }
            ]
        });
    });

    test('updateAuthor should update an author', async () => {
        const req = {
            params: { id: 1 },
            body: { name: 'Updated Author Name', bio: 'updated test' }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };

        AuthorModel.update.mockResolvedValue([1]);

        await updateAuthor(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith({
            status: true,
            msg: "update author",
            authorsResult: [1]
        });
    });

    test('deleteAuthor should delete an author', async () => {
        const req = {
            params: { id: 1 }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };

        AuthorModel.destroy.mockResolvedValue(1);

        await deleteAuthor(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith({
            status: true,
            msg: "Delete author"
        });
    });
});
