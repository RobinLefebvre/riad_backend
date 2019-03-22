const UTIL = 
{
    ifErrorThrow : (error) => 
    {
        if(error)
        {
            throw error;
        }
    },
    getDate : () =>
    {
        let today = new Date(); 
        let dd = today.getDate(); 
        let mm = today.getMonth() + 1; 
        let yyyy = today.getFullYear();
        let hh = today.getHours();
        let min = today.getMinutes();
    
        if (dd < 10) { dd = '0' + dd; } 
        if (mm < 10) { mm = '0' + mm; } 
        if (min < 10) { min = '0' + min; } 
        if (hh < 10) { hh = '0' + hh; } 
    
        let now = dd + '/' + mm + '/' + yyyy + ' ' + hh + ':' + min;
        return now;
    },
    jsonify : (data) => 
    {
      return JSON.stringify(data, null, 4);
    },

    /** One of the HandlerFunctions that the app funnels requests through (before routing). Sets headers for CORS */
    cors_handler : (request, response, next) => 
    {
        response.header("Access-Control-Allow-Origin", "*");
        response.header(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept, Authorization"
        );
        if (request.method === 'OPTIONS') {
            response.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return response.status(200).json({});
        }
        next();
    },

    /** One of the HandlerFunctions that the app funnels requests through (after routing). 
     * Handles receiving errors using next(error) in one of the below routes */
    error_handler : (error, request, response, next) => 
    {
        response.status(error.status || 500);
        console.log(error);
        response.json(
         { message : error.message, status : error.status }
        );
    
    },

    /** One of the HandlerFunctions that the app funnels requests through (after routing). 
     * Handles calling a route that's not specified (404) */
    error_404_handler : (request, response, next) => 
    {
        response.status(404);
        //response.writeHead(301, { Location: 'http://localhost:6660/help' } );
        response.end();
    },

    selectRandom : (amount, list) =>
    {
        let l = UTIL.clone(list); let ret = [];
        for(let i = 0; i < amount; i++)
        {
            let rand = Math.floor(Math.random() * (Object.keys(l).length));
            ret.push(l[rand]); 
            l.splice(rand, 1);
        }
        return ret;
    },

    cleanArray : (array) =>
    {
        let t = [];
        for(let i = 0; i <= array.length; i++){
            if(array[i] !== undefined)
            {
                t.push(array[i]);
            }
        }
        return t;
    },

    clone : (obj) =>
    {
        if (null == obj || "object" != typeof obj) return obj;

        var copy = obj.constructor();
        for (let attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
        }

        return copy;
    }
}
module.exports = UTIL;

