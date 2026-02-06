import { ProColumns, ProTable } from "@ant-design/pro-components"
import PermissionModal from "./component/PermissionModal";
import { getRoles } from "@/api/role";
import { Tag } from "antd";
import dictStore from "@/store/dictStore";
import { getDictLabel } from "@/utils";
import { useRequest } from "ahooks";

const Permission = () => {

    const { dictData } = dictStore();

    const { refresh } = useRequest(getRoles, {
        manual: true,
    });

    const columns: ProColumns[] = [
        {
            title: '角色编号',
            dataIndex: 'roleId',
            key: 'roleId',
        },
        {
            title: '角色名称',
            dataIndex: 'roleName',
            key: 'roleName',
            render: (_, record) => getDictLabel(dictData, 'role', record.roleName),
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',

        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime',
        },
        {
            title: '操作',
            key: 'action',
            valueType: 'option',
            render: (_, record) => [
                <PermissionModal refresh={refresh} type="edit" record={record} />
            ],
        },
    ]

    return (
        <ProTable
            columns={columns}
            search={false}
            request={async () => {
                const res = await getRoles();
                return {
                    data: res?.data?.list,
                    total: res?.data?.total,
                };
            }}
            toolBarRender={() => [
                <PermissionModal refresh={refresh}/>
            ]}

        />
    )
}

export default Permission;