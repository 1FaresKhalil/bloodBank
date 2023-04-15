let {UserService} = require("../Services/userService");
let service = new UserService();
class UserController {

    async signUp(req,res) {
        let data = req.body;
        let result = await service.signUp(data);
        if(result === false){
            res.json({
                message :"Their is error in signup"
            })
        }else if(result === true) {
            res.json({
                message :"Successful signup"
            })
        }else{
            res.json({
                message: "the username already exists use another one!"
            })
        }
    }

    async login(req,res) {
        let {username, password} = req.body;
        let result = await service.login(username, password);
        if (result === null) {
            res.json({
                message: "login fail try another time"
            })
        }else if (result.message === "user not found") {
            res.status(404).json({
                message: "user not found"
            })
        }else if (result.message === "password wrong") {
            res.json({
                message: "password wrong try another time!"
            })
        }else{
            res.json({
                result
            })
        }
    }

    async getProfile(req,res) {
        let token = req.headers["authorization"];
        let result = await service.getProfile(token);
        if (result === null) {
            res.status(401).json({
                message: "unauthorized"
            })
        } else {
            res.json({
                "user": result
            })
        }
    }

    async getAllUsers(req,res) {
        let result = await service.listAllUsers();
        if (result === null) {
            res.json({
                message: "there is error to list all user"
            })
        } else {
            res.json({
                "users": result
            })
        }
    }

    async getUserById(req,res) {
        let id = req.params.id;
        let result = await service.getUserById(id);
        if (result === null) {
            res.status(404).json({
                message: "there is no user found!"
            })
        } else {
            res.json({
                "user": result
            })
        }
    }

    async updateInfo(req,res) {
        let id = req.params.id;
        let data = req.body;
        let result = await service.updateUserById(id, data);
        if (result === null) {
            res.status(404).json({
                message: "The user not found"
            })
        } else {
            res.json({
                message: "The user updated successfully"
            })
        }
    }

    async deleteUser(req,res) {
        let id = req.params.id;
        let result = await service.deleteUserById(id);
        if (result === null) {
            res.status(404).json({
                message: "The user not found"
            })
        } else {
            res.json({
                message: "The user deleted successfully"
            })
        }
    }

    async updateUserProfile(req,res) {
        let token = req.headers["authorization"];
        let data = req.body;
        let result = await service.updateUserProfile(token,data);
        if (result === null) {
            res.status(401).json({
                message: "unauthorized"
            })
        } else {
            res.json({
                "message": "user updated successfully"
            })
        }
    }

    async forgotPassword(req,res) {
        let email = req.body.username;
        let result = await service.forgotPassword(req,email);
        if(result === "user not found"){
            res.status(404).json({
                "message": "user updated successfully"
            })
        }else if (result.message === "Email sent"){
            res.json(result)
        }else{
            res.json({
                "message": "Error sending email"
            })
        }
    }

    async resetPassword(req,res) {
        let resetToken = req.params.token;
        let {username, oldPassword, newPassword} = req.body;
        let result = await service.resetPassword(resetToken,username,oldPassword,newPassword);
        if (result === null){
            res.json({
                "message": "Time out , the link is expired"
            })
        }else if (result === "the old password wrong"){
            res.json({
                "message": "The old password is wrong"
            })
        }else{
            res.json({
                "message": "The password retested successfully"
            })
        }
    }
}
module.exports = {
    UserController
}