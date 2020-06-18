import {
  ApiOutlined,
  BarsOutlined,
  IdcardOutlined,
  UserAddOutlined
} from '@ant-design/icons';
import { Breadcrumb, Button, Card, Col, Layout, Row, Space, Typography } from 'antd';
import React, { Component } from 'react';

import { AddMember } from './imandex';
import { Link } from 'react-router-dom';
import axios from 'axios';

const {Text} = Typography; 
const { Header, Content } = Layout;
const Token = localStorage.getItem('lgtoken');

export default class Homefront extends Component
{
    constructor(props)
    {
        super(props);
        this.state = 
        {
            memberD: false,
            person: [],
        }
        this.toggleMemberD  = this.toggleMemberD.bind(this);
    }
    toggleMemberD() 
    {
        this.setState
        ({
            memberD: !this.state.memberD,
        })
    }
    componentDidMount()
    {
        axios.get('http://139.180.147.221:8101/admin/showmember', {headers: {'Authorization': Token}})
        .then(res => {
        this.setState({person: res.data})
        })
        .catch(e => {
        console.log(e,'= Error')
      })
    }   
    Logout = () =>
    {
        axios.get('http://192.168.1.46:3000/admin/logout', {headers: {'Authorization': Token}})
        .then(res => {
            console.log(res.data);
            localStorage.removeItem('lgtoken')
            console.log(localStorage.getItem('lgtoken'))
            window.location=('/LogIn')
        })
    }

    render()
    {
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
                                    <Button danger type='link' style={{float: 'right', margin: '15px 0px', color: 'white'}}>
                                        <ApiOutlined />Log Out
                                    </Button>
                                </Link>
                            </Col>
                        </Row>
                    </Header>

                    <Content style={{ padding: '0 50px' }} >
                        <Breadcrumb separator="" style={{ margin: '20px 0px 0px 0px' }}>
                                <Breadcrumb.Item>
                                    <Link to="/Dashboard">
                                        <Text strong style={{color: '#40a9ff'}}><BarsOutlined /> Dashboard </Text>
                                    </Link>
                                </Breadcrumb.Item>
                            <Breadcrumb.Separator />
                            <Breadcrumb.Item>
                                <Text strong ><IdcardOutlined /> Member</Text>
                            </Breadcrumb.Item>
                        </Breadcrumb>
                        <Text style={{fontSize: '36px'}}>Member</Text>
                        <Button type='primary' className="addmemButt" style={{margin: '10px 0px 0px 0px'}} onClick={this.toggleMemberD} >
                            <UserAddOutlined /> Add new member 
                        </Button>

                        <div className="content_Home">
                            <Space align='start' size='large'>
                                <Row gutter={[38, 30]} align='middle'>
                                    {this.state.person.map(item => (
                                        <Link to={{ pathname: '/Profile', profile: item}}>
                                            <Col span={24} >
                                                <Card
                                                hoverable
                                                class="row"
                                                style={{ width: 'auto', height: 'auto' }}
                                                cover={<img alt="Eiloy" src={'http://139.180.147.221:8101/' + item.image} style={{height: 250, width: 250}}/>}
                                                >
                                                    <p>
                                                        Username    : {item.username} <br />
                                                        Name        : {item.firstname} {item.lastname} <br />
                                                        Position    : {item.position} <br />
                                                        
                                                    </p>
                                                </Card>
                                            </Col>
                                        </Link>
                                    ))}
                                </Row>
                            </Space>
                        </div>
                    </Content>
                </Layout>

                <AddMember openMember={this.state.memberD} closeMember={this.toggleMemberD} 
                />
                
            </div>
        );
    }
}