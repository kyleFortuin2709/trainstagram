import express from "express";
import { RetrieveFile } from "../service/fileMiddlewareService"; 
import { getUserProfile, createUser, getUserByCreds } from "../service/userProfileService";

export const userRoutes = express.Router();

userRoutes.route('/profile').get(getUserProfile);
userRoutes.route('/register-user').post(RetrieveFile, createUser);
userRoutes.route('/loginuser').post(getUserByCreds);

