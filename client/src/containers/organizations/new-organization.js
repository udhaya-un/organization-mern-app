import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import OrganizationComponent from '../../components/organizations/newOrganization';
import { getAllEmployees, getAllEmployeesByOrg } from '../../redux/actions/employee.action';
import { saveOrganization, updateOrganization, getOrganization } from '../../redux/actions/organization.action';

const mapStateToProps = state => ({
  organizationResponse: state.Organization.organizationResponse,
  employeeResponse: state.Employee.employeeResponse,
  employeeByOrgResponse: state.Employee.employeeByOrgResponse,
  organizationCreateResponse: state.Organization.organizationCreateResponse,
  organizationUpdateResponse: state.Organization.organizationUpdateResponse,
  orgResponse: state.Organization.orgResponse,
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ getAllEmployees, getAllEmployeesByOrg, getOrganization, saveOrganization, updateOrganization }, dispatch);
};

const Organization = connect(mapStateToProps, mapDispatchToProps)(OrganizationComponent);

export default Organization;
