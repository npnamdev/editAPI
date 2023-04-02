const {
    createCategoryService,
    getAllCategorysService,
    updateCategoryService,
    deleteCategoryService
} = require("../services/categoryService");

module.exports = {
    //Lấy Tất cả User
    getAllCategorys: async (req, res) => {
        try {
            const result = await getAllCategorysService();

            return res.status(200).json({ result })
        } catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
        }
    },



    //Tạo mới User
    createCategory: async (req, res) => {
        try {
            let result = await createCategoryService(req.body);

            return res.status(200).json({ result })
        } catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
        }
    },


    //Sửa User
    updateCategory: async (req, res) => {
        try {
            let result = await updateCategoryService(req.body, req.params);

            return res.status(200).json({ result })
        } catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
        }
    },


    //Xóa User
    deleteCategory: async (req, res) => {
        try {
            let result = await deleteCategoryService(req.params);

            return res.status(200).json({ result })
        } catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
        }
    },


}