import { Avatar, Button, Card, Divider, Dropdown, Flex, Layout, Tag } from "antd";
import MenuComponent from "./MenuComponent";
import { Outlet } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import userInfoStore from "@/store/userInfoStore";
import { RoleEnum } from "@/const";
const { Header, Footer, Sider, Content } = Layout;
const headerStyle: React.CSSProperties = {
    backgroundColor: 'var(--ant-primary-color)',
    padding: '0 16px'
};

const contentStyle: React.CSSProperties = {
    backgroundColor: '#fff',
};

const siderStyle: React.CSSProperties = {
    textAlign: 'center',
    lineHeight: '120px',
    // color: '#fff',
    // backgroundColor: '#1677ff',
};

const footerStyle: React.CSSProperties = {
    backgroundColor: 'var(--ant-primary-color)'
};

const layoutStyle = {
    borderRadius: 8,
    height: '100vh'
};
const LayoutPage = () => {
    const { userInfoData } = userInfoStore.getState();
    console.log('userInfo', userInfoStore.getState().userInfoData)

    return (
        <Layout style={layoutStyle}>
            <Header style={headerStyle}>
                <Flex align="center" justify="space-between" style={{ height: '100%' }}>
                    <img src='/logo.png' alt='logo' height={32} width={32} />
                    <Dropdown
                        trigger={['click']}
                        popupRender={() => {
                            return (
                                <Card className="flex flex-col gap-2 w-[200px]">
                                    <Flex gap={8}>
                                        <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                                        <div className="flex flex-col gap-2">
                                            <Tag variant="solid" color='#f50'>{userInfoData?.username}</Tag>
                                            <Tag variant="solid" color='#108ee9'>{RoleEnum[userInfoData?.role]}</Tag>
                                        </div>
                                    </Flex>
                                    <Divider />
                                    <div className="flex justify-between">
                                        <div className="text-[#9d00ff]">修改密码</div>
                                        <div className="text-[blue]">退出登录</div>
                                    </div>
                                </Card>
                            );
                        }}>
                        <Flex align="center" gap={8}>
                            <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                        </Flex>
                    </Dropdown>
                </Flex>
            </Header>
            <Layout>
                <Sider style={siderStyle}>
                    <MenuComponent />
                </Sider>
                <Content style={contentStyle}>
                    <Outlet />
                </Content>
            </Layout>
            <Footer style={footerStyle}>Footer</Footer>
        </Layout>
    )
}

export default LayoutPage;