import { Button, Card, Col, Drawer, Form, Input, Radio, Row, Space, Typography, notification } from 'antd';
import React, { Component } from 'react';

import axios from 'axios';
import { connect } from 'react-redux';
import { setDrawerClose } from '../Redux/Action'

const {Text} = Typography;
const Token = localStorage.getItem('lgtoken');
const connector = connect(({ drawer }) =>
({
    DrawerType: drawer.type,
    DrawerData: drawer.data
}), { setDrawerClose })

class DashDrawer extends Component
{
    constructor(props)
    {
        super(props);
        this.state =
        {
            person: [],
        }
    }

    render()
    {       
        const { TextArea } = Input;

        const handleSubmit = values =>
        {
            const user = 
            {
                'status': values.status,
                'note': values.note
            }

            console.log('>>>', this.props.DrawerData?.Dashboard.id)
            axios.post('http://139.180.147.221:8101/admin/addleave/' + this.props.DrawerData?.Dashboard.id, user, {headers: {'Authorization': Token}})
            .then(res => {
                if(res.data.message === 'add leave sucessfull')
                {
                        notification.success({
                        duration: '5',
                        message: 'Update successful!!!',
                        description: 'The information has been updated.'
                    })
                    setTimeout(() => {
                        window.location="/Dashboard"
                    }, 2000)
                }
            })
            .catch(error => {
                console.log('Error', error)
            })
        }

        return(
            <div >
            
            <Drawer title='Edit History' width={500} visible={this.props.DrawerData !== null} 
            onClose={() => this.props.setDrawerClose()}
            >
                <Card>
                    <Row>
                        <Col span={12}>
                            <Text>Name : </Text>
                            <Text code strong> {this.props.DrawerData?.Dashboard.name} </Text>
                        </Col>
                        <Col span={12}>
                            <Text>Date : </Text>
                            <Text code strong> {this.props.DrawerData?.Dashboard.Date} </Text>
                        </Col>
                    </Row>
                    <br/> <br/>
                    <Row> 
                        <Col span={24}>
                            <Text >Check-In : </Text>
                            <Text code strong > {this.props.DrawerData?.Dashboard.checkin} </Text>
                        </Col>   
                    </Row>
                </Card>
                <br/>
                
                <Form onFinish={handleSubmit}>
                    <Form.Item label="Status" name="status">
                        <Radio.Group name="status" size={"large"} defaultValue={'LEAVE'} onChange={this.props.Rad}>
                            <Radio value={'LEAVE'}>Leave</Radio>
                            <Radio value={'ABSENCE'}>Absence</Radio>
                        </Radio.Group>
                    </Form.Item>
                    
                    <Form.Item label="Note" name="note">
                        <TextArea name="note" rows={10} style={{ width: '450px' }} allowClear onChange={this.props.Change}/>
                    </Form.Item>    
                
                    <br />
                    <Form.Item style={{ float: 'right' }}>
                        <Space>
                            <Button danger onClick={this.props.closeDrawer}>Cancel</Button>
                            <Button type='primary' htmlType="submit">Update</Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Drawer>

            </div>
        );
    }
}

export default connector(DashDrawer);