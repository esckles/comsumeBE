import { Request, Response } from "express";
import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import env from "dotenv";
import AuthModel from "../model/AuthModel";
import { createaccountEmail } from "../utils/email";
env.config();

export const signUp = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { userName, email, password } = req.body;
    const salt = await bcrypt.genSalt();
    const hashed = await bcrypt.hash(password, salt);
    const token = crypto.randomBytes(4).toString("hex");

    const user = await AuthModel.create({
      userName,
      email,
      password: hashed,
      isVerifiedToken: token,
    });
    createaccountEmail(user);
    return res.status(201).json({
      messsage: "Account created successfully",
      data: user,
      status: 201,
    });
  } catch (error) {
    return res
      .status(404)
      .json({ message: "Error creating account", status: 404 });
  }
};

export const verifyUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { userID } = req.params;
    const user = await AuthModel.findById(userID);
    if (user) {
      await AuthModel.findByIdAndUpdate(
        user?._id,
        {
          isVerified: true,
          isVerifiedToken: "",
        },
        { new: true }
      );
      return res
        .status(201)
        .json({ message: "Account verified successfully", status: 201 });
    } else {
      return res
        .status(404)
        .json({ message: "Error verifying user", status: 404 });
    }
  } catch (error) {
    return res
      .status(404)
      .json({ message: "Error with verifying", status: 404 });
  }
};

export const siginIn = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { email, password } = req.body;
    const user = await AuthModel.findOne({ email });

    if (user) {
      const decryptedPassword = await bcrypt.compare(password, user?.password);
      if (decryptedPassword) {
        if (user?.isVerified && user?.isVerifiedToken === "") {
          const token = jwt.sign(
            { id: user?._id },
            process.env.JWT_SECRET as string,
            { expiresIn: process.env.JWT_EXPIRES }
          );
          return res.status(201).json({
            message: "Account Login successfully",
            data: token,
            status: 201,
          });
        } else {
          return res.status(404).json({
            message: "Error with login verification process",
            status: 404,
          });
        }
      } else {
        return res
          .status(404)
          .json({ message: "Incorrect password", status: 404 });
      }
    } else {
      return res.status(404).json({ message: "Error with email", staus: 404 });
    }
  } catch (error) {
    return res.status(404).json({ message: "Error with Login", status: 404 });
  }
};

export const Readone = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { userID } = req.params;

    const user = await AuthModel.findById(userID);

    return res
      .status(200)
      .json({ message: "One user read successfully", data: user, status: 200 });
  } catch (error) {
    return res
      .status(404)
      .json({ message: "Error with one user findbyid", status: 404 });
  }
};

export const Readall = async (req: Request, res: Response) => {
  try {
    const user = await AuthModel.find();
    return res
      .status(200)
      .json({ message: "All user read successfully", data: user, status: 200 });
  } catch (error) {
    return res
      .status(404)
      .json({ message: "Error with all user read", status: 404 });
  }
};

export const forgetPassword = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { email } = req.body;
    const token = await crypto.randomBytes(6).toString("hex");
    const user = await AuthModel.findOne({ email });
    if (user) {
      await AuthModel.findByIdAndUpdate(
        user?._id,
        {
          isVerifiedToken: token,
        },
        { new: true }
      );
      return res
        .status(201)
        .json({ message: "email has been sent to you", status: 201 });
    } else {
      return res
        .status(404)
        .json({ message: "Error with forgetpassword", status: 404 });
    }
  } catch (error) {
    return res
      .status(404)
      .json({ message: "Error something goes wrong", status: 404 });
  }
};

export const changePassword = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { userID } = req.params;
    const { password } = req.body;
    const salt = await bcrypt.genSalt();
    const hashed = await bcrypt.hash(password, salt);
    if (userID) {
      await AuthModel.findByIdAndUpdate(
        userID,
        {
          password: hashed,
          isVerifiedToken: "",
        },
        { new: true }
      );
      return res
        .status(201)
        .json({ message: "password changed successfully", status: 201 });
    } else {
      return res
        .status(404)
        .json({ message: "Error with password change", status: 404 });
    }
  } catch (error) {
    return res.status(404).json({ message: "Error something is wrong" });
  }
};
