const {
    getAllUserService,
    createUserService,
    updateUserService,
    deleteUserService,
    getAUserService,
    loginService,
    logoutService
} = require("../services/userService");

module.exports = {
    //Lấy Tất cả User
    getAllUsers: async (req, res) => {
        try {
            const data = await getAllUserService(req.query);

            return res.status(200).json({ data })
        } catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
        }
    },


    //Lấy Chi tiết 1 User
    getAUser: async (req, res) => {
        try {
            const data = await getAUserService(req.params);

            return res.status(200).json({
                errCode: 0,
                data
            })
        } catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
        }
    },


    //Tạo mới User
    createUser: async (req, res) => {
        try {
            let data = await createUserService(req.body, req.files);

            return res.status(200).json({
                errCode: 0,
                data
            })
        } catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
        }
    },


    //Sửa User
    updateUser: async (req, res) => {
        try {
            let data = await updateUserService(req.body, req.params, req.files);

            return res.status(200).json({
                errCode: 0,
                data
            })
        } catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
        }
    },


    //Xóa User
    deleteUser: async (req, res) => {
        try {
            let data = await deleteUserService(req.params);

            return res.status(200).json({
                errCode: 0,
                data
            })
        } catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
        }
    },


    login: async (req, res) => {
        try {
            let data = await loginService(req.body);

            return res.status(200).json({
                errCode: 0,
                data
            })
        } catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
        }
    },


    logout: async (req, res) => {
        try {
            let data = await logoutService(req.body);

            return res.status(200).json({
                errCode: 0,
                data
            })
        } catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
        }
    },

}