import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import EmployeeComponent from '../../components/employees/findEmployee';
import { getAllEmployees, getEmployeesBySalary, getAllEmployeesByOrg, deleteEmployee } from '../../redux/actions/employee.action';
import { getOrganization } from '../../redux/actions/organization.action';

const mapStateToProps = state => ({
  employeeResponse: state.Employee.employeeResponse,
  employeeByOrgResponse: state.Employee.employeeByOrgResponse,
  empResponseBySalary: state.Employee.empResponseBySalary,
  deleteResponse: state.Employee.deleteResponse,
  orgResponse: state.Organization.orgResponse,
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ getAllEmployees, getEmployeesBySalary, getAllEmployeesByOrg, getOrganization, deleteEmployee }, dispatch);
};

const Employee = connect(mapStateToProps, mapDispatchToProps)(EmployeeComponent);

export default Employee;
