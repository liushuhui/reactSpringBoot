import IconSelect from "@/components/IconSelect";
import menuStore from "@/store/menuStore";
import { ModalForm, ProFormDigit, ProFormRadio, ProFormSelect, ProFormSwitch, ProFormText } from "@ant-design/pro-components";
import { Button, Form, message } from "antd";

interface MenuModalProps {
    type?: 'add' | 'edit';
    parentMenuData: any[];
    dictData: Record<string, any[]>
    addMenu: (data: any) => Promise<any>;
    getMenuById?: () => Promise<any>;
    record?: any;
}
const MenuModal = (props: MenuModalProps) => {
    const {
        type = 'add',
        parentMenuData,
        dictData,
        getMenuById,
        addMenu,
    } = props;
    const [messageApi, contextHolder] = message.useMessage();
    const [form] = Form.useForm();

    const { fetchMenu, menuData } = menuStore();


    const getDetail = async () => {
        if (!getMenuById) return;
        const { data } = await getMenuById();
        form.setFieldsValue({ ...data, enable: data.enable ? true : false });
    };

    return (
        <>
            {contextHolder}
            <ModalForm
                form={form}
                initialValues={{
                    enable: '1',
                    menuType: '01'
                }}
                title={type === 'add' ? '新增' : '编辑'}
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
                    destroyOnClose: true
                }}
                onFinish={async (values) => {
                    const formData = { ...values, enable: values.enable ? '1' : '0' }
                    const res: any = await addMenu(formData);
                    if (res?.success) {
                        messageApi.success(res?.message);
                        fetchMenu();
                        return true;
                    }
                    messageApi.error(res?.message);
                    return false;
                }}
            >
                <ProFormText
                    name='name'
                    label='菜单名称'
                    rules={[{ required: true, message: '菜单名称' }]}
                />
                <ProFormText
                    name='permissionCode'
                    label='权限标识'
                />
                <ProFormRadio.Group
                    name='menuType'
                    label='菜单类型'
                    options={dictData?.menuType}
                />
                <ProFormSwitch
                    name='enable'
                    label='是否启用'
                />

                <ProFormSelect
                    rules={[{ required: true, message: '请选择父级菜单' }]}
                    name='parentId'
                    label='父级菜单'
                    options={parentMenuData}
                />
                <ProFormText
                    name='url'
                    label='路由地址'
                    rules={[{ required: true, message: '路由地址' }]}
                />
                <ProFormDigit
                    name='sort'
                    label='排序'
                    rules={[{ required: true, message: '排序' }]}
                />
                <Form.Item
                    name='icon'
                    label='菜单图标'
                    rules={[{ required: true, message: '菜单图标' }]}
                >
                    <IconSelect />
                </Form.Item>

            </ModalForm>
        </>
    );
};

export default MenuModal;