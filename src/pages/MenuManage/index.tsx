import { useEffect, useMemo, useState } from "react";
import { Button, Flex, Space, Table, TableColumnProps } from "antd";
import menuStore from "@/store/menuStore";
import MenuModal from "./MenuModal";

import './index.less'
import { useRequest } from "ahooks";
import { addMenu, getMenu, getMenuById, updateMenu } from "@/api/menu";
import dayjs from "dayjs";
import IconComponent from "@/components/IconComponent";
const MenuManage = () => {
    const { menuData } = menuStore();
    const [dataSource, setDataSource] = useState([]);

    const { data }: any = useRequest(getMenu);
    const addMenuFn = async (type: string, values: any, id?: string) => {
        const res = type === 'add' ? await addMenu(values) : await updateMenu({ ...values, id });
        return res;
    }
    const parentMenuData = useMemo(() => {
        const originData = data?.data?.list?.filter((item: any) => item.parentId === '0')?.map((im: any) => ({
            value: im.id,
            label: im.name,
        }))
        return [{ value: 0, label: '本身' }, ...originData ?? []]
    }, [data])

    const columns: TableColumnProps<any>[] = [
        {
            title: '菜单名称',
            key: 'name',
            dataIndex: 'name',
            width: 200
        },
        {
            title: '菜单路径',
            key: 'url',
            dataIndex: 'url'
        },
        {
            title: '菜单图标',
            key: 'icon',
            dataIndex: 'icon',
            render: (_: any, record: any) => <IconComponent icon={record?.icon} />
        },
        {
            title: '启用状态',
            key: 'enable',
            dataIndex: 'enable',
            render: (text: string) => text === '1' ? '启用' : '禁用'
        },
        {
            title: '父级菜单',
            key: 'parentId',
            dataIndex: 'parentId',
            render: (text: string) => parentMenuData?.find(item => item.value === text)?.label
        },
        {
            title: '菜单顺序',
            key: 'sort',
            dataIndex: 'sort'
        },
        {
            title: '菜单状态',
            key: 'enable',
            dataIndex: 'enable'

        },
        {
            title: '创建时间',
            key: 'createTime',
            dataIndex: 'createTime',
            render: (text) => (
                <span>{dayjs(text).format('YYYY-MM-DD HH:mm:ss')}</span>
            )

        },
        {
            title: '更新时间',
            key: 'updateTime',
            dataIndex: 'updateTime',
            render: (text) => (
                <span>{dayjs(text).format('YYYY-MM-DD HH:mm:ss')}</span>
            )
        },
        {
            title: 'Action',
            width: 150,
            fixed: 'right',
            align: 'center',
            render: (record: any) => (
                <Space>
                    <MenuModal
                        type='edit'
                        addMenu={(values) => addMenuFn('edit', values, record?.id)}
                        record={record}
                        getMenuById={async () => await getMenuById({ id: record?.id })}
                        parentMenuData={parentMenuData}
                    />
                    {/* <Button
                        type='link'
                    //   onClick={() => deleteUser(record.id)}
                    >
                        编辑
                    </Button> */}
                    <Button
                        type='link'
                        danger
                    //   onClick={() => deleteUser(record.id)}
                    >
                        删除
                    </Button>
                </Space>
            ),
        },
    ]


    const cleanTreeData: any = (data: any) => {
        return data?.map((item: any) => ({
            ...item,
            children: item?.children?.length > 0 ? cleanTreeData(item?.children) : undefined
        }));
    };

    useEffect(() => {
        setDataSource(cleanTreeData(menuData?.data));
    }, [menuData])

    return (
        <div className="menu-manage">
            <Flex justify="end">
                <MenuModal
                    parentMenuData={parentMenuData}
                    addMenu={(values) => addMenuFn('add', values)}
                />
            </Flex>
            <Table
                rowKey='id'
                dataSource={dataSource}
                className="menu-table"
                columns={columns}
                scroll={{ x: 'max-content' }}
            />
        </div>
    )
}

export default MenuManage;