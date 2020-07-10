const employeeService = require("../service/employee.service");

/**
 * create a employee
 * @param req
 * @param res
 * @posts
 **/
exports.createEmployee = async (req, res) => {
  const employee = await employeeService.createEmployee(req.body);
  res.status(employee.statusCode).json(employee);
};

/**
 * get all employees
 * @param req
 * @param res
 * @get
 */
exports.getAllEmployee = async (req, res) => {
  const employee = await employeeService.getAllEmployee(req.query);
  res.status(employee.statusCode).json(employee);
};

/**
 * get all employees
 * @param req
 * @param res
 * @get
 */
exports.getAllEmployeeByOrg = async (req, res) => {
  const employee = await employeeService.getAllEmployeeByOrg(req.params.id,req.body);
  res.status(employee.statusCode).json(employee);
};


// /**
//  * get all employees by salary
//  * @param req
//  * @param res
//  * @get
//  */
// exports.getAllEmployeeBySalary = async (req, res) => {
//   console.log("i m here print", req)
//   // const employee = await employeeService.getAllEmployeeBySalary(req.query.gt, req.query.lt);
//   // res.status(employee.statusCode).json(employee);
// };


/**
 * get employee
 * @param req
 * @param res
 * @get
 */
exports.getEmployee = async (req, res) => {
  const employee = await employeeService.getEmployee(req.params.id);
  res.status(employee.statusCode).json(employee);
};

/**
 * update employee by object id
 * @param req
 * @param res
 * @put
 */
exports.updateEmployee = async (req, res) => {
  const employee = await employeeService.updateEmployee(req.params.id, req.body);
  res.status(employee.statusCode).json(employee);
};

/**
 * delete employee by object id
 * @param req
 * @param res
 * @delete
 */
exports.deleteEmployee = async (req, res) => {
  const employee = await employeeService.deleteEmployee(req.params.id);
  res.status(employee.statusCode).json(employee);
};



/**
 * get all employees by salary
 * @param req
 * @param res
 * @get
 */
exports.getAllEmployeeBySalary = async (req, res) => {
  const employee = await employeeService.getAllEmployeeBySalary(req.params.id, req.params.gt, req.params.lt);
  res.status(employee.statusCode).json(employee);
};