import { Router } from "express";
import {
  changePassword,
  forgetPassword,
  Readall,
  Readone,
  siginIn,
  signUp,
  verifyUser,
} from "../controller/AuthController";

const router: any = Router();

//userFlow
router.route("/signup-user").post(signUp);
router.route("/verify-user/:userID").get(verifyUser);
router.route("/signin-user").post(siginIn);
//userFlow

//userReadFlow
router.route("/readone/:userID").get(Readone);
router.route("/readall").get(Readall);
//userReadFlow

//restpasswordFlow
router.route("/forget-password").patch(forgetPassword);
router.route("/change-password/:userID").patch(changePassword);
//restpasswordFlow

export default router;
