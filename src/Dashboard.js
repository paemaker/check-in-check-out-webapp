import {
    ApiOutlined,
    IdcardOutlined,
} from '@ant-design/icons';
import { Button, Col, DatePicker, Layout, Row, Space, Table, Tag, Typography } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import React, { Component } from 'react';

import DashDrawer from './in&out/DashDrawer';
import axios from 'axios';
import { connect } from 'react-redux';
import { setDrawerData } from './Redux/Action'

const { Header, Content } = Layout;
const { Text } = Typography; 
const Token = localStorage.getItem('lgtoken');
const connector = connect (
    ({drawer}) => ({
        DrawerType: drawer.type,
        DrawerData: drawer.data
    }), { setDrawerData }
)

class Dashboard extends Component
{
    constructor(props)
    {
        super(props);
        this.state = 
        {
            dashD: false,
            person: [],
            id: ''
        }
        this.toggleDashD = this.toggleDashD.bind(this);
    }
    toggleDashD()
    {
        this.setState
        ({
            dashD: !this.state.dashD
        })
    }

    componentDidMount()
    {
        axios.get('http://139.180.147.221:8101/admin/showallhistory', {headers: {'Authorization': Token}})
        .then(res => {
            console.log(res.data)
            this.setState({person: res.data})
        })
        .catch(err => {
            console.log('Error =',err)
        })
    }

    Logout = () =>
    {
        axios.get('http://192.168.1.46:3000/admin/logout', {headers: {'Authorization': Token}})
        .then(res => {
            console.log(res.data);
            localStorage.removeItem('lgtoken')
            console.log(localStorage.getItem('lgtoken'))
            window.location=('/')
        })
    }

    render()
    {
        const columns = 
        [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                width: 150
            },
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
                      else if(tag === null)
                      {
                          return null
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
            {
                title: 'Action',
                dataIndex: 'action',
                key: 'action',
                width: 60,
            }
        ];

        const data = this.state.person.map(item => 
        ({
            key     : item.name,
            name    : item.name,
            date    : item.Date,
            in      : item.checkin,
            status  : [item.status],
            note    : item.note,
            action  : 
            <Button type="link" id={item.name} onClick={() => {this.props.setDrawerData({ type: 'data', data: {Dashboard: item} })
            }}>Edit</Button>
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
                                <Button danger type='link' style={{float: 'right', margin: '15px 0px', color: 'white'}} >
                                    <ApiOutlined />Log Out
                                </Button>
                            </Link>
                        </Col>
                    </Row>
                </Header>
                
                <Content style={{ padding: '0px 50px' }} >
                    <Text style={{fontSize: '36px'}}>Dashboard</Text>


                    <div className="table_Dash">
                        <Space>
                            <Text strong style={{fontSize: '18px'}}>Time Attendance</Text> 
                            <Link to="/Homefront">
                                <Button type="primary"><IdcardOutlined />Member</Button>
                            </Link>
                        </Space>
                        <Space style={{float: 'right'}}>
                            <DatePicker onChange={onChange} />
                        </Space>
                        <br /><br/>                
                        <Table columns={columns} 
                        dataSource={data}
                        size='small'
                        bordered
                        >
                            
                        </Table>
                    </div>
                </Content>
            </Layout>
            
            <DashDrawer closeDash={this.toggleDashD} Submit={this.handleSubmit} />   
            
        </div>
      );
    }
}

export default connector(withRouter(Dashboard));