let {UserController} = require("../../Controllers/userController");
let user_controller = new UserController();
let {BloodRequestController} = require("../../Controllers/bloodRequestController");
let blood_request_controller = new BloodRequestController();
function WebsiteRoutes(websiteApp) {
    //user requests
    websiteApp.post("/signup", user_controller.signUp);
    websiteApp.post("/login", user_controller.login);
    websiteApp.get("/profile", user_controller.getProfile);
    websiteApp.put("/user/profile/update", user_controller.updateUserProfile);
    websiteApp.post('/forgotPassword',user_controller.forgotPassword);
    websiteApp.post('/resetPassword',user_controller.resetPassword);
    websiteApp.post('/changePassword',user_controller.changePassword);
    //blood requests
    websiteApp.post('/bloodRequest',blood_request_controller.makeBloodRequest);
    websiteApp.put('/bloodRequest/done/:id',blood_request_controller.markBloodRequestAsDone);
    websiteApp.put('/bloodRequest/:id',blood_request_controller.updateBloodRequestInfo);
    websiteApp.delete('/bloodRequest/:id',blood_request_controller.deleteBloodRequest);
    websiteApp.get("/bloodRequest", blood_request_controller.getAllBloodRequests);
    websiteApp.get("/bloodRequest/:id", blood_request_controller.getBloodRequestByID);
    websiteApp.get("/sameBloodType/bloodRequest", blood_request_controller.getAllBloodRequestsWithSameBloodType);
    websiteApp.get("/logs/bloodRequest", blood_request_controller.getLogs);
}

module.exports = {
    WebsiteRoutes
}