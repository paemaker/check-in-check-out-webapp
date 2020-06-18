import { Button, Card, Col, Drawer, Form, Input, Radio, Row, Space, Typography, notification } from 'antd';
import React, { Component } from 'react';

import { connect } from 'react-redux';
import { setDrawerClose } from '../Redux/Action'

const {Text} = Typography;
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

        const InsertInfo = values =>
        {
                
        }

        return(
            <div >
            
            <Drawer title='Edit History' width={500} visible={this.props.DrawerData !== null} 
            onClose={() => this.props.setDrawerClose({ type: 'data', data: [this.props.closeDash] })}
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
                
                <Form onSubmitCapture={this.props.Submit}>
                    <Form.Item label="Status" name="status">
                        <Radio.Group name="status" size={"large"} defaultValue={'Leave'} onChange={this.props.Rad}>
                            <Radio value={'Leave'}>Leave</Radio>
                            <Radio value={'Absence'}>Absence</Radio>
                        </Radio.Group>
                    </Form.Item>
                    
                    <Form.Item label="Note" name="note">
                        <TextArea name="note" rows={10} style={{ width: '450px' }} onChange={this.props.Change}/>
                    </Form.Item>
                </Form>
                
                <br />
                <Space style={{ float: 'right' }}>
                    <Button danger onClick={this.props.closeDrawer}>Cancel</Button>
                    <Button type='primary' htmlType="submit">Update</Button>
                </Space>
            </Drawer>

            </div>
        );
    }
}

export default connector(DashDrawer);