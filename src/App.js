import { Button, Card, Checkbox, Form, Input, Typography, notification } from 'antd';
import React, { Component } from 'react';

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
    const user = 
    {
      'username': values.username,
      'password': values.password
    }
    
    axios.post('http://139.180.147.221:8101/login', user)
    .then(res => {
      console.log(res.data);
      if(res.data.message === 'login sucessfull')
      {
        localStorage.setItem('lgtoken', res.data.Token);
        window.location='/Dashboard';
      }
      else
      {
        notification.error({
          duration: '5',
          message: 'Failed!',
          description: <Text>Can't sign in to the server.<br/> Please check your <Text strong style={{color: 'red'}}>Username</Text> and <Text strong style={{color: 'red'}}>Password</Text></Text>
        })
      }
    })
    .catch(error => {
      console.log(error)
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
        <Card title={[<h1 style={{margin: 1}}>Forex City</h1>]} style={{ width: 500, height: 'auto' }} className="card_LogIn">
          <Form name="normal_login" initialValues={{ remember: true }} layout='vertical' onFinish={this.handleSubmit} >
            
            <Form.Item name="username" label='Username' rules={[{ required: true, message: 'Please input your Username!' }]}>
              <Input size='large' onChange={this.handleChange}/>
            </Form.Item>
            
            <Form.Item name="password" label='Password' rules={[{ required: true, message: 'Please input your Password!' }]}>
              <Input.Password size='large' onChange={this.handleChange}/>
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
              <Button block htmlType="submit" className="loginButt">Log In</Button>
            </Form.Item>
            
          </Form>
        </Card>       
      </div>
    );
  }
}