const funcController=require("../controllers/funcController")
const express=require("express");
const router=express.Router()

router.post('/register_user',funcController.reg);
router.post('/login',funcController.login);
router.get("/user_details",funcController.userDetails)
module.exports = router