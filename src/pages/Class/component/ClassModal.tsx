import { addClass, getTeacherList } from "@/api/class"
import { ModalForm, ProFormSelect, ProFormText } from "@ant-design/pro-components"
import { useRequest } from "ahooks"
import { Button, message } from "antd"


interface IProps {
    refresh: () => void
}
const ClassModal = (props: IProps) => {

    const { refresh } = props;

    const { run } = useRequest(addClass, {
        manual: true,
        onSuccess: (res) => {
            console.log('ress', res)
            if (res.success) {
                message.success('添加成功');
                refresh()
                return;
            } message.error(res.message);
        }
    })
    return (
        <ModalForm
            title="新增"
            trigger={<Button type="primary" key="add">添加</Button>}
            onFinish={async (values) => {
                run(values);
            }}
        >
            <ProFormText
                label="班级名称"
                name="className"
                placeholder="请输入班级名称"
                rules={[{ required: true, message: '请输入班级名称' }]}
            />
            <ProFormSelect
                label="班主任"
                name="headerTeacherId"
                placeholder="请选择班主任"
                rules={[{ required: true, message: '请选择班主任' }]}
                request={async () => {
                    const res = await getTeacherList();
                    return res?.data?.map((item: { id: string, name: string }) => (
                        { label: item.name, value: item.id }
                    ))
                }}
            />
            {/* <ProFormText label="任课教师" name="courseTeacherId" /> */}
        </ModalForm>
    )
}

export default ClassModal