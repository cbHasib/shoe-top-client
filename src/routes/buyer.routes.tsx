import React from "react";
import { DashboardOutlined, ShopOutlined } from '@ant-design/icons';
import ProductInventory from "../pages/admin/productManagement/ProductInventory";
import BuyerDashboard from "../pages/buyer/buyerDashboard/BuyerDashboard";

export const buyerPaths = [
    {
        name: "Dashboard",
        path: "dashboard",
        key: "/buyer/dashboard",
        icon: React.createElement(DashboardOutlined),
        element: <BuyerDashboard />,
    },
    {
        name: "Products",
        key: "products",
        icon: React.createElement(ShopOutlined),
        children: [
            {
                name: "Product Inventory",
                path: "products",
                key: "/buyer/products",
                element: <ProductInventory />,
            },
        ]
    },
]