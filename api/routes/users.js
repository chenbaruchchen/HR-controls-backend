const  express = require("express");



const  {login, register,logout} = require("../controllers/users");

const router = express.Router();


router.post('/login', login)


router.post('/register', register)


router.post('/logOut', logout)


    module.exports=router
        