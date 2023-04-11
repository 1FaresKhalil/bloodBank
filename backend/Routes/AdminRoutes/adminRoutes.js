let {UserController} = require("../../Controllers/userController");
let user_controller = new UserController();
function adminRoutes(adminApp) {
    adminApp.post("/signup", user_controller.signUp);
    adminApp.post("/login", user_controller.login);
}

module.exports = {
    adminRoutes
}