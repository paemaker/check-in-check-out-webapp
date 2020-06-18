import { Button, Card, Checkbox, Form, Input, Typography, notification } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import axios from 'axios';

const {Text} = Typography;

export default class LogIn extends Component 
{
  state =
  {
    username: '',
    password: ''
  }

  handleSubmit = values =>
  {
    this.setState
    ({
      username: values.username,
      password: values.password
    })
    const user = 
    {
      'username': this.state.username,
      'password': this.state.password
    }
    
    axios.post('http://192.168.1.46:3000/login', user)
    .then(res => {
      console.log(res.data);
      if(res.data.message === 'login sucessfull')
      {
        localStorage.setItem('lgtoken', res.data.Token);
        console.log(localStorage.getItem('lgtoken'));
  
        window.location='/Homefront';
      }
      else
      {
        notification.error({
          duration: '5',
          message: 'Failed!!',
          description: <Text>Can't sign in to the server.<br/> Please check your <Text strong style={{color: 'red'}}>Username</Text> and <Text strong style={{color: 'red'}}>Password</Text></Text>
        })
      }
    })
  }

  handleChange = values => 
  {
    this.setState({ username: values.target.value });
    this.setState({ password: values.target.value });
  }
  
  render()
  {
    return (
      <div className="loginBG">
        <Card title={[<h1 style={{margin: 1}}>Forex City</h1>]} style={{ width: 500, height: 330 }} className="card_LogIn">
          <Form name="normal_login" initialValues={{ remember: true }} onFinish={this.handleSubmit}>
            
            <Form.Item name="username" rules={[{ required: true, message: 'Please input your Username!' }]}>
              <Input size='large' prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" onChange={this.handleChange}/>
            </Form.Item>
            
            <Form.Item name="password" rules={[{ required: true, message: 'Please input your Password!' }]}>
              <Input.Password size='large' prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Password" onChange={this.handleChange}/>
            </Form.Item>
            {/* <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              <a className="login-form-forgot" href="" style={{ color: "red" }} type='dashed'>
                Forgot password ?
              </a>
            </Form.Item> */}
            <Form.Item>
              <Button block htmlType="submit" className="loginButt">
                Log In
              </Button>
            </Form.Item>
            
          </Form>
        </Card>       
      </div>
    );
  }
}