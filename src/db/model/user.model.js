import mongoose from "mongoose";
import { genderEnum, providerEnum, roleEnum } from "../../common/index.js";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "first name is required"],
        minLength: [2, "first name cannot be less than 2 characters"],
        maxLength: [25, "first name cannot be more than 25 character"],
        trim: true,
    },
    lastName: {
        type: String,
        required: [true, "last name is required"],
        minLength: [2, "last name cannot be less than 2 characters"],
        maxLength: [25, "last name cannot be more than 25 character"],
        trim: true,
    },
    email: {
        type: String,
        unique: [true, "email exists"],
        required: [true, "email is required"],
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "email format isn't right (name@example.com)"],
    },
    
    password: {
        type: String,
        match: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-\=[\]{};':"\\|,.<>\/?]).{8,}$/
        , "requires a minimum of eight characters, at least one uppercase letter, one lowercase letter, one digit, and one special character"],
    },
    phone: {
        type: String
    },
    gender: {
        type:Number,
        enum: {values: Object.values(genderEnum), message: "gender is male or female"},
        default: genderEnum.male,
    },
    provider: {
        type: Number,
        enum: {values: Object.values(providerEnum), message: "provider is system or google gmail"},
        default: providerEnum.system,
    },
     role: {
        type: Number,
        enum: {values: Object.values(roleEnum), message: "role is user or admin"},
        default: providerEnum.user,
    },
    profilePicture: {
        type:String
    },
    coverPicture: {
        type: [String]
    },
    confirmEmail: {
            type: Date,
        },
    changeCridintialTime: {
        type: Date,
    },

}, {
    collection: "Saraha_Users",
    timestamps:true,
    autoIndex:true,
    strict:true,
    strictQuery:true,
    optimisticConcurrency: true,
    toJSON: {
        virtuals: true,
    },
    toObject: {
        virtuals:true,
    }
});


userSchema.virtual("username").set(function(value){
    const [firstName, lastName] = value.split(" ");
    this.set({firstName, lastName});
});

userSchema.virtual("userName").get(function(){
    return this.firstName + " " + this.lastName;
});


export const UserModel =mongoose.models.User || mongoose.model("User", userSchema);