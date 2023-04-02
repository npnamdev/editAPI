const {
    createPostService,
    getAllPostsService,
    getAPostService,
    updatePostService,
    deletePostService
} = require("../services/postService");

module.exports = {
    //Lấy Tất cả Posts
    getAllPosts: async (req, res) => {
        try {
            const data = await getAllPostsService();

            return res.status(200).json({ data })
        } catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
        }
    },



    //Lấy Chi tiết 1 Posts
    getAPost: async (req, res) => {
        try {
            const data = await getAPostService(req.params);

            return res.status(200).json({ data })
        } catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
        }
    },



    //Tạo mới Posts
    createPost: async (req, res) => {
        try {
            let data = await createPostService(req.body, req.files);

            return res.status(200).json({ data })
        } catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
        }
    },



    //Sửa Posts
    updatePost: async (req, res) => {
        try {
            let data = await updatePostService(req.body, req.params, req.files);

            return res.status(200).json({ data })
        } catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
        }
    },



    //Xóa Posts
    deletePost: async (req, res) => {
        try {
            let data = await deletePostService(req.params);

            return res.status(200).json({ data })
        } catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
        }
    },

}