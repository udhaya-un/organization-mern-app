import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import OrganizationComponent from '../../components/organizations/FindOrganization';
import { getAllOrganizations, deleteOrganization } from '../../redux/actions/organization.action';
import { getAllEmployeesByOrg } from '../../redux/actions/employee.action';

const mapStateToProps = state => ({
  organizationResponse: state.Organization.organizationResponse,
  organizationDeleteResponse: state.Organization.organizationDeleteResponse,
  employeeByOrgResponse: state.Employee.employeeByOrgResponse
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ getAllOrganizations, getAllEmployeesByOrg, deleteOrganization }, dispatch);
};

const Organization = connect(mapStateToProps, mapDispatchToProps)(OrganizationComponent);

export default Organization;
