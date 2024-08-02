import { Request, Response } from "express"

const todos = [
    { id: 1, text: 'Buy milk', completedAt: new Date(), isActive: true },
    { id: 2, text: 'Buy coffe', completedAt: null, isActive: true },
    { id: 3, text: 'Buy butter',completedAtt: new Date(), isActive: true },
];

export class TodosController {

    //* DI
    constructor() {}


    //* Get Todos
    public getTodos = (req:Request, res:Response) => {
        return res.json(todos);
    }

    //* Get Todo By ID
    public getTodosByID = (req:Request, res:Response) => {
        const id = +req.params.id;
        if ( isNaN(id) ) return res.status(400).json({error: 'ID argument must be a number'});

        const todo = todos.find( todo => todo.id === id );

        ( todo )
            ? res.json(todo)
            : res.status(404).json({ error: `Todo with ID:${ id } not found` });
    }

    //* Create Todo
    public createTodo = ( req: Request, res: Response ) => {

        const { text } = req.body;
        if ( !text ) return res.status( 400 ).json( { error: "Text property is required" }); 
        const newTodo = {
            id: todos.length + 1,
            text: text,
            completedAt: null,
            isActive: true,
        }

        todos.push ( newTodo );
        res.json( newTodo );

    };

    //* Update Todo

    public updateTodo = ( req: Request, res: Response ) => {
        const id = +req.params.id;
        if ( isNaN(id) ) return res.status(400).json({error: 'ID argument must be a number'});

        const todo = todos.find( todo => todo.id === id );
        if ( !todo ) return res.status(404).json({error: `The Todo with id ${ id } is not found.`});

        const { text, completedAt } = req.body;
        // if ( !text ) return res.status(400).json({error: 'Text property is required.'});

        todo.text = text || todo.text;
        ( completedAt === 'null')
            ? todo.completedAt = null
            : todo.completedAt = new Date( completedAt || todo.completedAt );

        res.json( todo );

    }

        //* Delete Todo dejando referencia 

        // public deleteTodo = ( req: Request, res: Response ) => {
        //     const id = +req.params.id;
        //     if ( isNaN(id) ) return res.status(400).json({error: 'ID argument must be a number'});
    
        //     const todo = todos.find( todo => todo.id === id );
        //     if ( !todo ) return res.status(404).json({error: `The Todo with id ${ id } is not found.`});
    
        //     const { text, isActive } = req.body;
        //     // if ( !text ) return res.status(400).json({error: 'Text property is required.'});
    
        //     todo.text = text || todo.text;
        //     ( isActive === true )
        //         ? todo.isActive = true
        //         : todo.isActive = false ;
    
    
        //     res.json( todo );
    
        // }

        //* Delete Todo / Eliminando referencia y regresando error.

        public deleteTodo = ( req: Request, res: Response ) => {
            const id = +req.params.id;
            if ( isNaN(id) ) return res.status(400).json({error: 'ID argument must be a number'});
    
            const todo = todos.find( todo => todo.id === id );
            if ( !todo ) return res.status(404).json({error: `The Todo with id ${ id } is not found.`});

            todos.splice( todos.indexOf(todo), 1);
            res.json(todo)
        }

}