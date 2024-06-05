const { response } = require("express");
const AuthorModel = require("../models/author");

const createAuthor = async (req, res = response) => {
    try {
        const payload = req.body;
        const author = await AuthorModel.create(payload);
        return res.status(200).send({
            status: true,
            msg: "Author created",
            author
        })

    } catch (error) {
        return res.status(500).send({
            status: false,
            msg: "Error when try create",
            error
        })
    }
}

const getAuthorById = async (req, res = response) => {
    try {
        const id = req.params.id;
        const author = await AuthorModel.findOne({
            where: {
                id
            }
        })
        return res.status(200).send({
            status: true,
            msg: "author by id",
            data: author
        })
    } catch (error) {
        return res.status(500).send({
            status: false,
            msg: "error try get author",
            error
        })
    }
}

const getAuthors = async (req, res = response) => {
    try {
        const getAllAuthors = await AuthorModel.findAll()
        return res.status(200).send({
            status: true,
            msg: "get all authors",
            data: getAllAuthors
        })
    } catch (error) {
        return res.status(500).send({
            status: false,
            msg: "error to get author",
            error
        })
    }
}

const updateAuthor = async (req, res = response) => {
    try {
        const id = req.params.id;
        const payload = req.body;
        const authorsResult = await AuthorModel.update(payload, {
            where: {
                id
            }
        })
        return res.status(200).send({
            status: true,
            msg: "update author",
            authorsResult
        })
    } catch (error) {
        return res.status(500).send({
            status: false,
            error
        })
    }
}


const deleteAuthor = async (req, res = response) => {
    try {
        const id = req.params.id;
        await AuthorModel.destroy(id)
        return res.status(200).send({
            status: true,
            msg: "Delete author"
        })
    } catch (error) {
        return res.status(500).send({
            status: false,
            error
        })
    }
}

module.exports = {
    createAuthor,
    getAuthorById,
    getAuthors,
    updateAuthor,
    deleteAuthor,
}