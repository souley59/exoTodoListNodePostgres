const pool = require('../db/connexion');

const getTodo = (request, response) => {
    pool.query('SELECT * FROM todo ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
};

const getTodoById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query(`SELECT * FROM todo WHERE id = ${id}`, (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
};
const createTodo = (request, response) => {

    const { title, completed, checked } = request.body;

    pool.query(`INSERT INTO todo (title, completed, checked) VALUES ('${title}', '${completed}', '${checked}')`, (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`todo added with ID: ${results.insertId}`)
    })
};

const deleteTodo = (request, response) => {

    const id = parseInt(request.params.id);

    pool.query(`DELETE FROM todo WHERE id = ${id}`, (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};
/* const deleteTodoCheck = (request, response) => {
    
    const id = parseInt(request.params.id);

    pool.query(`DELETE FROM todo WHERE checked = $1 VALUES(true)`, [checked, id], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
}; */

const updateTodo = (request, response) => {

    const id = parseInt(request.params.id);

    const {completed } = request.body;

    pool.query(
        'UPDATE todo SET completed = $1 WHERE id = $2',
        [completed, id],
        (error) => {
            if (error) {
                throw error
            }
            response.status(200).send(`todo modified with ID: ${id}`)
        }
    );
};

const updateTodoCheck = (request, response) => {

    const id = parseInt(request.params.id);

    const { checked } = request.body;

    pool.query(
        'UPDATE todo SET checked = $1 WHERE id = $2 ',
        [ checked, id],
        (error) => {
            if (error) {
                throw error
            }
            response.status(200).send(`todo modified with ID: ${id}`)
        }
    );
};


module.exports = {
    getTodo,
    getTodoById,
    createTodo,
    deleteTodo,
    updateTodo,
    updateTodoCheck,
   /*  deleteTodoCheck */
};