import { } from "ahooks";
import { Button, Form, Input, Modal } from "antd";
import { useState } from "react";

const AddWithEditFormModal = (props: any) => {
    const {
        type = 'add',
        requstHandler, // 请求方法
    } = props;

    const [form] = Form.useForm();

    const [open, setOpen] = useState(false)

    const handleOk = async () => {
        const formData = await form.validateFields();
        requstHandler(formData);
        console.log('first',form.getFieldsValue(), formData)
    };

    const handleCancel = () => {
        setOpen(false);
    };
    return (
        <>
            <Button type={type === 'add' ? 'primary' : 'link'} onClick={() => setOpen(true)}>
                {type === 'add' ? '添加' : '编辑'}
            </Button>
            <Modal
                open={open}
                title={type === 'add' ? '添加' : '编辑'}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form
                    form={form}
                >
                    <Form.Item label="老师名称" name="name" rules={[{ required: true, message: '请输入老师名' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="学生列表" name="student" rules={[{ required: true, message: '请选择学生' }]}>
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default AddWithEditFormModal;