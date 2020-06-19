import {
  ApiOutlined,
  BarsOutlined,
  IdcardOutlined,
  UserOutlined
} from '@ant-design/icons';
import { Avatar, Breadcrumb, Button, Card, Col, DatePicker, Layout, Popconfirm, Row, Table, Tag, Typography, notification } from 'antd';
import React, {Component} from 'react';

import { Link } from 'react-router-dom';
import axios from 'axios';

const {Header, Content} = Layout;
const {Text} = Typography;
const Token = localStorage.getItem('lgtoken')

export default class Profile extends Component
{
  constructor(props)
  {
    super(props);
    this.state =
    {
      person: [],
      history: []
    }
  }
  componentDidMount()
  {
    axios.get('http://139.180.147.221:8101/admin/showmemberhistory/' + this.state.person.member_id , {headers: {'Authorization': Token}})
    .then(res => {
      this.setState({
        history: res.data
      })
    })
    .catch(e => {
      console.log(e, '= Error')
    })
  }
  componentWillMount()
  {
    if(this.props.location.profile) 
    {
      this.setState
      ({
        person: this.props.location.profile,
      })
    } else { window.location="/Homefront" }
  }

  Logout = () =>
  {
      axios.get('http://192.168.1.46:3000/admin/logout', {headers: {'Authorization': Token}})
      .then(res => {
          localStorage.removeItem('lgtoken')
          window.location=('/')
      })
  }

  DeleteMember = () =>
  {
    axios.get('http://139.180.147.221:8101/admin/delete/' + this.state.person.member_id, {headers: {'Authorization': Token}})
    .then(res => {    
      if(res.data.message === "delete Successfull")
      {
        notification.success({
          duration    : '5',
          message     : 'Done!',
          description : 'Member has already been deleted.'
        })
        setTimeout(() => {
          window.location=('/Homefront');
        }, 1500);
      }
    }).catch(error => {
      notification.error({
        duration    : '5',
        message     : 'Failed!',
        description : "Member couldn't be deleted."
      })
    })
  }
  
    render()
    {
      const columns = 
      [
        {
          title: 'Date',
          dataIndex: 'date',
          key: 'date',
          width: 120,
        },
        {
          title: 'Check-In',
          dataIndex: 'in',
          key: 'in',
          width: 160
        },
        {
          title: 'Check-Out',
          dataIndex: 'out',
          key: 'out',
          width: 160
        },
        {
          title: 'Status',
          key: 'status',
          dataIndex: 'status',
          width: 50,
          render: status => 
          (
            <>
              {status.map(tag => {
                let color = tag ;
                if (tag === 'ATTEND') 
                {
                  color = 'green';
                }
                else if (tag === 'LATE')
                {
                    color = 'orange';
                }
                else if (tag === 'LEAVE')
                {
                    color = 'blue';
                }
                else if (tag === 'ABSENCE')
                {
                    color = 'red';
                }
                return (
                  <Tag color={color} key={tag}>
                    {tag.toUpperCase()}
                  </Tag>
                );
              })}
            </>
          ),
        },
        {
          title: 'Note',
          key: 'note',
          dataIndex: 'note',
        },
      ];
      
      const data = this.state.history.map(item => 
      ({
        key     : item.created_at,
        date    : item.created_at,
        in      : item.checkin_at,
        out     : item.checkout_at,
        status  : [item.status],
        note    : item.note 
      }))

      function onChange(date, dateString)
      {
        console.log(date, dateString);
      }
      
        return(
          <div className="HomeProDashBG">

          <Layout>
            <Header style={{backgroundColor: '#002766'}}>
              <Row>
                <Col span={8}>
                </Col>
                <Col span={8} style={{textAlign: 'center'}}>
                    <Text strong style={{fontSize: '40px', color: '#ffff'}}>Forex City</Text>
                </Col>
                <Col span={8}>
                  <Link to="/LogIn" onClick={this.Logout}>
                    <Button type='link' style={{float: 'right', margin: '15px 0px', color: 'white'}}>
                        <ApiOutlined />Log Out
                    </Button>
                  </Link>
                </Col>
              </Row>
            </Header>

            <Content style={{padding: '0 50px'}}>
              <Breadcrumb separator="" style={{ margin: '20px 0px 0px 0px' }}>
                <Breadcrumb.Item>
                    <Link to="/Dashboard">
                        <Text strong style={{color: '#40a9ff'}}><BarsOutlined /> Dashboard </Text>
                    </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Separator/>
                <Breadcrumb.Item>
                  <Link to="/Homefront">
                    <Text strong style={{color: '#40a9ff'}}><IdcardOutlined /> Member</Text>
                  </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Separator />
                <Breadcrumb.Item>
                  <Text strong><UserOutlined /> Profile </Text>
                </Breadcrumb.Item>
              </Breadcrumb>
              <Text style={{fontSize: '36px', margin: '20px 0px 0px 0px'}}>Profile</Text>
              
              <Card className="card_Profile">
                <Row>
                  <Col span={6} style={{display: 'flex', justifyContent: 'center'}}>
                    <Avatar src={'http://139.180.147.221:8101/' + this.state.person.image} size={200} style={{border: 'solid #002766'}} />
                  </Col>
                  <Col span={18} style={{backgroundColor: '#F0F8FF', borderRadius: '10px', padding: '10px'}}>
                    <Row>
                      <Col span={12}>
                        <h1>Member Information</h1>
                        <h3 className="textCard_Profile">Username : {this.state.person.username}</h3>
                        <h3 className="textCard_Profile">Firstname : {this.state.person.firstname} </h3>
                        <h3 className="textCard_Profile">Lasname : {this.state.person.lastname} </h3>
                        <h3 className="textCard_Profile">Nickname : {this.state.person.nickname} </h3> 
                      </Col>
                      <Col span={12}>
                        <br /><br />
                        <h3 className="textCard_Profile">Position : {this.state.person.position} </h3> 
                        <h3 className="textCard_Profile">Email : {this.state.person.email} </h3>
                        <h3 className="textCard_Profile">Option : {<Popconfirm placement="bottomLeft" title="Are you sure delete this member?" 
                          onConfirm={this.DeleteMember} okText="Yes" cancelText="No">
                            <a href="#"><Button danger>Delete Member</Button></a>
                          </Popconfirm>}
                        </h3>
                          
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Card>
              
              <br />
              <br />
              <div className="table_Profile">
                <Text strong style={{fontSize: '18px'}}>History</Text> 
                <DatePicker onChange={onChange} picker="month" style={{float: 'right'}}/>
                <br /><br />
                <Table columns={columns}
                dataSource={data}
                size='small'
                bordered
                style={{ textAlign: 'center' }}
                >
                    
                </Table>
              </div>
            </Content>
          </Layout>
          
          </div>
        );
    }
}