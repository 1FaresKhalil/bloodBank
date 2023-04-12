let {UserController} = require("../../Controllers/userController");
let user_controller = new UserController();
function adminRoutes(adminApp) {
    adminApp.post("/signup", user_controller.signUp);
    adminApp.post("/login", user_controller.login);
    adminApp.get("/users", user_controller.getAllUsers);
    adminApp.get("/users/:id", user_controller.getUserById);
    adminApp.put("/users/:id", user_controller.updateInfo);
    adminApp.put("/user/profile/update", user_controller.updateUserProfile);
    adminApp.delete("/users/:id", user_controller.deleteUser);
    adminApp.get("/profile", user_controller.getProfile);
    adminApp.post('/forgotPassword',user_controller.forgotPassword);
    adminApp.post('/resetPassword',user_controller.resetPassword);
}

module.exports = {
    adminRoutes
}