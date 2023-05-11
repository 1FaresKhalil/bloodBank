const dashboardService = require("../Services/dashboardService");

exports.GetDashboard = async (req, res) => {
  try {
    const dashboard = await dashboardService.makeDashboard();

    // console.log(bloodRequestsStats);
    res.status(200).json({
      dashboard,
    });
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};
