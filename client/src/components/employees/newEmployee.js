/* eslint-disable no-unused-expressions */
import React, { Component } from "react";
import moment from "moment";
import {
  Layout,
  Form,
  Row,
  Col,
  Input,
  Button,
  Select,
  message,
  DatePicker,
  TreeSelect,
} from "antd";
import dictionary from "../../config/static/Dictionary";
import Spinner from "../common/Spinner/Spinner";
import HeaderMain from "../../containers/header/header-container";
import Sidebar from "../../containers/sidebar/sidebar-container";
import Footer from "../common/footer";
import * as OPTIONS from "../../helpers/selectOptions";
import { compareObjects } from "../../utils/utils";
import * as time from "../../utils/timeUtils";
import Regex from "../../utils/regex";

const { Header, Content } = Layout;
const { TreeNode } = TreeSelect;
const { Option } = Select;

class NewEMPLOYEE extends Component {
  constructor(props) {
    super(props);
    props.form.resetFields();
    this.state = {
      loading: true,
      organizationOptions: [],
      formData: {},
    };
  }

  componentDidMount() {
    this.organization = this.props.location.state
    this.getEmployees();
    const { getOrganization } = this.props;
    getOrganization(this.organization._id);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const organizationOptions = [];
    const { orgResponse } = nextProps;
    if (orgResponse && orgResponse.data) {
        organizationOptions.push(
          <TreeNode value={orgResponse.data._id} title={orgResponse.data.name} key={orgResponse.data._id} />
        );
      this.setState({ organizationOptions });
    }
    this.setState({ loading: false });
  }

  componentDidUpdate(prevProps) {
    const { createResponse, updateResponse, closeEmployee } = this.props;
    if (compareObjects(createResponse, prevProps.createResponse)) {
      if (createResponse.success) {
        this.setState({ loading: false, formData: {} });
        message.success("Employee Successfully Created");
        closeEmployee && closeEmployee();
        this.getEmployees();
      } else {
        message.error(createResponse.errorMessage);
      }
    }
    if (compareObjects(updateResponse, prevProps.updateResponse)) {
      this.setState({ loading: false });
      message.success("employee Successfully Updated");
      closeEmployee && closeEmployee(updateResponse);
      this.getEmployees();
    }
  }

  handleSubmit = (e) => {
    const { form } = this.props;
    e.preventDefault();
    form.validateFields(async (err, values) => {
      console.log('values', values)
      values.orgId = values.orgId[0]
      if (!err) {
        await Object.keys(values).forEach(
          (key) => !values[key] && delete values[key]
        );
        this.createEmployee(values);
        this.setState({ loading: true, formData: values });
      } else {
        this.setState({ loading: false });
      }
    });
  };

  getEmployees = () => {
    // const { getAllEmployees } = this.props;
    // getAllEmployees();
    const { getAllEmployeesByOrg } = this.props;
    getAllEmployeesByOrg(this.organization._id);
    
  };

  createEmployee = (data) => {
    const { createEmployee, updateEmployee, currentEmployee } = this.props;
    if (currentEmployee) {
      data.id = currentEmployee._id;
      updateEmployee(data);
    } else {
      createEmployee(data);
    }
  };

  onCancel = () => {
    const { form } = this.props;
    form.resetFields();
  };

