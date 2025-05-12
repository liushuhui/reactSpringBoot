import { Avatar, Flex, Layout } from "antd";
import MenuComponent from "./MenuComponent";
import { Outlet } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
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
    color: '#fff',
    backgroundColor: '#1677ff',
};

const footerStyle: React.CSSProperties = {
    backgroundColor: 'var(--ant-primary-color)'
};

const layoutStyle = {
    borderRadius: 8,
    height: '100vh'
};
const LayoutPage = () => {
    return (
        <Layout style={layoutStyle}>
            <Header style={headerStyle}>
                <Flex align="center" justify="space-between" style={{height: '100%'}}>
                    <img src='/logo.png' alt='logo' height={32} width={32}/>
                    <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
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