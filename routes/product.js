const express = require("express");
const router=express.Router();

const {requireSignin,isAuth,isAdmin}=require('../controllers/auth');
const {userById}=require('../controllers/user');
const {create,productById,photo,listBySearch,listSearch,listCategories,read,remove,update,list,related}=require('../controllers/product');

router.get('/product/:productId',read);
router.post('/product/create/:userId',requireSignin,isAuth,isAdmin,create);
router.delete('/product/:productId/:userId',requireSignin,isAuth,isAdmin,remove)
router.put('/product/:productId/:userId',requireSignin,isAuth,isAdmin,update)

router.get('/products',list);
router.get('/products/related/:productId',related);
router.get('/products/categories',listCategories);



router.get("/products/search", listSearch);
router.post("/products/by/search", listBySearch);
router.get("/product/photo/:productId", photo);

router.param("userId",userById);
router.param("productId",productById);
module.exports=router;