const employee = require("../model/employee.model");
const baseDao = require("../dao/base.dao");
const response = require("../utils/response");

exports.createEmployee = async (body) => {
  let createEmployee = await baseDao.create(employee, body);
  if (!createEmployee) {
    return response.badRequest();
  }
  return response.success(createEmployee);
};

exports.getAllEmployee = async (params) => {
  for (var prop in params) {
    var regex = new RegExp(["^", params[prop], "$"].join(""), "i");
    params[prop] = regex
  }
  let employees = await baseDao.findAll(employee, params=params);
  if (!employees) {
    return response.error();
  }
  return response.success(employees);
};


exports.getAllEmployeeByOrg = async (id, sort_value) => {
  var employees = await baseDao.findAll(employee, params={orgId: id}, sort_value = sort_value);
  if (!employees) {
    return response.error();
  }
  org = {
    count: employees.length
  }
  employees.push(org)
  return response.success(employees);
};

exports.getAllEmployeeBySalary = async (id, gt, lt) => {
  var employees = await baseDao.findAllBySalary(employee, id, gt, lt);
  if (!employees) {
    return response.error();
  }
  return response.success(employees);
};


exports.getEmployee = async (id) => {

  let employees = await baseDao.findOne(employee, id);
  if (!employees) {
    return response.error();
  }
  return response.success(employees);
};

exports.updateEmployee = async (id, body) => {
  let updateEmployee = await baseDao.findOneAndUpdate(employee, id, body);
  if (!updateEmployee) {
    return response.notFound();
  }
  return response.success(updateEmployee);
};

exports.deleteEmployee = async (id) => {
  const body = { isDeleted: true };
  let updateEmployee = await baseDao.findOneAndUpdate(employee, id, body);
  if (!updateEmployee) {
    return response.notFound();
  }
  return response.deleted();
};
