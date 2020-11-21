import { Response } from "express";
import User, { UserViewModel } from "@models/User";
class UserController {
  public async index(res: Response): Promise<Response<UserViewModel[]>> {
    const users = await User.find({});
    return res.json(users);
  }
}

export default new UserController();
