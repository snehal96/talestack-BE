const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.category = require("./category.model");
db.story = require("./story.model");
db.draftstory = require("./draftstory.model");
db.tale = require("./tale.model");
db.trendingtale = require("./trendingtale.model");
db.trendinguser = require("./trendinguser.model");
db.usercurrentread = require("./usercurrentread.model");
db.userinfo = require("./userinfo.model");
db.userfollower = require("./userfollower.model");
db.userfollowingcategory = require("./userfollowingcategory.model");
db.userlikedstory = require("./userlikedstory.model");
db.usersavedtale = require("./usersavedtale.model");
db.userclosegroup = require("./userclosegroup.model");
db.userclosegroupmember = require("./userclosegroupmember.model");
db.userfollowrequest = require("./userfollowrequest.model");

module.exports = db;
