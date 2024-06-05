const { Router } = require("express")
const {
    getAuthors,
    getAuthorById,
    createAuthor,
    updateAuthor,
    deleteAuthor
} = require("../controllers/authorController")
const router = Router()

router.get("/", getAuthors)
router.get("/:id", getAuthorById)
router.post("", createAuthor)
router.put(":id", updateAuthor)
router.delete("", deleteAuthor)

module.exports = router