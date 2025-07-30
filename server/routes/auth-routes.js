const express = require ('express')
const {registerUser} = require('../controllers/auth/auth-controller.js')

const router = express.Router();

router.post("/register", registerUser );


module.exports = router;