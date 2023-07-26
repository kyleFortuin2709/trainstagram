import express from "express";
import { getUserProfile } from "../service/userProfileService.js";

export const router = express.Router();

router.route('/user/profile').get(getUserProfile);
