const { response } = require("express");
const BookModel = require("../models/book");

const createBook = async (req, res = response) => {

    try {
        const payload = req.body;
        const book = await BookModel.createBook(payload);
        res.status(200).send({
            status: true,
            message: "Book is created ",
            data: book
        })

    } catch (error) {
        res.status(500).send({
            status: false,
            message: "Cant create book",
            error
        })

    }
}

const getBookById = async (req, res = response) => {

    try {
        const id = req.params.id;
        const getById = await BookModel.findOne({ id })

        return res.status(200).send({
            status: 200,
            message: "data by id",
            data: getById
        })
    } catch (error) {
        return res.status(500).send({
            status: false,
            error
        })
    }
}

const getBooks = async (req, res = response) => {
    try {
        const getAllBooks = await BookModel.findAll();
        return res.status(200).send({
            status: true,
            msg: "all books",
            getAllBooks
        })

    } catch (error) {
        return res.status(500).send({
            status: false,
            msg: "Error to get",
            error
        })
    }
}

const updateBook = async (req, res = response) => {
    try {
        const id = req.params.id;
        const book = await BookModel.findOne({ id })
        const payload = req.body;

        book.title = payload.title;
        book.summary = payload.summary;
        book.authId = payload.authId;

        const update = await BookModel.update(book, {
            where: {
                id
            }
        });

        res.status(200).send({
            status: true,
            msg: "Update data",
            data: update
        })


    } catch (error) {
        return res.status(500).send({
            status: false,
            message: "Cant update",
            err: error
        })
    }
}


const deleteBook = async (req, res = response) => {
    try {
        const id = req.params.id;
        await BookModel.destroy({
            where: {
                id
            }
        })

        return res.status(200).send({
            status: true,
            msg: "delete book"
        })

    } catch (error) {

        return res.status(500).send({
            status: false,
            msg: "cant delete",
        })

    }
}

module.exports = {
    createBook,
    getBookById,
    getBooks,
    updateBook,
    deleteBook,
}