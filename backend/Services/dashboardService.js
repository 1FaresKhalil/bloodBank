const User = require("../Model/User");
const bloodRequests = require("../Model/bloodRequests");

module.exports = {
  makeDashboard,
  GetBloodRequestsPerMonth,
};

async function makeDashboard() {
  const bloodRequestsPerMonth = await GetBloodRequestsPerMonth();
  const doneBloodRequestsPerMonth = await GetBloodRequestsPerMonth({
    done: true,
  });

  const bloodRequestsStats = await GetBloodRequestsStats();
  const doneBloodRequestsStats = await GetBloodRequestsStats({
    done: true,
  });

  const hospitalsCount = await GetHospitalsCount();

  const bloodTypesCount = await GetBloodTypesCount();

  const gendersCount = await GetGendersCount();

  const profilesStats = await GetProfilesStats();

  const verifiedUsersCount = await GetVerifiedUsersCount();

  return {
    bloodRequestsPerMonth,
    doneBloodRequestsPerMonth,
    bloodRequestsStats,
    doneBloodRequestsStats,
    hospitalsCount,
    bloodTypesCount,
    gendersCount,
    profilesStats,
    verifiedUsersCount,
  };
}

async function GetVerifiedUsersCount() {
  const count = await User.aggregate([
    {
      $match: {
        verified: { $exists: true, $ne: null },
      },
    },
    {
      $group: {
        _id: "$verified",
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,

        verified: {
          $cond: {
            if: "$_id",
            then: "Verified",
            else: "Unverified",
          },
        },
        count: 1,
      },
    },
    {
      $sort: { count: -1 }, // sort by count in descending order
    },
  ]);

  return count;
}

async function GetGendersCount() {
  const count = await User.aggregate([
    {
      $group: {
        _id: "$gender",
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,

        gender: { $ifNull: ["$_id", "Unspecified"] },
        count: 1,
      },
    },
    {
      $sort: { count: -1 }, // sort by count in descending order
    },
  ]);

  return count;
}

async function GetBloodTypesCount(conditions = { done: false }) {
  const count = await bloodRequests.aggregate([
    { $match: conditions },
    {
      $group: {
        _id: "$bloodType",
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        bloodType: "$_id",
        count: 1,
      },
    },
    {
      $sort: { count: -1 }, // sort by count in descending order
    },
  ]);

  return count;
}

async function GetHospitalsCount() {
  const count = await bloodRequests.aggregate([
    {
      $group: {
        _id: "$nearestHospital",
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        hospital: "$_id",
        count: 1,
      },
    },
    {
      $sort: { count: -1 }, // sort by count in descending order
    },
  ]);

  return count;
}

async function GetProfilesStats() {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const sixtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 60);

  const usersThisMonth = await User.countDocuments({
    createdAt: { $gte: thirtyDaysAgo },
  }).exec();

  const usersPrevMonth = await User.countDocuments({
    createdAt: { $gte: sixtyDaysAgo, $lt: thirtyDaysAgo },
  }).exec();

  let increase;
  if (usersPrevMonth === 0) increase = 100;
  else increase = ((usersThisMonth - usersPrevMonth) / usersPrevMonth) * 100;

  let increasePercentage;
  if (increase > 0) {
    increasePercentage = `+${increase}%`;
  } else {
    increasePercentage = `${increase}%`;
  }

  return {
    usersThisMonth: usersThisMonth.toLocaleString(),
    usersPrevMonth: usersPrevMonth.toLocaleString(),
    increase,
    increasePercentage,
  };
}

async function GetBloodRequestsStats(conditions = {}) {
  const requests = await bloodRequests.find(conditions);

  let RequestsThisMonth = 0;
  let RequestsPrevMonth = 0;

  requests.forEach((request) => {
    const currentDate = new Date();

    const requestDateString = request.request_date.split(",")[0];
    const requestDate = new Date(requestDateString);

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const sixtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 60);

    // within last 30 days
    if (requestDate >= thirtyDaysAgo && requestDate <= currentDate) {
      RequestsThisMonth++;
    }
    // within the prev month
    else if (requestDate >= sixtyDaysAgo && requestDate < thirtyDaysAgo) {
      RequestsPrevMonth++;
    }
  });

  let increase;
  if (requests.length > 0 && RequestsPrevMonth === 0) increase = 100;
  else if (RequestsPrevMonth === 0) increase = 0;
  else
    increase =
      ((RequestsThisMonth - RequestsPrevMonth) / RequestsPrevMonth) * 100;

  let increasePercentage;
  if (increase > 0) {
    increasePercentage = `+${increase}%`;
  } else {
    increasePercentage = `${increase}%`;
  }

  return {
    RequestsThisMonth: RequestsThisMonth.toLocaleString(),
    RequestsPrevMonth: RequestsPrevMonth.toLocaleString(),
    increase,
    increasePercentage,
  };
}

async function GetBloodRequestsPerMonth(conditions = {}) {
  try {
    const requests = await bloodRequests.find(conditions);
    let requestsCountPerMonth = [];

    let months = {
      January: 0,
      February: 0,
      March: 0,
      April: 0,
      May: 0,
      June: 0,
      July: 0,
      August: 0,
      September: 0,
      October: 0,
      November: 0,
      December: 0,
    };

    requests.forEach((request) => {
      const currentDate = new Date();
      const requestDateString = request.request_date.split(",")[0];
      const requestDate = new Date(requestDateString);
      const options = { month: "long" };
      const requestMonth = requestDate.toLocaleString("en-US", options);
      if (requestDate.getFullYear() >= currentDate.getFullYear() - 1) {
        months[requestMonth] += 1;
      }
    });

    for (const month in months) {
      requestsCountPerMonth.push({
        month: month,
        requestsCount: months[month],
      });
    }

    return requestsCountPerMonth;
  } catch (error) {
    console.log(error);
  }
}
