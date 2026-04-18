import mongoose from "mongoose";
import {
  encrypt,
  generateHash,
  ProviderEnum,
  RoleEnum,
} from "../../common/index.js";
import { genderEnum } from "../../common/enums/auth.enum.js";

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "firstname is required"],
      minLength: [3, "first name can't be less than 3 characters"],
      maxLength: [20, "last name can't be more than 20 characters"],
    },
    lastname: {
      type: String,
      required: [true, "lastname is required"],
      minLength: [3, "last name can't be less than 3 characters"],
      maxLength: [20, "last name can't be more than 20 characters"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: [true, "email already exist"],
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "invalid email format",
      ],
    },
    confirmEmail: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      required: [
        function () {
          return this.provider === ProviderEnum.system ? true : false;
        },
        "password is required",
      ],
      match: [
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Invalid password format",
      ],
    },
    phone: {
      type: String,
      required: [
        function () {
          return this.provider === ProviderEnum.system ? true : false;
        },
        "phone is required",
      ],
    },
    provider: {
      type: String,
      enum: {
        values: Object.values(ProviderEnum),
        message: "Invalid provider",
      },
      default: ProviderEnum.system,
    },
    role: {
      type: String,
      enum: {
        values: Object.values(RoleEnum),
        message: "Invalid provider",
      },
      default: RoleEnum.user,
    },
    gender: {
      type: String,
      enum: {
        values: Object.values(genderEnum),
        message: "gender must be male or female",
      },
      default: genderEnum.male,
    },
    profilePic: {
      type: String,
    },
    coverPics: {
      type: [String],
    },
    credentialsTime: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    collection: "Saraha_Users",
    autoIndex: false,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
    optimisticConcurrency: true,
    timestamps: true,
    strictQuery: true,
    strict: true,
  },
);

userSchema
  .virtual("username")
  .set(function (value) {
    const [firstname, lastname] = value.split(" ");
    this.set({ firstname, lastname });
  })
  .get(function () {
    return this.firstname + " " + this.lastname;
  });

userSchema.pre("save", async function () {
  if (this.provider !== ProviderEnum.system) return;
  this.password = await generateHash(this.password);
  this.phone = await encrypt(this.phone);
});

const UserModel = mongoose.models.User || mongoose.model("User", userSchema);

export default UserModel;
