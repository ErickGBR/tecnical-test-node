const { Router } = require("express")
const {
    databaseCreation
} = require("../config/db")

const router = Router()
router.get("/", databaseCreation)

module.exports = router