const { createBook, getBookById, getBooks, updateBook, deleteBook } = require('../controllers/bookController');
const BookModel = require('../models/book');

// Mock de la request y response de Express
const mockRequest = (body, params) => ({
    body,
    params
});

const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    return res;
};

// Mock del modelo de libro
jest.mock('../models/book', () => ({
    create: jest.fn(),
    findOne: jest.fn(),
    findAll: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn()
}));

describe('Book Controller', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('createBook', () => {
        it('should create a book', async () => {
            const req = mockRequest({ title: 'Test Book', summary: 'Test Summary', authId: 1 });
            const res = mockResponse();
            const mockBook = { title: 'Test Book', summary: 'Test Summary', authId: 1 };
            BookModel.create.mockResolvedValue(mockBook);

            await createBook(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send).toHaveBeenCalledWith({
                status: true,
                message: 'Book is created ',
                data: mockBook
            });
        });

        it('should handle error during book creation', async () => {
            const req = mockRequest({ title: 'Test Book', summary: 'Test Summary', authId: 1 });
            const res = mockResponse();
            const errorMessage = 'Error during book creation';
            BookModel.create.mockRejectedValue(new Error(errorMessage));

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
        it('should get a book by ID', async () => {
            const req = mockRequest({}, { id: 1 });
            const res = mockResponse();
            const mockBook = { id: 1, title: 'Test Book', summary: 'Test Summary', authId: 123 };
            BookModel.findOne.mockResolvedValue(mockBook);

            await getBookById(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send).toHaveBeenCalledWith({
                status: 200,
                message: 'data by id',
                data: mockBook
            });
        });

        it('should handle error during book retrieval by ID', async () => {
            const req = mockRequest({}, { id: 1 });
            const res = mockResponse();
            const errorMessage = 'Error during book retrieval by ID';
            BookModel.findOne.mockRejectedValue(new Error(errorMessage));

            await getBookById(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith({
                status: false,
                error: expect.any(Error)
            });
        });
    });

    describe('getBooks', () => {
        it('should get all books', async () => {
            const req = mockRequest();
            const res = mockResponse();
            const mockBooks = [{ id: 1, title: 'Test Book 1' }, { id: 2, title: 'Test Book 2' }];
            BookModel.findAll.mockResolvedValue(mockBooks);

            await getBooks(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send).toHaveBeenCalledWith({
                status: true,
                msg: 'all books',
                getAllBooks: mockBooks
            });
        });

        it('should handle error during book retrieval', async () => {
            const req = mockRequest();
            const res = mockResponse();
            const errorMessage = 'Error during book retrieval';
            BookModel.findAll.mockRejectedValue(new Error(errorMessage));

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
        it('should update a book', async () => {
            const req = mockRequest({ title: 'Updated Book Title', summary: 'Updated Summary', authId: 1 }, { id: 1 });
            const res = mockResponse();
            const mockBook = { title: 'Updated Book Title', summary: 'Updated Summary', authId: 1 };
            BookModel.findOne.mockResolvedValue(mockBook);

            await updateBook(req, res);

            expect(BookModel.update).toHaveBeenCalledWith(
                { title: 'Updated Book Title', summary: 'Updated Summary', authId: 1 },
                { where: { id: 1 } }
            );
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send).toHaveBeenCalledWith({
                status: true,
                msg: 'Update data',
                data: expect.anything()
            });
        });

        it('should handle error during book update', async () => {
            const req = mockRequest({ title: 'Updated Book Title', summary: 'Updated Summary', authId: 13 }, { id: "test" });
            const res = mockResponse();
            const errorMessage = 'Error during book update';
            BookModel.findOne.mockRejectedValue(new Error(errorMessage));

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
        it('should delete a book', async () => {
            const req = mockRequest({}, { id: 1 });
            const res = mockResponse();

            await deleteBook(req, res);

            expect(BookModel.destroy).toHaveBeenCalledWith({ where: { id: 1 } });
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send).toHaveBeenCalledWith({
                status: true,
                msg: 'delete book'
            });
        });

        it('should handle error during book deletion', async () => {
            const req = mockRequest({}, { id: 1 });
            const res = mockResponse();
            const errorMessage = 'Error during book deletion';
            BookModel.destroy.mockRejectedValue(new Error(errorMessage));

            await deleteBook(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith({
                status: false,
                msg: 'cant delete'
            });
        });
    });
});
