const axios = require('axios');


exports.homeRoutes = (req, res) => {
    // Make a get request to /api/users
    axios.get('https://ums-express.vercel.app/api/users')
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
    axios.get('https://ums-express.vercel.app/api/users', {params: { id : req.query.id}})
    .then(function(userdata){
        console.log(userdata);
        res.render('update_user', {user:userdata.data});
    })
    .catch(err=>{
        res.send(err)
    })
}