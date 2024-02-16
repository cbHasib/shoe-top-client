import React from "react";
import { ShopOutlined } from '@ant-design/icons';
import ProductInventory from "../pages/admin/productManagement/ProductInventory";

export const buyerPaths = [
    // {
    //     name: "Dashboard",
    //     path: "dashboard",
    //     key: "/admin/dashboard",
    //     icon: React.createElement(DashboardOutlined),
    //     element: <AdminDashboard />,
    // },
    {
        name: "Products",
        key: "products",
        icon: React.createElement(ShopOutlined),
        children: [
            {
                name: "Product Inventory",
                path: "product-inventory",
                key: "/buyer/products",
                element: <ProductInventory />,
            },
        ]
    },
]