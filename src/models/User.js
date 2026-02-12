// const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");

// const userSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//       trim: true
//     },

//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       lowercase: true
//     },

//     password: {
//       type: String,
//       required: true,
//       minlength: 6,
//       select: false   // IMPORTANT
//     },

//     role: {
//       type: String,
//       enum: ["admin", "user"],
//       default: "user"
//     }
//   },
//   { timestamps: true }
// );

// /// 🔐 Hash password before saving

// userSchema.pre("save", async function () {
//   if (!this.isModified("password")) return;
//   this.password = await bcrypt.hash(this.password, 10);
// });

// // userSchema.pre("save", async function () {
// //   if (!this.isModified("password")) return;

// //   this.password = await bcrypt.hash(this.password, 10);
// // });





// /// 🔑 Compare password during login
// userSchema.methods.comparePassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

// module.exports = mongoose.model("User", userSchema);




const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false, // hide password by default
    },

    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
  },
  { timestamps: true }
);

/// 🔐 Hash password before saving
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 10);
  ;
});

/// 🔑 Compare password during login
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
