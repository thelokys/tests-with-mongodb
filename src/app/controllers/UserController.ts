import { Router, Request, Response } from "express";
import User, { IUserSchema } from "@models/User";

class UserController {
  public async index(req: Request, res: Response): Promise<Response> {
    const users = await User.find({});
    return res.json(users);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const userFound = await User.findById(id);

    if (!userFound) {
      return res.status(404).json(`User not found with id: ${id}`);
    }

    return res.json(userFound);
  }

  public async store(req: Request, res: Response): Promise<Response> {
    const { name, email, age, avatar_url } = req.body;

    const userToInsert = { name, email, age, avatar_url };

    const userFound = await User.findOne({ email });

    if (userFound) {
      return res.status(400).json("This email already exists.");
    }

    const user = await User.create(userToInsert);

    return res.status(201).location(`${req.fullUrl}/${user._id}`).json(user);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { name, age, avatar_url } = req.body;
    const userDataUpdate = { name, age, avatar_url };

    const userFound = await User.findById(id);

    if (!userFound) {
      return res.status(404).json(`User not found with id: ${id}`);
    }

    await User.updateOne({ id }, userDataUpdate);

    return res.sendStatus(204);
  }

  public async destroy(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const userFound = await User.findById(id);

    if (!userFound) {
      return res.status(404).json(`User not found with id: ${id}`);
    }

    return res.sendStatus(204);
  }
}

export default new UserController();
