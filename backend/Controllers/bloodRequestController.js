let {RequestBloodService} = require("../Services/requestBloodService");
let service = new RequestBloodService();
class BloodRequestController {

    async makeBloodRequest(req,res) {
        let data = req.body;
        let token = req.headers["authorization"];
        let result = await service.makeBloodRequest(data,token);
        if(result === false){
            res.json({
                message :"Their is error in making blood request"
            })
        }else if(result === true) {
            res.json({
                message :"Blood request created successfully"
            })
        }
    }

    async markBloodRequestAsDone(req,res) {
        let id = req.params.id;
        let result = await service.markBloodRequestAsDone(id);
        if(result === null){
            res.json({
                message :"Their is no blood request found"
            })
        }else{
            res.json({
                message :"Blood request mark as done successfully"
            })
        }
    }

    async updateBloodRequestInfo(req,res) {
        let id = req.params.id;
        let data = req.body;
        let result = await service.updateBloodRequestInfo(id,data);
        if(result === null){
            res.json({
                message :"Their is no blood request found"
            })
        }else{
            res.json({
                message :"Blood request updated successfully"
            })
        }
    }

    async deleteBloodRequest(req,res) {
        let id = req.params.id;
        let result = await service.deleteBloodRequest(id);
        if(result === null){
            res.json({
                message :"Their is no blood request found"
            })
        }else{
            res.json({
                message :"Blood request deleted successfully"
            })
        }
    }

    async getAllBloodRequests(req,res) {
        let result = await service.getAllBloodRequests();
        if (result === null) {
            res.json({
                message: "there is error to list all blood requests"
            })
        } else {
            res.json({
                "bloodRequests": result
            })
        }
    }

    async getBloodRequestByID(req,res) {
        let id = req.params.id;
        let result = await service.getBloodRequestByID(id);
        if (result === null) {
            res.status(404).json({
                message: "there is no blood request found!"
            })
        } else {
            res.json({
                "blood request": result
            })
        }
    }

    async getAllBloodRequestsWithSameBloodType(req,res) {
        let token = req.headers["authorization"];
        let result = await service.getAllBloodRequestsWithSameBloodType(token);
        if (result === null) {
            res.json({
                message: "there is error to list blood requests"
            })
        } else {
            res.json({
                "bloodRequests": result
            })
        }
    }

    async getLogs(req,res) {
        let token = req.headers["authorization"];
        let result = await service.getLogs(token);
        if (result === null) {
            res.json({
                message: "no blood requests found for that user"
            })
        } else {
            res.json({
                "bloodRequests": result
            })
        }
    }
}
module.exports = {
    BloodRequestController
}