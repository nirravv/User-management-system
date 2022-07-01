const { resolveInclude } = require('ejs');
var Userdb = require('../model/model');

// Create and save new user
exports.create = (req,res) => {
    // Validate Requests
    if(!req.body){
        res.status(400).send({message:"Content can not be empty!!"});
        return;
    }

    // New User
    const user = new Userdb({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status,
    })

    // Save User in the DB
    user.save(user).then(data => {
        // res.send(data)
        res.redirect('/');
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the user",
        });
    });
}

// Retrive and return users or single user
exports.find = (req,res) => {
    // If we find any id in query
    if(req.query.id){
        const id = req.query.id;

        Userdb.findById(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message: "User Not Found!"})
            }else{
                res.send(data)
            }
        })
        .catch(err=>{
            res.status(500).send({ message: "Error while retriving the user!!"});
        });
    }
    // If we dont find any params it will get all the users
    else{
    Userdb.find()
    .then(user=> {
        res.send(user)
    })
    .catch(err => {
        res.status(500).send({ message: err.message || "Error occured while retriving user information!"})
    });
}
}

// Update any user by userID
exports.update = (req,res) => {
    if(!req.body){
        return res.status(400).send({message:"Data to update can not be empty!!"});
    }

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify:false })
    .then(data => {
        if(!data){
            res.status(404).send({ message: `Can not update user with ${id} ID, maybe user not found!!`})
        }else {
            res.send(data)
        }
    })
    .catch(err => {
        res.status(500).send({ message: "Error while updating the user!" });
    });

}

// Delete a user with USERID
exports.delete = (req,res) => {
    const id = req.params.id;
    Userdb.findByIdAndDelete(id)
    .then(data=> {
        if(!data){
            res.status(404).send({ message: `Can not delete user with ${id} ID!` })
        }else{
            res.send({
                message: "User was deleted successfully!!"
            })
        }
    })
    .catch(err => {
        res.status(500).send({ message: `Could not delete user with ${id} ID!` });
    });
}