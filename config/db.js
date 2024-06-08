const sequelize = require('./database');
const { response } = require("express");

const databaseCreation = (req, res = response) => {
    try {
        sequelize.sync({ force: true }).then(() => {
            console.log("Create tables ");
        });

        res.status(200).send({
            message: "database is created"
        });
    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
}

module.exports = {
    databaseCreation
}
