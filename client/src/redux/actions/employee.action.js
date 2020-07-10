import moment from 'moment';
import axiosCall from './index';
import types from './action-types';
import URL from '../../config/routes';

export const getAllEmployees = () => {
  const path = `${URL.GET_ALL_EMPLOYEES}`;
  const responseType = types.GET_ALL_EMPLOYEES;
  return axiosCall('get', path, responseType);
};

export const getAllEmployeesByOrg = (id, data) => {
  const path = `${URL.GET_ALL_EMPLOYEES}/org/${id}`;
  const responseType = types.GET_ALL_EMPLOYEES_BY_ORG;
  return axiosCall('get', path, responseType);
};

export const createEmployee = data => {
  data.dateOfBirth = moment(data.dateOfBirth).format('YYYY-MM-DD');
  data.dateOfJoining = moment(data.dateOfJoining).format('YYYY-MM-DD');
  const path = `${URL.GET_ALL_EMPLOYEES}`;
  const responseType = types.CREATE_EMPLOYEE;
  return axiosCall('post', path, responseType, data);
};

export const updateEmployee = data => {
  data.dateOfBirth = moment(data.dateOfBirth).format('YYYY-MM-DD');
  data.dateOfJoining = moment(data.dateOfJoining).format('YYYY-MM-DD');
  const path = `${URL.GET_ALL_EMPLOYEES}/${data.id}`;
  const responseType = types.UPDATE_EMPLOYEE;
  return axiosCall('put', path, responseType, data);
};

export const deleteEmployee = id => {
  const path = `${URL.GET_ALL_EMPLOYEES}/${id}`;
  const responseType = types.DELETE_EMPLOYEE_BY_ID;
  return axiosCall('delete', path, responseType);
};


export const getEmployeesBySalary = (id, gt,lt) => {
  const path = `${URL.GET_ALL_EMPLOYEES}/salary/${id}/${gt}/${lt}`;
  const responseType = types.GET_EMPLOYEES_BY_SALARY;
  return axiosCall('get', path, responseType);
};

