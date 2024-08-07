import mongoose from "mongoose";
import bcrypt from "bcrypt";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// User Model Database Observer
userSchema.pre("save", async function (next) {
    //Check if password is changed/modified
    if(!this.isModified('password')){
        return next();
    }

    // Hash Password
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password , salt);

        //Password Hashed Now Use Next Middleware To Futher The Process
        next();
    } catch (error) {
        console.log("User Save Error!" , error.getMessage());
        return next(error);
    }
});

// User Model Custom Function
userSchema.methods.comparePassword = async function(inputPassword){
    return await bcrypt.compare(inputPassword, this.password);
}

export default mongoose.model("User", userSchema);
