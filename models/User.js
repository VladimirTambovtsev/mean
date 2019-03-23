import mongoose from "mongoose";
import bcrypt from "bcrypt";


const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      unique: 1,
      maxlength: 100
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 150
    },
  },
  { timestamps: true }
);

UserSchema.pre('save', async function (next) {
  const user = this
  const saltRounds = 10

  if (user.isModified('password')) {
    try {
      const genSalt = await bcrypt.genSalt(saltRounds)
      await bcrypt.hash(user.password, genSalt)
        .then(hash => user.password = hash)
        .catch(err => next(err))

    } catch (err) {
      return next(err)
    }
  }

  next()
})

const User = mongoose.model("users", UserSchema);
export default User;
