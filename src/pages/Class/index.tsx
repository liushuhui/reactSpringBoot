import { ProColumns, ProTable } from "@ant-design/pro-components";
import ClassModal from "./component/ClassModal";
import { queryClass } from "@/api/class";
import { omit } from "es-toolkit/object"
import { useRequest } from "ahooks";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const Class = () => {

    const { refresh } = useRequest(queryClass, { manual: true })
    const navigate = useNavigate();

    const columns: ProColumns<any>[] = [
        {
            title: '班级ID',
            dataIndex: 'classId',
            key: 'classId',
        },
        {
            title: '班级名称',
            dataIndex: 'className',
            key: 'className',
        },
        {
            title: '班主任',
            dataIndex: 'headerTeacherName',
            key: 'headerTeacherName',
        },
        {
            title: '学生',
            dataIndex: 'students',
            key: 'students',
            align: 'center',
            render: () => (
                <Button type="link">查看学生</Button>
            )
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime',
            valueType: 'dateRange',
            render: (_, record) => (
                <div>{record.createTime}</div>
            )
        },
        {
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            fixed: 'right',
            align: 'center',
            render: (_, record) => (
                // <ClassModal refresh={refresh} record={record} />
                <div className="flex gap-8">
                    <Button type="link" onClick={() => navigate(`/user/class/studentManage/${record?.classId}`)}>管理学生</Button>
                </div>
            )
        }
    ];
    return (
        <ProTable
            columns={columns}
            rowKey='classId'
            scroll={{ x: 'max-content' }}
            toolBarRender={() => [
                <ClassModal refresh={refresh} />
            ]}

            request={async (params) => {
                const { current, pageSize, createTime } = params;
                const timeParams = { startTime: createTime?.[0], endTime: createTime?.[1] };
                const newParams = omit(params, ['current', 'createTime']);
                const res: any = await queryClass({ currentPage: current, pageSize: pageSize, ...timeParams, ...newParams });
                return {
                    data: res.data?.list,
                    total: res.data?.total,
                    success: res.success
                }
            }}
        />
    )
}

export default Class;