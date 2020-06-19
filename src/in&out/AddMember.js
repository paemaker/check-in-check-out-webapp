import '../ex_css.css';

import { Button, Col, Drawer, Form, Input, Row, Select, Space, Typography, Upload, notification } from 'antd';
import React, { Component } from 'react';

import {UploadOutlined} from '@ant-design/icons';
import axios from 'axios';

const Token = localStorage.getItem('lgtoken');

const { Text } = Typography;
const { Option } = Select;
export default class AddPersonnel extends Component
{    
    render()
    {
        const validateMessages = 
        {
            required: '${label} is required!',
            types: 
            {
                email: '${label} is not validate email!'   
            }
        };

        const props = 
        {
            name: 'file',
            action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
            listType: 'picture',
        };

        const onFinish = values => 
        {
            const formData = new FormData();
                formData.append('username',     values.username);
                formData.append('firstname',    values.firstname);
                formData.append('lastname',     values.lastname);
                formData.append('nickname',     values.nickname);
                formData.append('email',        values.email);
                formData.append('position',     values.position);
                formData.append('photo',        values.photo.file);
            console.log(values);
            axios.post('http://139.180.147.221:8101/admin/addmember', formData, {headers: {'Authorization': Token, 'Content-Type': 'multipart/form-data'}})
            .then(res => {
            if(res.data.message === 'add member sucessfull')
            {
                notification.success({
                    duration: 0,
                    message: 'Done!',
                    description: <Text>Added member successfully. <br/> Password : "{res.data.password}"</Text>
                }) 
                setTimeout(() => {
                   window.location=('/Homefront') 
                }, 6000);                
            }
            })
            .catch(e => {
                console.log('Error =', e)
            })
        };
          
        const onFinishFailed = errorInfo => {
            console.log('Failed:', errorInfo);
        };


        return(
            <>                
                
                <Drawer title={<h2 style={{margin: '10px 0px 0px 35%'}}>Add member</h2>} visible={this.props.openMember}
                width={500} onClose={this.props.closeMember}
                >
                    <Form validateMessages={validateMessages} layout="vertical" onFinishFailed={onFinishFailed} onFinish={onFinish}>
                        <Form.Item name="username" label="Username" rules={[{ required: true }]} >
                            <Input name="username" placeholder="zizou05" allowClear/>
                        </Form.Item>
                        
                        <Row>
                            <Col span={12}>
                                <Form.Item name="firstname" label="Firstname" rules={[{ required: true }]} 
                                style={{width: '220px'}}
                                >
                                    <Input name="firstname" placeholder="David" allowClear />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name="lastname" label="Lastname" rules={[{ required: true }]} >
                                    <Input name="lastname" placeholder="O'brien" allowClear />
                                </Form.Item>
                            </Col>
                        </Row>
                        
                        <Form.Item name="nickname" label="Nickname" rules={[{ required: true }]}>
                            <Input name="nickname" placeholder="Dave" allowClear />
                        </Form.Item>
                        <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
                            <Input name="email" placeholder="zz98@gmail.com" allowClear />
                        </Form.Item>
                        
                        <Form.Item name="position" label="Position" >
                            <Select
                                name="position"
                                showSearch
                                style={{ width: 450 }}
                                placeholder="Select a standing"
                                optionFilterProp="children"
                                allowClear
                            >
                                <Option value="C level (CEO)">C-Level (CEO)</Option>
                                <Option value="C-Level Corporate">C-Level Corporate</Option>
                                <Option value="Graphic Design">Graphic Design</Option>
                                <Option value="Software Quality Assurance">Software Quality Assurance</Option>
                                <Option value="Mobile Developer">Mobile Developer</Option>
                                <Option value="Frontend Developer">Frontend Developer</Option>
                                <Option value="Manager">Manager</Option>
                                <Option value="Admin">Admin</Option>
                                <Option value="Marketing">Marketing</Option>
                            </Select>
                        </Form.Item>
                        
                        <Form.Item name="photo" label="Photo" >
                            <Upload {...props} name="photo" beforeUpload={() => false}>
                                <Button style={{width: 450}} >
                                    <UploadOutlined /> Upload
                                </Button>
                            </Upload>
                        </Form.Item>

                        <br />
                        <br />
                        <Form.Item style={{float: 'right'}}>
                            <Space>
                                <Button onClick={this.props.closeMember} danger>Cancel</Button>
                                <Button htmlType="submit" type="primary">Submit</Button>
                            </Space>
                        </Form.Item>
                    </Form>         
                </Drawer>

            </>
        );
    }
}