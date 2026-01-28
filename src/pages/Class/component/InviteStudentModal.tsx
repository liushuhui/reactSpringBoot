import { addStudentToClass, deleteClassStudent, queryStudent } from "@/api/class";
import { ProColumns, ProTable } from "@ant-design/pro-components";
import { useRequest } from "ahooks";
import { Button, Modal, TableProps, message } from "antd";
import { Key } from "antd/es/table/interface";
import { useState } from "react";

interface InviteStudentModalProps {
    classId: string;
}

const InviteStudentModal = (props: InviteStudentModalProps) => {
    const { classId } = props;
    const [visible, setVisible] = useState(false);
    const [rowSelectionList, setRowSelectionList] = useState<Key[]>([]);

    const { data, run: queryStudentRun, refresh } = useRequest(queryStudent, { manual: true });


    const { run, loading } = useRequest(addStudentToClass, {
        manual: true,
        onSuccess: (res) => {
            if (res?.success) {
                message.success('邀请成功');
                setRowSelectionList([]);
                refresh();
            }
        }
    })


    const { run: deletClassStudentRun, loading: deletClassStudentLoading } = useRequest(deleteClassStudent, {
        manual: true,
        onSuccess: (res) => {
            if (res?.success) {
                refresh();
                message.success('删除成功');
            }
        }
    })

    const rowSelection: TableProps<any>['rowSelection'] = {
        selectedRowKeys: rowSelectionList,
        onChange: (selectedRowKeys: React.Key[]) => {
            setRowSelectionList(selectedRowKeys);
        },
        getCheckboxProps: (record: any) => ({
            disabled: record.invited === '1',
        }),
    };
    const addStudentToClassHandle = () => {
        run({ classId, studentIds: rowSelectionList, invited: '1' })
    }

    const kickOut = (params: { classId: string, studentId: string }) => {
        deletClassStudentRun(params)
    }

    const columns: ProColumns[] = [
        {
            title: "学生ID",
            dataIndex: "id",
            key: "id",
            align: 'center',
        },
        {
            title: "学生姓名",
            dataIndex: "name",
            key: "name",
            align: 'center',
        },
        {
            title: "所属班级",
            dataIndex: "className",
            key: "className",
            align: 'center',
        },
        {
            title: "操作",
            dataIndex: "action",
            key: "action",
            align: 'center',
            render: (_, record) => (
                <Button loading={deletClassStudentLoading} type="link" onClick={() => kickOut({ classId, studentId: record.id })}>踢出</Button>
            )
        }
    ]

    return (
        <>
            <Button type="link" onClick={() => {
                queryStudentRun({ classId, currentPage: 1, pageSize: 10 })
                setVisible(true);
            }}>邀请学生</Button>
            <Modal
                destroyOnHidden
                title="管理学生"
                open={visible}
                onCancel={() => setVisible(false)}
                footer={null}
                width={800}
            >
                <ProTable
                    bordered
                    rowKey="id"
                    search={false}
                    dataSource={data?.data?.list ?? []}
                    pagination={{
                        onChange: (currentPage, pageSize) => {
                            queryStudentRun({
                                classId,
                                currentPage,
                                pageSize,
                            });
                        }
                    }}
                    tableAlertRender={false}
                    toolBarRender={() => [
                        <Button
                            disabled={!rowSelectionList.length}
                            type="primary"
                            key="add"
                            variant="solid"
                            color="cyan"
                            loading={loading}
                            onClick={addStudentToClassHandle}
                        >
                            邀请学生
                        </Button>
                    ]}
                    rowSelection={rowSelection}
                    columns={columns}
                />
            </Modal>
        </>
    )
}

export default InviteStudentModal;