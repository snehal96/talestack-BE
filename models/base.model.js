exports.baseInteraction = {
  createdDate: Date,
};

exports.base = {
  entityId: String,
  createdBy: String,
  createdDate: Date,
  updatedBy: String,
  updatedDate: Date,
  status: String,
  isDeleted: {
    type: Boolean,
    default: false,
    required: true,
  },
};
