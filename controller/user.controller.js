const  connection = require('../models');
const bcrypt = require('bcrypt');

const jwt =require('jsonwebtoken');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


// const loginWithPassport = () =>{

// }

const register = async function(req, res){

    const saltRounds = 1;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const data = req.body;
    data.password = hash;

    await connection.User.create(data)

    res.json("registration successful");
}

const login = async function(req, res){
    const email = req.body.email
    const password = req.body.password
    // const data = req.body;
    const user = await connection.User.findOne({
        where:{
            email : email
        },

    }

    );
    if(!user){
        return res.json("you have to register first");
    }

    const checkPassword =bcrypt.compareSync(password, user.password);
    if (!checkPassword){
        return res.json("Password incorrect")

    }

    const payLoad = {
        id : user.id,
    }
    const token = jwt.sing(payLoad, 'myverysecret');
    res.json({
        "token" : token,
        "msg" : "login successful",
        "user" : user,
        "status" : 200
    });
    
}

const getUser = async function(req, res){
    const data =  await connection.User.findOne( )
}



module.exports = {
    register,
    login
    // loginWithPassport
}
