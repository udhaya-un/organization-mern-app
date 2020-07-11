/* eslint-disable react/jsx-indent */
import React, { Component } from "react";
import {
  BackTop,
  Layout,
  Form,
  Row,
  Col,
  Input,
  Collapse,
  Button,
  Table,
  Drawer,
  Select,
  Icon,
  Popconfirm,
  message,
} from "antd";
import dictionary from "../../config/static/Dictionary";
import HeaderMain from "../../containers/header/header-container";
import Sidebar from "../../containers/sidebar/sidebar-container";
import Footer from "../common/footer";
import NewEmployee from "../../containers/employees/new-employee";
import { compareObjects } from "../../utils/utils";

const { Header, Content } = Layout;
const { Panel } = Collapse;
const { Option } = Select;

class FindEmployee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resultJson: [],
      orgs:[],
      loading: true,
      visibleCreate: false,
      visibleEdit: false,
      items: [],
      lastDeletedId: false,
      searchValue: "",
      organization: {}
    };
  }

  componentDidMount() {
    this.organization = this.props.location.state
    this.getEmployees();
  }

  UNSAFE_componentWillReceiveProps(newProps) {
    const { employeeByOrgResponse, deleteResponse, empResponseBySalary } = newProps;
    const { items, lastDeletedId } = this.state;
    if (employeeByOrgResponse && employeeByOrgResponse.data) {
      this.orgs = employeeByOrgResponse
      if (compareObjects(items, employeeByOrgResponse.data)) {
        this.setState({
          resultJson: employeeByOrgResponse.data,
          items: employeeByOrgResponse.data,
          loading: false,
        });
      }
    }
    if (empResponseBySalary && empResponseBySalary.data) {
      if (compareObjects(items, empResponseBySalary.data)) {
      this.setState({
        resultJson: empResponseBySalary.data,
        items: empResponseBySalary.data,
        loading: false,
      });
    }
    }
    if (deleteResponse && deleteResponse.success && lastDeletedId) {
      this.setState({ lastDeletedId: false });
      this.getEmployees();
      setTimeout(() => {
        message.success("Employee deleted successfully");
      }, 2000);
    }
  }

  onChange = (value) => {
    const { getEmployeesBySalary } = this.props
    value = JSON.parse(value);
    getEmployeesBySalary(this.organization._id, value[0], value[1])
  }

  getEmployees = () => {
    const { getAllEmployeesByOrg } = this.props;
    getAllEmployeesByOrg(this.organization._id);
  };

  organization = () => {
    const { organization } = this.props;
    organization();
  }

  editEmployee = (currentEmployee) => {
    this.setState({
      currentEmployee,
      visibleEdit: true,
      visibleCreate: false,
    });
  };

  deleteEmployee = (id) => {
    const { deleteEmployee } = this.props;
    deleteEmployee(id);
    this.setState({ loading: true, lastDeletedId: true });
  };

  handleChange = (event) => {
    const { value } = event.target;
    const { items } = this.state;
    const resultJson = items.filter((item) => {
      console.log(item)
      return (
        item.name.toLowerCase().search(value.toLowerCase()) !== -1
      );
    });
    this.setState({ resultJson, searchValue: value });
  };

  onCancel(){
    this.getEmployees()
    if(this.orgs){
      this.setState({
        resultJson: this.orgs.data,
        loading: false,
      });
    }

  }
  onCreate = () => {
    this.setState({ visibleCreate: false });
  };

  onEdit = () => {
    this.setState({ visibleEdit: false });
  };

  renderEmployees() {
    const {
      loading,
      resultJson,
      visibleCreate,
      visibleEdit,
      currentEmployee,
      searchValue,
    } = this.state;
    const tableColums = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        sorter: (a, b) => a.address.length - b.address.length,
        sortDirections: ['descend', 'ascend'],
        render: (text, record) => {
          return (
            <a onClick={() => this.editEmployee(record)}>
              {record.name}
            </a>
          );
        },
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
        render: (text, record) => record.email || "-",
      },
      {
        title: "Phone Number",
        dataIndex: "phoneNumber",
        key: "phoneNumber",
        render: (text, record) => record.phoneNumber || "-",
      },
      {
        title: "Designation",
        dataIndex: "designation",
        key: "designation",
        render: (text, record) => record.designation || "-",
      },
      {
        title: "Salary",
        dataIndex: "salary",
        key: "salary",
        render: (text, record) => record.salary || "-",
        sorter: (a, b) => a.address.length - b.address.length,
        sortDirections: ['descend', 'ascend'],

      },
      {
        title: "gender",
        dataIndex: "gender",
        key: "gender",
        render: (text, record) => record.gender || "-",
      },
      {
        title: "address",
        dataIndex: "address",
        key: "address",
        render: (text, record) => record.address || "-",
      },
      {
        title: "Date of birth",
        dataIndex: "dateOfBirth",
        key: "dateOfBirth",
        render: (text, record) => record.dateOfBirth || "-",
      },
      {
        title: "Date of joining",
        dataIndex: "dateOfJoining",
        key: "dateOfJoining",
        render: (text, record) => record.dateOfJoining || "-",
      },
      {
        title: "Delete",
        dataIndex: "mode",
        key: "mode",
        render: (text, record) => {
          return (
            <Popconfirm
              title="Do you want to delete this employee?"
              onConfirm={() => this.deleteEmployee(record._id)}
              okText="Delete"
              cancelText="Cancel"
            >
              <Icon className="delete-icon" type="delete" />
            </Popconfirm>
          );
        },
      },
    ];

    return (
      <div>
        <Form name="documentList" layout="vertical">
          <div>
            <Row gutter={16} className="row" style={{ marginBottom: "10px" }}>
              <Col span={5} offset={19}>
                <Button
                  type="primary"
                  icon="plus"
                  onClick={() =>
                    this.setState({ visibleCreate: true, visibleEdit: false })
                  }
                >
                  {dictionary.CREATE_EMPLOYEE}
                </Button>
              </Col>
            </Row>
            <Collapse defaultActiveKey={["1"]} accordion>
              <Panel header={dictionary.ENTER_SEARCH_CRITERIA_HEADER} key="1">
                <Row gutter={16} className="row">
                  <Col sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item label={dictionary.SEARCH}>
                      <Input
                        placeholder={dictionary.SEARCH_EMPLOYEE}
                        onChange={this.handleChange}
                        name="employee_search"
                        value={searchValue}
                      />
                    </Form.Item>
                  </Col>
                  <Col sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item label={dictionary.SEARCH}>
                      <Select
                        showSearch
                        allowClear={true}
                        style={{ width: 200 }}
                        placeholder="Select a range"
                        optionFilterProp="children"
                        onChange={this.onChange}
                      >
                        <Option key="1" value="[10000,20000]">10000-20000</Option>
                        <Option key="2" value="[20000,40000]">20000-40000</Option>
                        <Option key="3" value="[40000,60000]">40000-60000</Option>
                        <Option key="4" value="[60000,80000]">60000-80000</Option>
                        <Option key="5" value="[80000-100000]">80000-100000</Option>
                      </Select>,
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                <Col sm={12} md={12} lg={12} xl={12} xxl={12}>
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
              </Panel>
            </Collapse>
            <Row gutter={16} className="row">
              <Col span={24}>
                <Table
                  loading={loading}
                  rowKey={() => resultJson.id}
                  showHeader
                  columns={tableColums}
                  dataSource={resultJson}
                  scroll={{ x: true }}
                />
              </Col>
            </Row>
          </div>
        </Form>
        <Drawer
          style={{ marginTop: "50px" }}
          width={760}
          placement="right"
          closable
          destroyOnClose
          onClose={() => this.setState({ visibleCreate: false })}
          visible={visibleCreate}
        >
          <NewEmployee {...this.props} closeEmployee={this.onCreate} isOpen />
        </Drawer>
        <Drawer
          style={{ marginTop: "50px" }}
          width={760}
          placement="right"
          closable
          destroyOnClose
          onClose={() => this.setState({ visibleEdit: false })}
          visible={visibleEdit}
        >
          <NewEmployee
            {...this.props}
            closeEmployee={this.onEdit}
            isOpen
            currentEmployee={currentEmployee}
          />
        </Drawer>
      </div>
    );
  }

  renderInFullScreen() {
    return (
      <>
        <HeaderMain isCompany loggedIn />
        <Layout className="layoutStyle">
          <Sidebar {...this.props} />
          <Layout>
            <Header className="headerStyle">{dictionary.EMPLOYEES}</Header>
            <Content className="contentStyle">
              <div className="contentInnerDivStyle">{this.renderEmployees()}</div>
            </Content>
            <Footer />
          </Layout>
        </Layout>
        <BackTop>
          <div className="ant-back-top-inner">{dictionary.UP_LABEL}</div>
        </BackTop>
      </>
    );
  }

  render() {
    const { isOpen } = this.props;
    return <>{isOpen ? this.renderEmployees() : this.renderInFullScreen()}</>;
  }
}
export default Form.create()(FindEmployee);
