import React, { Component } from 'react';
import { Layout, Form, Row, Col, Input, Button, Select, message, DatePicker } from 'antd';
import moment from 'moment';
import './styles.scss';
import dictionary from '../../config/static/Dictionary';
import Spinner from '../common/Spinner/Spinner';
import HeaderMain from '../../containers/header/header-container';
import Sidebar from '../../containers/sidebar/sidebar-container';
import Footer from '../common/footer';
import { disablePastDates, disableFutureDate } from '../../utils/timeUtils';
import Regex from '../../utils/regex';

const { Header, Content } = Layout;
const { Option } = Select;

class New extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      manager: [],
      client: [],
      lead: [],
      initDate: null,
      popup: false,
      popups: false,
      formData: {}
    };
  }

  componentDidMount() {
    const { getAllEmployees } = this.props;
    getAllEmployees();
  }

  UNSAFE_componentWillReceiveProps(nextprops) {
    const { popup, popups } = this.state;
    const { closeOrganization } = this.props;
    const { userResponse, organizationCreateResponse, organizationUpdateResponse } = nextprops;
    if (userResponse && userResponse.data) {
      this.userResponse(userResponse.data);
      this.setState({ loading: false });
    }
    if (organizationCreateResponse && popups) {
      if (organizationCreateResponse.success) {
        this.setState({ loading: false, popups: false, formData: {} });
        message.success('Organization Successfully Created');
        closeOrganization();
        this.getOrganizations();
      } else {
        this.setState({ loading: false, popups: false });
        message.error(organizationCreateResponse?.errorMessage || 'Error');
      }
    }
    if (organizationUpdateResponse && organizationUpdateResponse.success && popup) {
      this.setState({ popup: false });
      this.setState({ loading: false });
      message.success('Organization Successfully Updated');
      closeOrganization();
      this.getOrganizations();
    }
  }

  getOrganizations = () => {
    const { getAllOrganizations } = this.props;
    getAllOrganizations();
  };

  handleSubmit = e => {
    const { form } = this.props;
    e.preventDefault();
    form.validateFields(async (err, values) => {
      if (!err) {
        await Object.keys(values).forEach(key => !values[key] && delete values[key]);
        this.saveOrganization(values);
        this.setState({ loading: true });
      }
    });
  };

  saveOrganization = data => {
    const { saveOrganization, updateOrganization, currentOrganization } = this.props;
    if (currentOrganization) {
      data.id = currentOrganization._id;
      updateOrganization(data);
      this.setState({ popup: true });
    } else {
      saveOrganization(data);
      this.setState({ popups: true, formData: data });
    }
  };

  onCancel = () => {
    const { form } = this.props;
    form.resetFields();
  };

  renderFormView = () => {
    const { loading, formData } = this.state;
    const { isOpen, form, currentOrganization = formData } = this.props;
    const {
      name,
      cin,
      crn,
      address,
      business,
      type
    } = currentOrganization;

    const { getFieldDecorator } = form;
    const splWidth = isOpen ? 12 : 6;
    return (
      <div>
        {/* {loading && (
          <span>
            <Spinner />
          </span>
        )}
        {!loading && ( */}
          <Form
            style={{ paddingBottom: '3rem' }}
            layout="vertical"
            onSubmit={() => this.handleSubmit(window.event)}
          >
            {isOpen && [
              <>
                <Row gutter={16} className="row">
                  <Col span={12}>
                    <h1>
                      {currentOrganization.id ? dictionary.EDIT_ORGANIZATION : dictionary.CREATE_ORGANIZATION}
                    </h1>
                  </Col>
                </Row>
                {currentOrganization.id && (
                  <Row gutter={16} className="row">
                    <Col sm={12} md={12} lg={12} xl={splWidth}>
                      <Form.Item>
                        <h4 className="href-txt">{name && name.toUpperCase()}</h4>
                      </Form.Item>
                    </Col>
                  </Row>
                )}
              </>
            ]}
            <Row gutter={16} className="row">
              <Col sm={12} md={12} lg={12} xl={splWidth}>
                <Form.Item label={dictionary.ORGANIZATION_NAME}>
                  {getFieldDecorator('name', {
                    initialValue: name || '',
                    rules: [
                      {
                        required: true,
                        message: 'Please Enter the Organization Name'
                      },
                      {
                        pattern: new RegExp(Regex.ALPHA_NUMERIC),
                        message: 'Organization name must be Alphanumeric'
                      }
                    ]
                  })(<Input className="commonText" placeholder={dictionary.ORGANIZATION_NAME} />)}
                </Form.Item>
              </Col>
              <Col sm={12} md={12} lg={12} xl={splWidth}>
                <Form.Item label={dictionary.ORGANIZATION_CIN}>
                  {getFieldDecorator('cin', {
                    initialValue: cin || '',
                    rules: [
                      {
                        required: true,
                        message: 'Please Enter the Organization CIN'
                      },
                      {
                        pattern: new RegExp(Regex.ALPHA_NUMERIC),
                        message: 'Organization CIN must be Alphanumeric'
                      }
                    ]
                  })(<Input className="commonText" placeholder={dictionary.ORGANIZATION_CIN} />)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16} className="row">
              <Col sm={12} md={12} lg={12} xl={splWidth}>
                <Form.Item label={dictionary.ORGANIZATION_CRN}>
                  {getFieldDecorator('crn', {
                    initialValue: crn || '',
                    rules: [
                      {
                        required: true,
                        message: 'Please Enter the Organization CRN'
                      },
                      {
                        pattern: new RegExp(Regex.NUMERIC),
                        message: 'Organization CRN must be Numeric'
                      }
                    ]
                  })(<Input className="commonText" placeholder={dictionary.ORGANIZATION_CRN} />)}
                </Form.Item>
              </Col>
              <Col sm={12} md={12} lg={12} xl={splWidth}>
                <Form.Item label={dictionary.ORGANIZATION_ADDRESS}>
                  {getFieldDecorator('address', {
                    initialValue: address || '',
                    rules: [
                      {
                        required: true,
                        message: 'Please Enter the Organization Address'
                      },
                      {
                        pattern: new RegExp(Regex.ALPHA_NUMERIC),
                        message: 'Organization Address must be Alphanumeric'
                      }
                    ]
                  })(<Input className="commonText" placeholder={dictionary.ORGANIZATION_ADDRESS} />)}
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16} className="row">
              <Col sm={12} md={12} lg={12} xl={splWidth}>
                <Form.Item label={dictionary.ORGANIZATION_BUSINESS}>
                  {getFieldDecorator('business', {
                    initialValue: business || '',
                    rules: [
                      {
                        required: true,
                        message: 'Please Enter the Organization Business'
                      },
                      {
                        pattern: new RegExp(Regex.ALPHA_NUMERIC),
                        message: 'Organization Business must be Alphanumeric'
                      }
                    ]
                  })(<Input className="commonText" placeholder={dictionary.ORGANIZATION_BUSINESS} />)}
                </Form.Item>
              </Col>
              <Col sm={12} md={12} lg={12} xl={splWidth}>
                <Form.Item label={dictionary.ORGANIZATION_TYPE}>
                  {getFieldDecorator('type', {
                    initialValue: type || '',
                    rules: [
                      {
                        required: true,
                        message: 'Please Enter the Organization Type'
                      },
                      {
                        pattern: new RegExp(Regex.ALPHA_NUMERIC),
                        message: 'Organization Type must be Alphanumeric'
                      }
                    ]
                  })(<Input className="commonText" placeholder={dictionary.ORGANIZATION_TYPE} />)}
                </Form.Item>
              </Col>
            </Row>
            
           
            <Row gutter={16} className="row">
              <Col sm={12} md={12} lg={12} xl={splWidth} xxl={splWidth}>
                <Button type="primary" htmlType="submit" icon="plus">
                  {currentOrganization.id ? dictionary.UPDATE : dictionary.SUBMIT}
                </Button>
              </Col>
              <Col
                sm={12}
                md={12}
                lg={12}
                xl={splWidth}
                xxl={splWidth}
                style={{ textAlign: 'right' }}
              >
                <Button type="primary" htmlType="reset" icon="undo" onClick={() => this.onCancel()}>
                  {dictionary.CANCEL}
                </Button>
              </Col>
            </Row>
          </Form>
        {/* )} */}
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
            <Header className="headerStyle">{dictionary.CREATE_ORGANIZATION}</Header>
            <Content className="contentStyle">
              <div className="contentInnerDivStyle">{this.renderFormView()}</div>
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

export default Form.create()(New);
