const { Router } = require('express');
const requiredAuth = require('../middleware/requiredAuth')
const { createTask, getTask, getTasks, deleteTask, editTask } = require('../controllers/taskcontrollers');
const router = Router();

router.use(requiredAuth)
// get all task
router.get("/", getTasks)

// create new task
router.post("/", createTask)

// get specific task
router.get("/:id", getTask)

// delete specific task
router.delete("/:id", deleteTask)

// edit or update specific task
router.patch("/:id", editTask
)

module.exports = router;