module.exports = (sequelize, type) => {
    const User = sequelize.define('user', {
        id: {
            type: type.INTEGER,
            autoIncrement: true,
            allowNull: false, 
            primaryKey: true
        },
        username: {
            type: type.STRING,
            allowNull: false
        },
        createdAt: type.DATE,
        updatedAt: type.DATE
    });

    return User;
};