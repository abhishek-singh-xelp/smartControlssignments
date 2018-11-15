import BaseModel from "./BaseModel";
import { ApplicationError } from "../lib/errors";

import { default as userSchema } from "../schemas/user.schema.js";

export default class userModel extends BaseModel {
  constructor(connection) {
    super("user", connection);
    this.schema = userSchema;
    this.name = "user";
    this.model = this.connection.model(this.name, this.schema);
  }
  async create(userInformation) {
    try {
      let checkUser = await this.model.find({ email: userInformation.email });
      console.log(checkUser);
      if (checkUser.length > 0) {
        throw new ApplicationError("EmailId Already Register", 500, {});
      } else {
        const user = await this.model.create(userInformation);
        const response = await this.model.find({
          email: userInformation.email
        });
        console.log(response);
        if (!response) {
          return null;
        }
        return response;
      }
    } catch (error) {
      throw error;
    }
  }

  async getUserDetail(userInformation) {
    try {
      return await this.model.find({ email: userInformation.email });
    } catch (error) {
      throw new ApplicationError(error, 500, {});
    }
  }
  async updateUser(userId, userInformation) {
    try {
      const user = await this.model.findOneAndUpdate(
        { _id: userId, statusFlag: true },
        { $set: userInformation },
        { new: true }
      );
      return user;
    } catch (error) {
      throw new ApplicationError(error, 500, {});
    }
  }

  // this is for get PerticularUserDetails By userId
  async getById(userId) {
    try {
      const user = await this.model.find({
        userId: userId,
        statusFlag: true
      });
      return user;
    } catch (error) {
      throw new ApplicationError(error, 500, {});
    }
  }
}
