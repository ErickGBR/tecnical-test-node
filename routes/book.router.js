const { Router } = require("express")
const {
    getBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
} = require("../controllers/bookController")
const router = Router()

router.get("", getBooks)
router.get("/:id", getBookById)
router.post("", createBook)
router.put("/:id", updateBook)
router.delete("/:id", deleteBook)

module.exports = router