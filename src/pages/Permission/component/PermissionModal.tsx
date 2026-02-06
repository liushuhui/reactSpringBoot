import { ModalForm, ProFormSelect, ProFormText } from "@ant-design/pro-components";
import { Button, Form, message } from "antd";
import dictStore from "@/store/dictStore";
import MenuTreeSelect from "./MenuTreeSelect";
import { addRole, getRoles, updateRole } from "@/api/role";
import { useRequest } from "ahooks";
import { useEffect } from "react";

const PermissionModal = (props: any) => {
    const { type = 'add', record, refresh } = props;

    const [form] = Form.useForm();

    const { dictData } = dictStore();

    const { run, loading } = useRequest(type === 'add' ? addRole : updateRole, {
        manual: true,
        onSuccess: async (res) => {
            if (res.success) {
                message.success('成功');
                refresh();
                return;
            } message.error(res.message);
        },
    });

    useEffect(() => {
        if (type === 'add') return;
        form.setFieldsValue(record);
    }, [record])

    return (
        <ModalForm
            form={form}
            title={type === 'add' ? '新增' : '编辑'}
            trigger={
                <Button
                    loading={loading}
                    type={type === 'add' ? 'primary' : 'link'}
                >
                    {type === 'add' ? '新增' : '编辑'}
                </Button>}
            submitTimeout={1000}
            modalProps={{
                destroyOnHidden: true,
            }}
            onFinish={async (values) => {
                const params = { ...values, roleId: type === 'add' ? undefined : record.roleId }
                run(params);
                return true;
            }}
        >
            <ProFormSelect
                label="角色名称"
                name="roleName"
                options={dictData?.role ?? []}
                rules={[{ required: true, message: '请输入角色名称' }]}
            />
            <Form.Item
                label="权限"
                name="menuIds"
                rules={[{ required: true, message: '请选择权限' }]}
            >
                <MenuTreeSelect />
            </Form.Item>
        </ModalForm>
    )
}

export default PermissionModal;