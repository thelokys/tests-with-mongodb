import { Router } from "express";
import UserController from "@controllers/UserController";

const routes = Router();

// Routes: /api/users
routes.get("/users", UserController.index);
routes.get("/users/:id", UserController.show);
routes.post("/users", UserController.store);
routes.put("/users/:id", UserController.update);
routes.delete("/users/:id", UserController.destroy);

export default routes;
