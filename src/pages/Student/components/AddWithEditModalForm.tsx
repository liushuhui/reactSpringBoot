import { ModalForm, ProFormDigit, ProFormSelect, ProFormText } from "@ant-design/pro-components";
import { Button, Form, GetProp, message, Upload, UploadProps } from "antd";
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { useState } from "react";


type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const AddWithEditModalForm = (props: any) => {
    const { type, addUser, getData, getUserById } = props;
    const [messageApi, contextHolder] = message.useMessage();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<any>({});
    const [form] = Form.useForm();

    const getDetail = async () => {
        const formData = await getUserById();
        form.setFieldsValue(formData);
        setFormData(formData);
    };

    const beforeUpload = (file: FileType) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    };

    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );

    const handleChange: UploadProps['onChange'] = (info) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            setLoading(false);
            form.setFieldValue('avatar', info?.file?.response?.data);
        }
    };

    return (
        <>
            {contextHolder}
            <ModalForm
                form={form}
                title='新增'
                trigger={
                    <Button
                        type={type === 'add' ? 'primary' : 'link'}
                        onClick={() => {
                            if (type === 'add') return;
                            getDetail();
                        }}
                    >
                        {type === 'add' ? '新增' : '编辑'}
                    </Button>}
                submitTimeout={1000}
                modalProps={{
                    destroyOnHidden: true,
                }}
                onFinish={async (values) => {
                    const res = await addUser(values);
                    if (res?.success) {
                        messageApi.success(res?.message);
                        getData({ currentPage: 1, pageSize: 10 });
                        return true;
                    }
                    messageApi.error(res?.message);
                    return false;
                }}
            >
                <ProFormText
                    name='name'
                    label='姓名'
                    rules={[{ required: true, message: '请输入姓名' }]}
                />
                <Form.Item
                    name="avatar"
                    label="头像"
                    rules={[{ required: true, message: '请上传头像' }]}
                >
                    <Upload
                        name="file"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        action="/api/test/upload"
                        headers={{
                            Token: localStorage.getItem('app_token') ?? ''
                        }}
                        beforeUpload={beforeUpload}
                        onChange={handleChange}
                    >
                        {form.getFieldValue("avatar") || formData?.avatar ? <img src={form.getFieldValue("avatar")} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                    </Upload>
                </Form.Item>

                <ProFormSelect
                    rules={[{ required: true, message: '请选择性别' }]}
                    name='gender'
                    label='性别'
                    options={[
                        {
                            label: '男',
                            value: 1
                        },
                        {
                            label: '女',
                            value: 0
                        }

                    ]}
                />
                <ProFormSelect
                    rules={[{ required: true, message: '请输入年级' }]}

                    name='grade'
                    label='年级'
                    options={[
                        {
                            label: '一年级',
                            value: 1
                        },
                        {
                            label: '二年级',
                            value: 2
                        },
                        {
                            label: '三年级',
                            value: 3
                        },
                        {
                            label: '四年级',
                            value: 4
                        },
                        {
                            label: '五年级',
                            value: 5
                        },
                        {
                            label: '六年级',
                            value: 6
                        },

                    ]}
                />
                <ProFormDigit
                    rules={[{ required: true, message: '请输入年龄' }]}
                    name='age'
                    label='年龄'
                />
                <ProFormDigit
                    rules={[{ required: true, message: '请输入分数' }]}
                    name='score'
                    label='分数'
                />

            </ModalForm>
        </>
    )
}

export default AddWithEditModalForm;