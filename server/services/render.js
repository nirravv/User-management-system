const axios = require('axios');
require('dotenv').config(); // Load environment variables from config.env file
const serverUrl = process.env.SERVER_URL; // Get MongoDB URI from environment variables


exports.homeRoutes = (req, res) => {
    // Make a get request to /api/users
    axios.get(`${serverUrl}/api/users`)
    .then(function(response){
        res.render('index', {users: response.data});
    })
    .catch(err => {
        res.send(err)
    });
}

exports.addUser = (req, res) => {
    res.render('add_user');
}

exports.updateUser = (req, res) => {
    // Rendering the data into form
    axios.get(`${serverUrl}/api/users`, {params: { id : req.query.id}})
    .then(function(userdata){
        console.log(userdata);
        res.render('update_user', {user:userdata.data});
    })
    .catch(err=>{
        res.send(err)
    })
}