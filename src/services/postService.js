const User = require("../models/userModel");
const Category = require("../models/categoryModel");
const Post = require("../models/postModel");
const { uploadSingleFileImage } = require('../helpers/uploadFile');


module.exports = {
    //Get All Post
    getAllPostsService: async () => {
        let result = await Post.find().populate("author");

        return result;
    },


    //Get A Post
    getAPostService: async (dataParams) => {
        let result = await Post.find({ _id: dataParams.id });

        return result;
    },


    //Create Post
    createPostService: async (dataBody, dataFile) => {
        const { title, description, content, authorId, categoryId } = dataBody;

        let imageURL = '';
        if (dataFile && dataFile.image) {
            imageURL = await uploadSingleFileImage(dataFile.image);
            imageURL = `http://${process.env.HOST_NAME}:${process.env.PORT}/images/${imageURL.path}`;
        }

        let result = await Post.create({
            title,
            description,
            content,
            author: authorId,
            category: categoryId,
            image: imageURL
        });

        await User.findByIdAndUpdate(authorId, { $push: { posts: result._id } });

        await Category.findByIdAndUpdate(categoryId, { $push: { posts: result._id } });

        return result;
    },


    //Update User
    updatePostService: async (dataBody, dataParams, dataFile) => {
        const { title, description, content, authorId, categoryId } = dataBody;
        const post = await Post.findById(dataParams.id);

        let imageURL = post.image;
        if (dataFile && dataFile.image) {
            const newImageURL = await uploadSingleFileImage(dataFile.image);
            imageURL = `http://${process.env.HOST_NAME}:${process.env.PORT}/images/${newImageURL.path}`;
        }


        const oldCategory = post.category;
        const oldAuthor = post.author;

        // Xóa bài post cũ trong danh mục
        await Category.findByIdAndUpdate(
            oldCategory,
            { $pull: { posts: post._id } },
            { new: true }
        );

        // Xóa bài post cũ trong danh sách post của tác giả
        await User.findByIdAndUpdate(
            oldAuthor,
            { $pull: { posts: post._id } },
            { new: true }
        );


        let result = await Post.findByIdAndUpdate(
            dataParams.id,
            {
                title,
                description,
                content,
                author: authorId,
                category: categoryId,
                image: imageURL === post.image ? post.image : imageURL,
            }, { new: true }
        );



        // Cập nhật danh sách post trong UserSchema
        await User.findByIdAndUpdate(
            authorId,
            { $addToSet: { posts: result._id } },
            { new: true }
        );

        // Cập nhật danh sách post trong CategorySchema
        await Category.findByIdAndUpdate(
            categoryId,
            { $addToSet: { posts: result._id } },
            { new: true }
        );


        return result;
    },


    //Delete User
    deletePostService: async (dataParams) => {
        const post = await Post.findById(dataParams.id);

        // Xóa bài viết khỏi danh mục
        await Category.findByIdAndUpdate(
            post.category,
            { $pull: { posts: post._id } },
            { new: true }
        );

        // Xóa bài viết khỏi danh sách post của tác giả
        await User.findByIdAndUpdate(
            post.author,
            { $pull: { posts: post._id } },
            { new: true }
        );

        let result = await Post.deleteOne({ _id: dataParams.id });

        return result;
    },


}