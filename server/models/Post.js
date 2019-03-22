const fs = require('fs');
const UTIL = require('../../util');
let Posts = [];
fs.readFile('./server/data/posts.json', (error, received) => 
{
    if(error){throw error}
    Posts = JSON.parse(received)
});

module.exports = class Post
{
    constructor(id, name, date, author, likes, content)
    {
        this.id = id;
        this.name = name;
        this.date = date;
        this.author = author;
        this.likes = likes;
        this.content = content;
    }

    static getAll()
    {
        return Posts;
    }

    static getBy(attribute, value)
    {
        let resp = false;
        Posts.forEach(post => 
        {
            if(post[attribute] == value)
            {
                resp = new Post(post.id, post.name, post.date, post.author, post.likes, post.content);
            }
        });
        return resp;
    }

    static insert(data, response)
    {
        if(!Post.getBy("id", data.id))
        {
            let newPost = new Post(Posts.length, data.name, data.date, data.author, data.likes, data.content);
            Posts.push(newPost);
            fs.writeFile('./server/data/posts.json', UTIL.jsonify(Posts), (error, received) =>
            {
                if(error){throw error}
                response.status(200)
                response.end(UTIL.jsonify(newPost))
            });
        }
        return false;
    }
}
