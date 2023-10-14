const express = require('express');
const router = express.Router();
const path = require('path');
const employeeController = require('../../Controllers/EmployeesController');
const ROLES_LIST = require('../../Config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');


router.route('/').
    get(employeeController.getAllEmployees).
    post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), employeeController.createEmployees).
    put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),employeeController.updateEmployee).
    delete(verifyRoles(ROLES_LIST.Admin),employeeController.deleteEmployee)

router.route('/:id')
    .get(employeeController.getEmployee)

module.exports = router;
