import menuStore from "@/store/menuStore";
import { Tree } from "antd";
import { Key } from "react";

const MenuTreeSelect = (props: any) => {

    const { value, onChange } = props;

    const { menuData } = menuStore();

    return (
        <Tree
            checkable
            showLine
            key='id'
            checkedKeys={value}
            onCheck={(checkedKeys: any) => onChange(checkedKeys)}
            fieldNames={{ title: "name", key: "id" }}
            treeData={menuData?.data ?? []}
        />
    )

}

export default MenuTreeSelect;