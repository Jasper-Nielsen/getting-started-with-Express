import express from "express";
import { todos } from "./data.js";
import cors from "cors";
const app = express();

app.use(express.json()); // middleware function

app.use(cors()); //uses cors
/*
💡 In Express.js, **`app.use(express.json())`** is a middleware function that is used to parse incoming request bodies with JSON payloads. This middleware is responsible for parsing the JSON data sent in the request body and making it accessible in the **`req.body`** object for further processing within your route handlers.

When you use **`express.json()`**, it enables Express to automatically parse JSON data from incoming requests with the **`"Content-Type: application/json"`** header. This is particularly useful when you're building APIs that send and receive JSON data, which is a common scenario in modern web development.

*/
app.get("/test",(req,res) =>{
    res.send("Hello Experess");
});

app.post("/test", (req, res) => {
    res.send("Post");
});

app.put("/test", (req,res) =>{
    res.send("put");
})

app.delete("/test", (req, res) => {
    res.send("delete");
});

app.patch("/test", (req, res) =>{
    res.send("patch");
})

app.get("/todos", (req,res)=>{
    res.json(todos); //res.json sætter header og stringifyer
});

app.post("/todos", (req,res)=>{

    const newTodo = {
      id: new Date().getTime(),
      task: req.body.task,
      completed: req.body.completed,
    };

    todos.push(newTodo);

    
    res.json(todos);
})

app.get("/todos/:toDoId", (req, res) => { //følte mig dum jeg ikke kunn huske find...evt jeg var syg
    const Id = Number(req.params.toDoId);

    const todoList = todos.find( t => t.id === Id)
  
    res.json(todoList);

});

app.put("/todos/:toDoId", (req, res) => { //inserts updated object in same index
  const Id = Number(req.params.toDoId);
// console.log(Id);
  const objectToUpdate = todos.find((t) => t.id === Id);
  todos.splice(todos.indexOf(objectToUpdate), 1, req.body); //text to insert and delets one index. in effect inserts updated object in same index
   
  res.json(todos);
});

app.listen(3000, () =>{
    console.log(`server started on port: http://localhost:3000`);
});