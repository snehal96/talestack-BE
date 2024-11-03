const mongoose = require("mongoose");
const base = require("./base.model");

const UserCloseGroupMember = mongoose.model(
    "userclosegroupmember",
    new mongoose.Schema({
      ...base.baseInteraction,
      closeGroupId: String,
      memberId: String
    })
  );
  
  module.exports = UserCloseGroupMember;