import { Avatar, Button, Descriptions, Drawer, Select, Space, Table, Tag } from 'antd';
import React, { Component } from 'react';

import eiloy from '../img/eiloy.png';

const { Option } = Select;

export default class ProfileDrawer extends Component
{ 
    render()
    {
        const columns = 
        [
            {
              title: 'Date (DD-MM-YYYY)',
              dataIndex: 'date',
              key: 'date',
              width: 200,
            //   defaultSortOrder: 'descend',
              sorter:
              {
                compare: (a ,b) => a.date - b.date,
                multiple: 3,
              },
            },
            {
              title: 'Check-In',
              dataIndex: 'in',
              key: 'in',
              width: 150
            },
            {
              title: 'Check-Out',
              dataIndex: 'out',
              key: 'out',
              width: 150
            },
            {
              title: 'Status',
              key: 'status',
              dataIndex: 'status',
              width: 150,
              render: status => 
              (
                <>
                  {status.map(tag => {
                    let color = tag ;
                    if (tag === 'Attend') 
                    {
                      color = 'green';
                    }
                    else if (tag === 'Late')
                    {
                        color = 'orange';
                    }
                    else if (tag === 'Leave')
                    {
                        color = 'blue';
                    }
                    else if (tag === 'Absence')
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
            {
              title: 'Action',
              key: 'action',
              width: 80,
            //   render: text => <a>{text}</a>,
              render: () => 
              (
                <Space size="middle">
                  <Button onClick={this.props.Note} >Edit</Button>
                </Space>
              ),
            },
        ];

        for(let i=0; i<=100; i++)
        {
            var keyy = i++;
        }

        const data = 
        [
            {
                key: {keyy},
                date: '20-03-2020',
                in: '09:59:45',
                out: '18:12:51',
                status: ['Attend'],
                note: '-'
            }
        ];

        return(
   
          <div className="ProfileNote">
          
            <Drawer
            title='Profile'
            visible={this.props.openProfile}
            onClose={this.props.closeProfile}
            width = {1200}
            >   
                <Descriptions size='small' bordered style={{ textAlign: 'center' }}>
                    <Descriptions.Item label="Profile picture"><Avatar shape='square' size={90} src={eiloy} /></Descriptions.Item>
                    <Descriptions.Item label="Name&Surname">Chumsin Sinchum</Descriptions.Item>
                    <Descriptions.Item label="Nickname">Pae</Descriptions.Item>
                    <Descriptions.Item label="UserName">chmsn</Descriptions.Item>
                    <Descriptions.Item label="Email">chmsn@kkumail.com</Descriptions.Item>
                    <Descriptions.Item label="Standing">Developer</Descriptions.Item>
                </Descriptions>
                <br />
                
                <Table columns={columns}
                dataSource={data}
                size='small'
                bordered
                >
                        
                </Table>
            </Drawer>

          </div>
        );
    }
}

// export default ProfileDrawer;