  renderFormView = () => {
    const { loading, organizationOptions, formData } = this.state;
    const { isOpen, form, currentEmployee = formData } = this.props;
    const { getFieldDecorator } = form;
    const splWidth = isOpen ? 12 : 6;
    const {
      name,
      email,
      phoneNumber,
      gender,
      address,
      designation,
      salary,
      orgId,
      dateOfBirth,
      dateOfJoining,
    } = currentEmployee;
    return (
      <div>
        {loading && (
          <span>
            <Spinner />
          </span>
        )}
        {!loading && (
          <Form
            style={{ paddingBottom: "3rem" }}
            layout="vertical"
            onSubmit={() => this.handleSubmit(window.event)}
          >
            {isOpen && [
              <>
                <Row gutter={16} className="row">
                  <Col span={12}>
                    <h1>
                      {currentEmployee._id
                        ? dictionary.EDIT_EMPLOYEE
                        : dictionary.CREATE_EMPLOYEE}
                    </h1>
                  </Col>
                </Row>
                {currentEmployee._id && (
                  <Row gutter={16} className="row">
                    <Col sm={12} md={12} lg={12} xl={splWidth} xxl={splWidth}>
                      <Form.Item>
                        <h4 className="href-txt">
                          {name && name.toUpperCase()}
                        </h4>
                      </Form.Item>
                    </Col>
                  </Row>
                )}
              </>,
            ]}
            <Row gutter={16} className="row">
              <Col sm={12} md={12} lg={12} xl={splWidth} xxl={splWidth}>
                <Form.Item label={dictionary.EMPLOYEE_NAME}>
                  {getFieldDecorator("name", {
                    initialValue: name || "",
                    rules: [
                      {
                        required: true,
                        message: "Please Enter the Employee Name",
                      },
                      {
                        pattern: new RegExp(Regex.ALPHABET),
                        message: "employee name must be alphabets",
                      },
                    ],
                  })(
                    <Input
                      className="commonText"
                      placeholder={dictionary.EMPLOYEE_NAME}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={12} md={12} lg={12} xl={splWidth} xxl={splWidth}>
                <Form.Item label={dictionary.EMPLOYEE_ADDRESS}>
                  {getFieldDecorator("address", {
                    initialValue: address || "",
                    rules: [
                      {
                        required: true,
                        message: "Please Enter the Employee Address",
                      },
                      {
                        pattern: new RegExp(Regex.ALPHA_NUMERIC),
                        message: "employee address must be Alpha Numeric",
                      },
                    ],
                  })(
                    <Input
                      className="commonText"
                      placeholder={dictionary.EMPLOYEE_ADDRESS}
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16} className="row">
              <Col sm={12} md={12} lg={12} xl={splWidth} xxl={splWidth}>
                <Form.Item label={dictionary.EMPLOYEE_DESIGNATION}>
                  {getFieldDecorator("designation", {
                    initialValue: designation || "",
                    rules: [
                      {
                        required: true,
                        message: "Please Enter the Employee Designation",
                      },
                      {
                        pattern: new RegExp(Regex.ALPHA_NUMERIC),
                        message: "employee designation must be Alpha Numeric",
                      },
                    ],
                  })(
                    <Input
                      className="commonText"
                      placeholder={dictionary.EMPLOYEE_DESIGNATION}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={12} md={12} lg={12} xl={splWidth} xxl={splWidth}>
                <Form.Item label={dictionary.EMPLOYEE_SALARY}>
                  {getFieldDecorator("salary", {
                    initialValue: salary || "",
                    rules: [
                      {
                        required: true,
                        message: "Please Enter the Employee Salary",
                      },
                      {
                        pattern: new RegExp(Regex.NUMERIC),
                        message: "employee salary must be Numeric",
                      },
                    ],
                  })(
                    <Input
                      className="commonText"
                      placeholder={dictionary.EMPLOYEE_SALARY}
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16} className="row">
              <Col sm={12} md={12} lg={12} xl={splWidth} xxl={splWidth}>
                <Form.Item label={dictionary.E_MAIL}>
                  {getFieldDecorator("email", {
                    initialValue: email || "",
                    rules: [
                      {
                        required: true,
                        message: "Please Enter the Email",
                      },
                      {
                        type: "email",
                        message: "Please enter the valid email",
                      },
                    ],
                  })(
                    <Input
                      className="commonText"
                      placeholder={dictionary.E_MAIL}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={12} md={12} lg={12} xl={splWidth} xxl={splWidth}>
                <Form.Item label={dictionary.PHONE_NUMBER}>
                  {getFieldDecorator("phoneNumber", {
                    initialValue: phoneNumber || "",
                    rules: [
                      {
                        required: true,
                        message: "Please Enter the Phone Number",
                      },
                      {
                        max: 10,
                        pattern: new RegExp(Regex.PHONE),
                        message: "phone number must be 10 digit number",
                      },
                    ],
                  })(
                    <Input
                      type="number"
                      className="commonText"
                      placeholder={dictionary.PHONE_NUMBER}
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>

            

            <Row gutter={16} className="row">
            <Col sm={12} md={12} lg={12} xl={splWidth} xxl={splWidth}>
                <Form.Item label={dictionary.SELECT_GENDER}>
                  {getFieldDecorator("gender", {
                    initialValue: gender || "",
                    rules: [
                      {
                        required: true,
                        message: "Please Select the Gender",
                      },
                    ],
                  })(
                    <Select
                      showSearch
                      placeholder={dictionary.PLEASE_SELECT}
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        option.props.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      <Option disabled value="">
                        {dictionary.PLEASE_SELECT}
                      </Option>
                      {OPTIONS.gender}
                    </Select>
                  )}
                </Form.Item>
              </Col>   
            <Col sm={12} md={12} lg={12} xl={splWidth} xxl={splWidth}>
                <Form.Item label={dictionary.SELECT_ORGANIZATION}>
                  {getFieldDecorator("orgId", {
                    initialValue: orgId || undefined,
                  })(
                    <TreeSelect
                      showSearch
                      style={{ width: 350 }}
                      dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
                      placeholder="Please select"
                      allowClear
                      multiple
                      treeDefaultExpandAll
                      filterTreeNode={(input, option) =>
                        option.props.title
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {organizationOptions}
                    </TreeSelect>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16} className="row">
              <Col sm={12} md={12} lg={12} xl={splWidth} xxl={splWidth}>
                <Form.Item label={dictionary.DATE_OF_BIRTH}>
                  {getFieldDecorator("dateOfBirth", {
                    initialValue: (dateOfBirth && moment(dateOfBirth)) || "",
                    rules: [
                      {
                        required: true,
                        message: "Please Select Date Of Birth",
                      },
                    ],
                  })(
                    <DatePicker
                      allowClear={false}
                      placeholder={dictionary.DATE_OF_BIRTH}
                      disabledDate={(date) => time.getAdultAge(date)}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col sm={12} md={12} lg={12} xl={splWidth} xxl={splWidth}>
                <Form.Item label={dictionary.DATE_OF_JOINING}>
                  {getFieldDecorator("dateOfJoining", {
                    initialValue:
                      (dateOfJoining && moment(dateOfJoining)) || "",
                    rules: [
                      {
                        required: true,
                        message: "Please Select Date Of Joining",
                      },
                    ],
                  })(
                    <DatePicker
                      allowClear={false}
                      disabledDate={(date) => time.disabledateOfJoining(date)}
                      placeholder={dictionary.DATE_OF_JOINING}
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16} className="row">
              <Col sm={12} md={12} lg={12} xl={splWidth} xxl={splWidth}>
                <Button type="primary" htmlType="submit" icon="plus">
                  {currentEmployee._id ? dictionary.UPDATE : dictionary.SUBMIT}
                </Button>
              </Col>
              <Col
                sm={12}
                md={12}
                lg={12}
                xl={splWidth}
                xxl={splWidth}
                style={{ textAlign: "right" }}
              >
                <Button
                  type="primary"
                  htmlType="reset"
                  icon="undo"
                  onClick={() => this.onCancel()}
                >
                  {dictionary.CANCEL}
                </Button>
              </Col>
            </Row>
          </Form>
        )}
      </div>
    );
  };

  renderInFullScreen() {
    return (
      <>
        <HeaderMain isCompany loggedIn />
        <Layout className="layoutStyle">
          <Sidebar {...this.props} />
          <Layout>
            <Header className="headerStyle">{dictionary.CREATE_EMPLOYEE}</Header>
            <Content className="contentStyle">
              <div className="contentInnerDivStyle">
                {this.renderFormView()}
              </div>
            </Content>
            <Footer />
          </Layout>
        </Layout>
      </>
    );
  }

  render() {
    const { isOpen } = this.props;
    return <>{isOpen ? this.renderFormView() : this.renderInFullScreen()}</>;
  }
}

export default Form.create()(NewEMPLOYEE);
