const router = require("express").Router();
const employee = require("../controller/employee.controller");

// Create a new Employee
router.post("/", employee.createEmployee);

// Retrieve all Employees
router.get("/:id", employee.getAllEmployee);


// Retrieve all Employees by Org id
router.get("/org/:id", employee.getAllEmployeeByOrg);

// Retrieve all Employees by salary
router.get("/salary/:id/:gt/:lt", employee.getAllEmployeeBySalary);

// Update a Employee with object id
router.put("/:id", employee.updateEmployee);

// Delete employee by id
router.delete("/:id", employee.deleteEmployee);

// Retrieve all Employees
router.get("/", employee.getAllEmployee);

module.exports = router;
