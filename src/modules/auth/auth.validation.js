import Joi from "joi";
import { ProviderEnum, RoleEnum, GenderEnum } from "../../common/index.js";

export const loginSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, maxDomainSegments: 3 })
    .trim()
    .required(),
  password: Joi.string().required(),
}).required();

export const signupSchema = loginSchema
  .keys({
    username: Joi.string().required(),
    confirmEmail: Joi.boolean().default(false),
    confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
    phone: Joi.string().required(),
    provider: Joi.string()
      .valid(ProviderEnum.google, ProviderEnum.system)
      .empty("")
      .default(ProviderEnum.system),
    role: Joi.string()
      .valid(RoleEnum.admin, RoleEnum.user)
      .empty("")
      .default(RoleEnum.user),
    gender: Joi.string().valid(GenderEnum.female, GenderEnum.male).required(),
    age: Joi.number().min(13).max(30).sign("positive").required(),
  })
  .required();
