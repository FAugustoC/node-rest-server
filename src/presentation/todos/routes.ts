import { Router } from "express";
import { TodosController } from "./controller";

export class TodoRoutes {
    static get routes(): Router {

        const router = Router();
        const todosController = new TodosController();

        router.get('/', todosController.getTodos );
        router.get('/:id', todosController.getTodosByID);
        router.put('/:id', todosController.updateTodo);
        router.post('/', todosController.createTodo);
        router.delete('/:id', todosController.deleteTodo);


        return router;
    }
}