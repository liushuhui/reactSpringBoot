import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { Avatar, Button, Flex, message, Modal, Space, Table, TableProps, Upload } from 'antd';
import { useSetState } from 'ahooks';
import './index.less';
import AddWithEditModalForm from '@/components/AddWithEditModalForm';

function Student() {
  const [data, setData] = useSetState({
    list: [],
    total: 0,
    currentPage: 1,
    pageSize: 10
  });

  const [rowSelectionList, setRowSelectionList] = useState<number[]>([]);

  const [modal, modalContextHolder] = Modal.useModal();

  const [messageApi, contextHolder] = message.useMessage();

  const rowSelection: TableProps<any>['rowSelection'] = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => {
      setRowSelectionList(selectedRows.map(item => item.id));
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    // getCheckboxProps: (record: any) => ({
    //   disabled: record.name === 'Disabled User', // Column configuration not to be checked
    //   name: record.name,
    // }),
  };

  const getData = useCallback(async (params: any) => {
    const res = await axios.get('/api/test/queryList', {
      params
    });
    setData({ list: res.data?.data?.list, total: res.data?.data?.total });
  }, [setData])

  const addUser = async (type: string, values: any, id?: number) => {
    const res = await axios.post(`/api/test/${type === 'add' ? 'addUser' : 'updateUser'}`, { ...values, id });
    return res?.data;
  }

  const deleteUser = async (id: number) => {
    modal.confirm({
      title: '确认删除？',
      onOk: async () => {
        const res = await axios.delete('/api/test/deleteUserById', { params: { id } });
        if (res?.data?.success) {
          messageApi.success(res?.data?.data);
          setData({ currentPage: 1, pageSize: 10 });
          getData({ currentPage: 1, pageSize: 10 });
          return;
        }
        messageApi.error(res?.data?.data);
      }
    })

  }
  const deleteUsers = (ids: number[]) => {
    modal.confirm({
      title: '确认删除？',
      onOk: async () => {
        const res = await axios.post('/api/test/deleteUserByIds', { ids });
        if (res?.data?.success) {
          messageApi.success(res?.data?.data);
          setData({ currentPage: 1, pageSize: 10 });
          getData({ currentPage: 1, pageSize: 10 });
          return;
        }
        messageApi.error(res?.data?.data);
      }
    })
  }

  const getUserById = async (id: number) => {
    const res = await axios.get(`/api/test/queryUserById?id=${id}`);
    return res?.data?.data;
  }

  const exportExcel = async () => {
    const res = await axios.get(`/api/test/exportExcel`, { responseType: 'blob' });
    const link = document.createElement("a");
    let blob = new Blob([res.data]);
    link.style.display = "none";
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", decodeURI(res?.headers?.['content-disposition']?.split("filename=")[1]));
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    console.log(res);
  }

  const columns: any = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      // width: 200,
    },
    {
      title: '头像',
      dataIndex: 'avatar',
      key: 'avatar',
      align: 'center',
      // width: 200,
      render: (text: string) => <Avatar src={text} />
    },
    {
      title: '性别',
      dataIndex: 'gender',
      key: 'gender',
      align: 'center',
    },
    {
      title: '年级',
      dataIndex: 'grade',
      key: 'grade',
      align: 'center',
    },
    {
      title: '分数',
      dataIndex: 'score',
      key: 'score',
      align: 'center',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
      align: 'center',
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
    },
    {
      title: 'Action',
      width: 150,
      fixed: 'right',
      align: 'center',
      render: (record: any) => (
        <Space>
          <AddWithEditModalForm
            type='edit'
            getData={getData}
            addUser={(values: any) => addUser('edit', values, record?.id)}
            getUserById={(id: any) => getUserById(record?.id)}
          />
          <Button
            type='link'
            danger
            onClick={() => deleteUser(record.id)}
          >
            删除
          </Button>
        </Space>
      ),
    },
  ];

 

  useEffect(() => {
    getData({ currentPage: 1, pageSize: 10 });
  }, [])

  return (

    <div className='pages'>
      {contextHolder}
      {modalContextHolder}
      <Flex gap={24} justify='end'>
        <Button type='primary' onClick={exportExcel}>
          导出
        </Button>
        <Upload
          name='file'
          showUploadList={false}
          action='/api/test/importExcel'
          onChange={(info) => {
            if (info.file.status === 'done') {
              if (info?.file?.response?.success) {
                messageApi.success(info?.file?.response?.data);
                getData({ currentPage: 1, pageSize: 10 });
              } else {
                messageApi.error(info?.file?.response?.message);
              }
            }
          }}
        >
          <Button type='primary'>导入</Button>
        </Upload>
        <AddWithEditModalForm
          type='add'
          getData={getData}
          addUser={(values: any) => addUser('add', values)}
        />
        <Button
          danger
          type='primary'
          disabled={!rowSelectionList.length}
          onClick={() => deleteUsers(rowSelectionList)}
        >删除</Button>
      </Flex>
      <Table
        bordered
        scroll={{ x: 'max-content' }}
        rowKey='id'
        className='custable'
        columns={columns}
        dataSource={data?.list}
        rowSelection={rowSelection}
        onChange={(pagination) => {
          const { current, pageSize } = pagination;
          getData({ currentPage: current, pageSize: pageSize })
        }}
        pagination={{
          total: data?.total,
          showSizeChanger: true,
          current: data?.currentPage,
          pageSize: data?.pageSize,
          showTotal: (total, range) => `${range[0]}-${range[1]} 条，共 ${total} 条`
        }}
      />
    </div>
  );
}

export default Student;
