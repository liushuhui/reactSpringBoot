import { Menu, MenuProps } from "antd"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import menuStore from "@/store/menuStore";
import IconComponent from "../IconComponent";


const MenuComponent = () => {
    const { menuData } = menuStore();
    const [menuSource, setMenuSource] = useState([]);

    const navigate = useNavigate();

    const formatMenuItems = (data: any) => {
        return data?.map((item: any) => {
            return {
                key: item.url,
                label: item.name,
                icon: <IconComponent icon={item.icon} />,
                children: item?.children?.length > 0 ? formatMenuItems(item?.children) : undefined
            }
        });
    }

    const onClick: MenuProps['onClick'] = (e) => {
        navigate(e.key);
    };

    useEffect(() => {
        setMenuSource(formatMenuItems(menuData?.data));
    }, [menuData])

    return (
        <Menu
            onClick={onClick}
            style={{ height: '100%', overflow: 'auto' }}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            items={menuSource}

        />
    )
}

export default MenuComponent