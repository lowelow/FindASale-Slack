'use strict'
const snoowrap = require('snoowrap');
const path     = require('path');
const axios    = require('axios');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

(async () => {
    const reddit = new snoowrap({
        userAgent    : process.env.REDDIT_USER_AGENT,
        clientId     : process.env.REDDIT_CLIENT_ID,
        clientSecret : process.env.REDDIT_CLIENT_SECRET,
        username     : process.env.REDDIT_USERNAME,
        password     : process.env.REDDIT_PASSWORD
    });

    reddit.getSubreddit('bapcsalescanada').getNew().then(listings => {
        try {
            const allPosts = axios.get('http://localhost:3000/api/posts').data || [];
            listings.forEach(listing => {
                // check if the post already exists in the database
                const found = allPosts.some(post => post.reddit_id === listing.id)
                if (!found) {
                    axios.post('http://localhost:3000/api/posts', {
                        reddit_id    : listing.id,
                        author       : listing.author.name,
                        subreddit    : listing.subreddit.display_name,
                        title        : listing.title,
                        upvotes      : parseInt(listing.ups || 0),
                        downvotes    : parseInt(listing.downs || 0),
                        domain       : listing.domain,
                        url          : listing.url,
                        comments_url : `https://www.reddit.com${listing.permalink}`
                    }).then(response => {
                        console.log(response.data);
                    }).catch(err => {
                        console.log(`There was an issue inserting: ${listing.id}`);
                    });
    
                }
            });
        }
        catch(err) {
            console.log(err);
        }
    
    });
})()



/*
NOTES FOR TOMORROW:
 - to make sure its unique: post ID or url must not match
 - need to figure out why posts are being inserted even with matching reddit ids
*/