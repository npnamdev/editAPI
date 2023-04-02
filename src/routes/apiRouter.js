const express = require('express');
const router = express.Router();

//Import Function User Controller
const {
    createUser,
    getAllUsers,
    getAUser,
    updateUser,
    deleteUser,
    login,
    logout
} = require('../controllers/userController');




//Router User Controller

router.post('/users', createUser);

router.get('/users', getAllUsers);

router.get('/users/:id', getAUser);

router.put('/users/:id', updateUser);

router.delete('/users/:id', deleteUser);

router.post('/login', login);

router.post('/logout', logout);



// ===========================================================================================

//Import Function User Controller
const {
    createCategory,
    getAllCategorys,
    updateCategory,
    deleteCategory
} = require('../controllers/categoryController');



//Router User Controller

router.post('/categorys', createCategory);

router.get('/categorys', getAllCategorys);

router.put('/categorys/:id', updateCategory);

router.delete('/categorys/:id', deleteCategory);



// ===========================================================================================

//Import Function User Controller
const {
    createPost,
    getAllPosts,
    getAPost,
    updatePost,
    deletePost
} = require('../controllers/postController');



//Router Post Controller

router.post('/posts', createPost);

router.get('/posts', getAllPosts);

router.get('/posts/:id', getAPost);

router.put('/posts/:id', updatePost);

router.delete('/posts/:id', deletePost);



module.exports = router;