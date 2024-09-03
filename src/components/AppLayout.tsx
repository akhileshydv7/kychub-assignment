/* eslint-disable @typescript-eslint/no-explicit-any */
import { Layout, Menu, message } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const AppLayout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const productData = useSelector((store: any) => store.products.products);

    const items: any = [
        { key: '/', label: "Products", onClick: () => navigate("/") },
        {
            key: 'compare', label: "Compare Products", onClick: () => {
                if (productData?.length > 1) {
                    navigate("/compare")
                }else message.warning("Please select at least 2 products to compare")
            }
        },
    ]
    const headerStyle: React.CSSProperties = {
        display: "flex",
        alignItems: "center",
        width: "100%",
        color: '#000',
        height: 40,
        padding: "0 20px",
        lineHeight: '64px',
        background: "#fff"
    };

    const contentStyle: React.CSSProperties = {
        textAlign: 'center',
        minHeight: 120,
        lineHeight: '120px',
    };

    const siderStyle: React.CSSProperties = {
        textAlign: 'center',
        lineHeight: '120px',
    };

    const layoutStyle: React.CSSProperties = {
        height: "100vh"
    };
    return (
        <>
            <Layout style={layoutStyle}>
                <Sider width="15%" style={siderStyle}>
                    <Menu
                        // defaultSelectedKeys={['/']}
                        selectedKeys={[location.pathname.split("/")?.[1] || "/"]}
                        defaultOpenKeys={['sub1']}
                        mode="inline"
                        items={items}
                        style={{ height: "100%" }}
                    />
                </Sider>
                <Layout>
                    <Header style={headerStyle}><span>KYCHUB</span></Header>
                    <Content style={contentStyle}>
                        <div style={{ height: "calc(100vh - 40px)", overflow: "auto" }} >
                            <Outlet />
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </>
    );
};

export default AppLayout;