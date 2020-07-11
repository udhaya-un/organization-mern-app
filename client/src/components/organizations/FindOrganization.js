/* eslint-disable max-len */
/* eslint-disable react/jsx-indent */
import React, { Component } from 'react';
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
  Icon,
  Popconfirm,
  message
} from 'antd';
import moment from 'moment';
import dictionary from '../../config/static/Dictionary';
import HeaderMain from '../../containers/header/header-container';
import Sidebar from '../../containers/sidebar/sidebar-container';
import Footer from '../common/footer';
import Spinner from '../common/Spinner/Spinner';
import Neworganization from '../../containers/organizations/new-organization';
import './styles.scss';
import { compareObjects } from '../../utils/utils';

const { Header, Content } = Layout;
const { Panel } = Collapse;

class Find extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resultJson: [],
      loading: true,
      orgEmpCount: [],
      visibleCreate: false,
      visibleEdit: false,
      items: [],
      lastDeletedId: false,
      searchValue: ''

    };
  }

  componentDidMount() {
    this.getorganizations();
  }

  UNSAFE_componentWillReceiveProps(nextprops) {
    const { organizationResponse, organizationDeleteResponse} = nextprops;
    const { items, lastDeletedId } = this.state;
    if (organizationResponse && organizationResponse.data) {
      if (compareObjects(items, organizationResponse.data)) {
        this.setState({
          resultJson: organizationResponse.data,
          items: organizationResponse.data,
          loading: false
        });
      }
    }
    if (organizationDeleteResponse && organizationDeleteResponse.success && lastDeletedId) {
      this.setState({ lastDeletedId: false });
      this.getorganizations();
      setTimeout(() => {
        message.success('organization successfully deleted');
      }, 2000);
    }
  }

  getorganizations = () => {
    const { getAllOrganizations } = this.props;
    getAllOrganizations();
  };

  editorganization = currentOrganization => {
    this.setState({
      currentOrganization,
      visibleEdit: true,
      visibleCreate: false
    });
  };

  deleteorganization = id => {
    const { deleteOrganization } = this.props;
    deleteOrganization(id);
    this.setState({ loading: true, lastDeletedId: true });
  };

  getorg = details => {
      this.props.history.push({
      pathname: '/employees',
      state: details
    })
  };

  handleChange = event => {
    const { value } = event.target;
    const { items } = this.state;

    const resultJson = items.filter(item => {
      return (
        item.name.toLowerCase().search(value.toLowerCase()) !== -1
      );
    });
    this.setState({ resultJson, searchValue: value });
  };

  onCreate = () => {
    this.setState({ visibleCreate: false });
  };

  onEdit = () => {
    this.setState({ visibleEdit: false });
  };

  renderorganizations() {
    const { loading, resultJson, visibleCreate, visibleEdit, currentOrganization, searchValue } = this.state;
    const tableColums = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text, record) => {
          return (
            <a onClick={() => this.editorganization(record)}>
              {record.name}
            </a>
          );
        }
      },
      {
        title: 'CIN',
        dataIndex: 'cin',
        key: 'cin',
        render: (text, record) => (record.cin || '-')
      },
      {
        title: 'CRN',
        dataIndex: 'crn',
        key: 'crn',
        render: (text, record) => (record.crn || '-')
      },
      {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
        render: (text, record) => (record.address || '-')
      },
      {
        title: 'Business',
        dataIndex: 'business',
        key: 'business',
        render: (text, record) => (record.business  || '-')
      },
      {
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
        render: (text, record) => (record.type  || '-')
      },
      {
        title: 'Delete',
        dataIndex: 'delete',
        key: 'delete',
        render: (text, record) => {
          return (
            <Popconfirm
              title="Do you want to delete this organization?"
              onConfirm={() => this.deleteorganization(record._id)}
              okText="Delete"
              cancelText="Cancel"
            >
              <Icon className="delete-icon" type="delete" />
            </Popconfirm>
          );
        }
      },
      {
        title: 'Employees',
        dataIndex: 'employee',
        key: 'employee',
        render: (text, record) => {
          return (
            <a onClick={() => this.getorg(record)}>
              {record.emp_count}
            </a>
          );
        }
      }
    ];

    return (
      <div>
        <Form name="documentList" layout="vertical">
          {loading ? (
            <span>
              <Spinner />
            </span>
          ) : (
          <div>
            <Row gutter={16} className="row" style={{ marginBottom: '10px' }}>
              <Col span={5} offset={19}>
                <Button
                  type="primary"
                  icon="plus"
                  onClick={() => this.setState({ visibleCreate: true, visibleEdit: false })}
                >
                  {dictionary.CREATE_ORGANIZATION}
                </Button>
              </Col>
            </Row>
            <Collapse defaultActiveKey={['1']} accordion>
              <Panel header={dictionary.ENTER_SEARCH_CRITERIA_HEADER} key="1">
                <Row gutter={16} className="row">
                  <Col sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item label={dictionary.SEARCH}>
                      <Input
                        placeholder={dictionary.SEARCH_ORGANIZATION}
                        onChange={this.handleChange}
                        name="id"
                        value={searchValue}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Panel>
            </Collapse>
            <Row gutter={16} className="row">
              <Col span={24}>
                <Table
                  loading={loading}
                  rowKey={record => record.id}
                  showHeader
                  columns={tableColums}
                  dataSource={resultJson}
                  scroll={{ x: true }}
                />
              </Col>
            </Row>
          </div>
          )}
        </Form>

        <Drawer
          style={{ marginTop: '50px' }}
          width={760}
          placement="right"
          closable
          destroyOnClose
          onClose={() => this.setState({ visibleCreate: false })}
          visible={visibleCreate}
        >
          <Neworganization {...this.props} closeOrganization={this.onCreate} isOpen />
        </Drawer>
        <Drawer
          style={{ marginTop: '50px' }}
          width={760}
          placement="right"
          closable
          destroyOnClose
          onClose={() => this.setState({ visibleEdit: false })}
          visible={visibleEdit}
        >
          <Neworganization
            {...this.props}
            closeOrganization={this.onEdit}
            isOpen
            currentOrganization={currentOrganization}
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
            <Header className="headerStyle">{dictionary.ORGANIZATIONS}</Header>
            <Content className="contentStyle">
              <div className="contentInnerDivStyle">{this.renderorganizations()}</div>
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
    return <>{isOpen ? this.renderorganizations() : this.renderInFullScreen()}</>;
  }
}
export default Form.create()(Find);
