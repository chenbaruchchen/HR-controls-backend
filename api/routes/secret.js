const  express = require("express");
const chackAuth = require("../middlewares/chackAuth");


const router = express.Router();
router.post("/", chackAuth, (req, res) => {
  console.log("auth succsesfuly")
});


// const  {login, register,logout} = require("../controllers/users");

// const router = express.Router();


// router.post('/login', login)


// router.post('/register', register)


// router.post('/logOut', logout)


    module.exports=router
        