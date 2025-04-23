import {Sequelize} from 'sequelize';
import dotenv from 'dotenv'; 
dotenv.config(); // Load environment variables

export const sequelize = new Sequelize(
process.env.DB_NAME,
process.env.DB_USER,
process.env.DB_PASSWORD,
{                                   //new Sequelize(database, username, password, options);
    host: process.env.DB_HOST,
    dialect:'mysql',
    logging: false
}
);

export const connectDB = async ()=> {
    try{
        await sequelize.authenticate(); // sequelize tries to connect to the database and checks if the connection works
        console.log("Mysql connected successfully");
    }
    catch(error)
    {
        console.error("Can't connect to database: ", error);
    }
}
