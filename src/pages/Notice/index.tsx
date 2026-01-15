import { useWebSocket } from "ahooks";
import { Button, Card, Flex, Form, Input, Space } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

enum ReadyState {
    Connecting = 0,
    Open = 1,
    Closing = 2,
    Closed = 3,
}
const Notice = () => {

    const [form] = Form.useForm();


    const { userId } = useParams();

    const socketUrl = `ws://localhost:8088/ws/${userId}`;

    const {
        sendMessage,
        latestMessage,
        readyState,
        connect,
        disconnect
    } = useWebSocket(socketUrl);

    console.log('latestMessage', latestMessage, readyState)
    const sendUnicast = () => {
        console.log('first', form.getFieldsValue())
        const formData = { type: 'unicast', ...form.getFieldsValue() }
        sendMessage(JSON.stringify(formData));
    };

    const sendBroadcast = () => {
        const formData = { type: 'broadcast', ...form.getFieldsValue() }
        sendMessage(JSON.stringify(formData));
    };

    useEffect(() => {
        form.resetFields();
    }, [userId])

    return (
        <Flex
            vertical
            gap={16}
            style={{ margin: 16 }}
        >
            <Card>
                {/* <Form form={form}>
                    <Form.Item label="用户ID" name="userId">
                        <Input placeholder="请输入用户ID" />
                    </Form.Item>
                </Form> */}
                <Space>
                    <Button
                        type="primary"
                        onClick={connect}
                        disabled={readyState !== ReadyState.Open && readyState !== ReadyState.Connecting}
                    >
                        连接
                    </Button>
                    <Button
                        danger
                        type="primary"
                        onClick={disconnect}
                        disabled={readyState === ReadyState.Open || readyState === ReadyState.Connecting}
                    >
                        断开
                    </Button>
                </Space>
            </Card>
            <Card>
                <Form form={form}>
                    <Form.Item label="目标用户" name="to">
                        <Input placeholder="请输入目标用户" />
                    </Form.Item>
                    <Form.Item label="消息内容" name="message">
                        <Input placeholder="请输入消息内容" />
                    </Form.Item>
                </Form>
                <Space>
                    <Button type="primary" onClick={sendUnicast}>私聊</Button>
                    <Button danger type="primary" onClick={sendBroadcast}>群聊</Button>
                </Space>
            </Card>
            <Card title="接收到的消息">
                <div>{latestMessage?.data}</div>
            </Card>
        </Flex>
    )
}


export default Notice;