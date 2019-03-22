const fs = require('fs');
const bcrypt = require('bcryptjs');

const UTIL = require('../../util');
let Users = [];
fs.readFile('./server/data/users.json', (error, received) => 
{
    if(error){throw error}
    Users = JSON.parse(received)
});

module.exports = class User
{
    constructor(id, name, pass)
    {
        this.id = id;
        this.name = name;
        this.pass = pass;
    }

    static getAll()
    {
        return Users;
    }

    static getBy(attribute, value)
    {
        let resp = false;
        Users.forEach(user => 
        {
            if(user[attribute] == value)
            {
                resp = new User(user.id, user.name, user.pass);
            }
        });
        return resp;
    }

    static login(data, response)
    {
        let validData = User.validate(data);
        if(validData)
        {
            let user = User.getBy("name", data.name);
            if(user)
            {
                bcrypt.compare(data.pass, user.pass, (error, res) => 
                {
                    if(error){throw error}
                    if(res)
                    {
                        delete user.id;
                        delete user.pass;
                        response.end(UTIL.jsonify(user));
                    }
                    else 
                    {
                        response.end(UTIL.jsonify({"error" : "Unable to Login with these credentials."}));
                    }
                })
            }
            else
            {
                response.end(UTIL.jsonify({"error" : "Unable to Login with these credentials."}));
            }
        }
        else
        {
            response.end(UTIL.jsonify({"error" : "Unable to Login  with these credentials."}));
        }
        return false;
    }

    static insert(data, response)
    {
        let validData = User.validate(data);
        if(validData)
        {
            if(!User.getBy("name", data.name))
            {
                bcrypt.hash(data.pass, 12).then((hash) => 
                {
                    // Store hash in your password DB.
                    let newUser = new User(Users.length, data.name, hash);
                    Users.push(newUser);
                    fs.writeFile('./server/data/users.json', UTIL.jsonify(Users), (error, received) =>
                    {
                        if(error){throw error}
                        response.end(UTIL.jsonify(newUser))
                    });
                });
            }
            else
            {
                response.end(UTIL.jsonify({"error" : "User already exists"}));
            }
        }
        else
        {
            response.end(UTIL.jsonify({"error" : "Data not valid."}));
        }
        return false;
    }

    static validate(data)
    {
        let ret = true;
        for(let attr in data)
        {
            if(attr !== "name" && attr !== "pass" && attr !== "mail")
            {
                delete data[attr]; // Delete any keys that doesn't fit schema
            }
            if(data[attr].toString().trim === "")
            {
               ret = false;
            }
        }
        return ret;
    }
}
