module.exports = (sequelize, type) => {
    const Post = sequelize.define('post', {
        id: {
            type: type.INTEGER,
            autoIncrement: true,
            allowNull: false, 
            primaryKey: true
        },
        reddit_id: {
            type: type.STRING(20),
            allowNull: false
        },
        author: {
            type: type.STRING,
            allowNull: false
        },
        subreddit: {
            type: type.STRING,
            allowNull: false
        },
        title: {
            type: type.STRING,
            allowNull: false
        },
        upvotes: {
            type: type.INTEGER,
            allowNull: false
        },
        downvotes: {
            type: type.INTEGER,
            allowNull: false
        },
        domain: {
            type: type.STRING,
        },
        url: {
            type: type.STRING,
            allowNull: false
        },
        comments_url: {
            type: type.STRING,
            allowNull: false
        },
        createdAt: type.DATE
    });

    return Post;
};