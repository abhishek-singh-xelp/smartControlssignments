import {
  route
} from "./";
import {
  generateToken
} from "../lib/token";
import UserModel from "../db/UserModel";
import {
  hashPassword,
  comparePassword
} from "../lib/crypto";
import {
  ApplicationError
} from "../lib/errors";
import _ from "lodash";

export const registerUser = route(async (req, res) => {
  const userModel = new UserModel();
  try {
    const userDetails = req.body;
    let newUser = Object.assign({}, userDetails, {
      password: await hashPassword(req.body.password)
    });
    if (!_.isEmpty(newUser)) {
      console.log(newUser);
      const user = await userModel.create(newUser);
      let {
        _id
      } = user;
      let newUserWithAuthToken = Object.assign({}, user, {
        token: await generateToken(_id)
      });
      res.send({
        results: newUserWithAuthToken
      });
    } else {
      throw new ApplicationError("No userDetails Provided !!!", 501, {});
    }
  } catch (error) {
    throw new ApplicationError(error, 500, {});
  }
});

export const login = route(async (req, res) => {
  const userModel = new UserModel();
  try {
    const user = await userModel.getUserDetail(req.body);
    let password = user[0].password;
    let _id = user[0]._id;
    let checkPassword = await comparePassword(req.body.password, password);
    if (checkPassword) {
      let userWithAuthToken = Object.assign({}, user, {
        token: await generateToken(_id)
      });
      res.send({
        results: userWithAuthToken
      });
    } else {
      throw new ApplicationError("Incorrect password !!!", 501, {});
    }
  } catch (error) {
    throw new ApplicationError(error, 500, {});
  }
});