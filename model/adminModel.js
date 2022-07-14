const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  submissionDate: { type: Date },
  cls: [],
  rollNo: [],
  Amount: [],
  Discount: [],
});

userSchema.pre("save", function () {
  console.log("the Amount==>" + this.Amount);
  console.log("the cls==>" + this.cls);
  console.log("the discount==>" + this.Discount);
  console.log("the rollNo==>" + this.rollNo);
  console.log("the submissionDate==>" + this.submissionDate);
});

const adminModel = mongoose.model("adminModel", userSchema);

module.exports = adminModel;
