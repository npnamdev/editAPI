const Category = require("../models/categoryModel");
require('dotenv').config();

module.exports = {
    //Get All Category
    getAllCategorysService: async () => {
        let result = await Category.find({}).populate('posts');

        return result;
    },



    //Create Category
    createCategoryService: async (dataBody) => {
        let result = await Category.create({ name: dataBody.name });

        return result;
    },



    //Update Category
    updateCategoryService: async (dataBody, dataParams) => {
        let result = await Category.updateOne(
            { _id: dataParams.id },
            { name: dataBody.name }
        );

        return result;
    },


    //Delete Category
    deleteCategoryService: async (dataParams) => {
        let result = await Category.deleteOne({ _id: dataParams.id });

        return result;
    },

}