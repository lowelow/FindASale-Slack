const Sequelize = require('sequelize');
const path      = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

// CONNECTION DETAILS
const sequelize = new Sequelize(process.env.POSTGRES_DB, process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
    host: 'database',
    dialect: 'postgres',
    logging: false
});

// MODELS
const User = require('./models/User')(sequelize, Sequelize);
const Post = require('./models/Post')(sequelize, Sequelize);

waitForDatabase();

module.exports = sequelize;
module.exports = {
    User,
    Post
}

async function waitForDatabase() {
    while (true) {
        try {
            // AUTHENTICATE CONNECTION
            sequelize.authenticate();
            console.log('Connection to db has been established successfully.');

            // SYNC ALL MODELS
            sequelize.sync( { force : false }).then(() => {
                console.log('All tables created successfully.');
            });

            break;
        }
        catch(err) {
            console.log('Unable to connect to db. Retrying ...');
            console.log(err);
        };
    
        await new Promise(res => setTimeout(res, 5000));;
    }
}