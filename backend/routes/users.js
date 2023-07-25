const { Router } = require('express');
const { fetchUser, fetchUsers, deleteUser, editUser, registerUser, loginUser } = require('../controllers/usercontrollers');
const router = Router();

router.post("/", registerUser)
router.post("/login", loginUser)
router.get("/", fetchUsers)
router.get("/:id",fetchUser)
router.delete("/:id", deleteUser)
router.patch("/:id", editUser)

module.exports = router

