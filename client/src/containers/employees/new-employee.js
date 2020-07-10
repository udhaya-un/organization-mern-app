import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import EmployeeComponent from '../../components/employees/newEmployee';
import { getAllEmployees, createEmployee, updateEmployee, getAllEmployeesByOrg } from '../../redux/actions/employee.action';
import { getAllOrganizations , getOrganization } from '../../redux/actions/organization.action';

const mapStateToProps = state => ({
  employeeResponse: state.Employee.employeeResponse,
  employeeByOrgResponse: state.Employee.employeeByOrgResponse,
  createResponse: state.Employee.createResponse,
  organizationResponse: state.Organization.organizationResponse,
  orgResponse: state.Organization.orgResponse,
  updateResponse: state.Employee.updateResponse
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ getAllEmployees, getAllEmployeesByOrg, getOrganization, createEmployee, getAllOrganizations, updateEmployee }, dispatch);
};

const Employee = connect(mapStateToProps, mapDispatchToProps)(EmployeeComponent);

export default Employee;
