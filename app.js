const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const queries = require("./app/queries/todo");
const app = express();
const PORT = 3000;

app.use(cors())
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.get("/", (response) => {
    response.json({ info: "Node.js, Express, and Postgres todo" });
});

app.post("/todo", queries.createTodo);
app.get("/todo", queries.getTodo);
app.get("/todo/:id", queries.getTodoById);
app.put("/todo/:id", queries.updateTodo);
app.delete("/todo/:id", queries.deleteTodo);
app.patch("/todo/:id", queries.updateTodoCheck);
/* app.delete("/todo/id/:checked", queries.deleteTodoCheck); */

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}.`);
});