let {UserController} = require("../../Controllers/userController");
let user_controller = new UserController();
function WebsiteRoutes(websiteApp) {
    websiteApp.post("/signup", user_controller.signUp);
    websiteApp.post("/login", user_controller.login);
}

module.exports = {
    WebsiteRoutes
}