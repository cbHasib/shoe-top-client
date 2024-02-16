import AdminDashboard from "../pages/admin/adminDashboard/AdminDashboard";
import React from "react";
import { DashboardOutlined , ShopOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import ProductInventory from "../pages/admin/productManagement/ProductInventory";
import SalesHistory from "../pages/admin/salesManagement/SalesHistory";


export const sellerPaths = [
    {
        name: "Dashboard",
        path: "dashboard",
        key: "/seller/dashboard",
        icon: React.createElement(DashboardOutlined),
        element: <AdminDashboard />,
    },
    {
        name: "Products Management",
        key: "products-management",
        icon: React.createElement(ShopOutlined),
        children: [
            {
                name: "Product Inventory",
                path: "product-inventory",
                key: "/seller/product-inventory",
                element: <ProductInventory />,
            },
        ]
    },
    {
        name: "Sales Management",
        key: "sales-management",
        icon: React.createElement(ShoppingCartOutlined),
        children: [
            {
                name: "Sales History",
                path: "sales-history",
                key: "/seller/sales-history",
                element: <SalesHistory />,
            },

        ]
    },
]