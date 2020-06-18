import { Button, Card, Col, Drawer, Form, Input, Row, Select, Space, Typography, notification } from 'antd';
import React, { Component } from 'react';

const {Text} = Typography;
const { Option } = Select;

export default class NoteDrawer extends Component
{
    render()
    {
        
        function onChange(value) 
        {
            console.log(`selected ${value}`);
        }
        
        function onBlur() 
        {
            console.log('blur');
        }
        
        function onFocus() 
        {
            console.log('focus');
        }
        
        function onSearch(val) 
        {
            console.log('search:', val);
        }

        const Success = type => 
        {
            notification[type]
            ({
                message: 'Done!',
                description: "Edited history succesfully."
            });
        };

        const Error = type =>
        {
            notification[type]
            ({
                message: 'Error!',
                description: "Can't edit the history properly."    
            });
        };

        const { TextArea } = Input;

        return(
            <div >
            
            <Drawer
            title='Edit History'
            width={500}
            visible={this.props.openNote}
            onClose={this.props.closeNote}
            >
                <Card>
                    <Text>Date : </Text>
                    <Text code strong>15-03-2020</Text>
                    <br/> <br/>
                    <Row>
                        <Col span={12}>
                            <Text style={{color: 'green'}}>Check-In : </Text>
                            <Text code strong>10.15</Text>
                        </Col>
                        <Col span={12}>
                        <Text style={{color: 'red'}}>Check-Out : </Text>
                            <Text code strong>18.23</Text>
                        </Col>
                    </Row>
                </Card>
                <br/>
                
                <Form>
                    <Form.Item label="Status">
                        <Select showSearch
                        placeholder='Select a Status'
                        onChange={onChange}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        onSearch={onSearch}
                        style={{ width: '450px' }}
                        >
                            <Option value="Attend">Attend</Option>
                            <Option value="Late">Late</Option>
                            <Option value="Leave">Leave</Option>
                            <Option value="Absence">Absence</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Note">
                        <TextArea rows={10} style={{ width: '450px' }}/>
                    </Form.Item>
                </Form>
                <br /> 
                <Space style={{ float: 'right' }}>
                    <Button danger onClick={this.props.closeNote}>Cancel</Button>
                    <Button type='primary' htmlType='submit' onClick={() => Success('success')}>Update</Button>
                </Space>
            </Drawer>

            </div>
        );
    }
}