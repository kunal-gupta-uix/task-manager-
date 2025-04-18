const {Sequelize} = require('sequelize');
require('dotenv').config(); // This adds all the variables inside .env to process.env

const sequelize = new Sequelize(
process.env.DB_NAME,
process.env.DB_USER,
process.env.DB_PASSWORD,
{                                   //new Sequelize(database, username, password, options);
    host: process.env.DB_HOST,
    dialect:'mysql',
    logging: false
}
);

const connectDB = async ()=> {
    try{
        await sequelize.authenticate(); // sequelize tries to connect to the database and checks if the connection works
        console.log("Mysql connected successfully");
    }
    catch(error)
    {
        console.error("Can't connect to database: ", error);
    }
}

module.exports = {sequelize, connectDB};