import { MenuProps } from "antd"
import { TMenuItems, TUserPaths } from "../types";
import { NavLink } from "react-router-dom";


export const sidebarItemsGenerator = (items: TUserPaths[], role: 'admin' | 'user') => {

    const sidebarItems: MenuProps['items'] = items.reduce((acc: TMenuItems[], item) => {

        if (item.path && item.name) {
            acc.push({
                key: item.name,
                ...(item.icon && { icon: item.icon }),
                label: <NavLink to={`/${role}/${item.path}`}>{item.name}</NavLink>,
            })
        }

        if (item.children) {
            const children = item.children.map(child => {
                return {
                    key: child.name,
                    ...(child.icon && { icon: child.icon }),
                    label: <NavLink to={`/${role}/${child.path}`}>{child.name}</NavLink>,
                }
            })

            acc.push({
                key: item.name,
                label: item.name,
                ...(item.icon && { icon: item.icon }),
                children: children
            })
        }

        return acc;

    }, [])

    return sidebarItems;

}