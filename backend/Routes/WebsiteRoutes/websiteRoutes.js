let {UserController} = require("../../Controllers/userController");
let user_controller = new UserController();
function WebsiteRoutes(websiteApp) {
    websiteApp.post("/signup", user_controller.signUp);
    websiteApp.post("/login", user_controller.login);
    websiteApp.get("/profile", user_controller.getProfile);
    websiteApp.put("/user/profile/update", user_controller.updateUserProfile);
    websiteApp.post('/forgotPassword',user_controller.forgotPassword);
    websiteApp.post('/resetPassword',user_controller.resetPassword);
}

module.exports = {
    WebsiteRoutes
}