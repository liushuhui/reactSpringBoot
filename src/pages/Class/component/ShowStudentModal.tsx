import { queryClassStudent } from "@/api/class";
import { ProColumns, ProTable } from "@ant-design/pro-components";
import { Button, Modal } from "antd";
import { useState } from "react";

interface ShowStudentModalProps {
    classId: string;
}
const ShowStudentModal = (props: ShowStudentModalProps) => {
    const { classId } = props;
    const [open, setOpen] = useState(false);
    const columns: ProColumns[] = [
        {
            title: '学生ID',
            dataIndex: 'studentId',
            key: 'studentId',
        },
        {
            title: '学生名称',
            dataIndex: 'studentName',
            key: 'studentName',
        },
        // {
        //     title: '班主任'
        // }

    ]

    return (
        <>
            <Button type="link" onClick={() => setOpen(true)}>查看学生</Button>
            <Modal
                destroyOnHidden
                title="查看学生"
                open={open}
                width={800}
                onCancel={() => setOpen(false)}
                footer={null}
            >
                <ProTable
                    search={false}
                    toolBarRender={false}
                    columns={columns}
                    request={async (params) => {
                        const res = await queryClassStudent({
                            classId,
                            ...params,
                        });
                        return {
                            data: res?.data?.list,
                            total: res?.data?.total,
                        };
                    }}
                    rowKey="id"
                />
            </Modal>
        </>
    );
}

export default ShowStudentModal;