import { deleteTeacherByIds, getTeachers, updateTeacher } from "@/api/teacher";
import { useRequest } from "ahooks";
import { Button, Card, Modal, Table, message } from "antd";
import { ColumnsType } from "antd/es/table";
import AddWithEditFormModal from "./AddWithEditFormModal";

const Teacher = () => {
  const [modal, modalContextHolder] = Modal.useModal();
  const [messageApi, contextHolder] = message.useMessage();

  const { data, run } = useRequest(getTeachers);
  const { run: editRun } = useRequest(updateTeacher);

  const deleteTeacher = (ids: string) => {
    modal.confirm({
      title: '确认删除？',
      onOk: async () => {
        const res: any = await deleteTeacherByIds({ ids: [ids] });
        if (res?.success) {
          messageApi.success(res?.data);
          run();
          return;
        }
        messageApi.error(res?.data);
      }
    })
  }

  const columns: ColumnsType<Record<string, any>> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '班级',
      dataIndex: 'className',
      key: 'className',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      align: 'center',
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
      align: 'center',
      render: (text: string) => text ? text : '-',
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      align: 'center',
      render: (_, record) => (
        <div>
          <AddWithEditFormModal
            type='edit'
          />
          <Button type='link' danger onClick={() => deleteTeacher(record.id)}>
            删除
          </Button>
        </div>
      )
    }
  ]
  return (
    <Card>
      {contextHolder}
      {modalContextHolder}
      <Table
        bordered
        scroll={{ x: 'max-content' }}
        rowKey='id'
        className='custable'
        columns={columns}
        dataSource={data?.data?.list || []}
        // rowSelection={rowSelection}
        onChange={(pagination) => {
          const { current, pageSize } = pagination;
          run({ currentPage: current, pageSize: pageSize })
        }}
        pagination={{
          total: data?.data?.total,
          showSizeChanger: true,
          current: data?.data?.currentPage,
          pageSize: data?.data?.pageSize,
          showTotal: (total, range) => `${range[0]}-${range[1]} 条，共 ${total} 条`
        }}
      />
    </Card>
  );
};

export default Teacher;