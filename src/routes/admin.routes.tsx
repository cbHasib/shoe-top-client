import AdminDashboard from "../pages/admin/adminDashboard/AdminDashboard";
import React from "react";
import { DashboardOutlined , ShopOutlined, ShoppingCartOutlined, SettingOutlined } from '@ant-design/icons';
import ProductInventory from "../pages/admin/productManagement/ProductInventory";
import SalesHistory from "../pages/admin/salesManagement/SalesHistory";
import ServiceRequest from "../pages/buyer/buyerServiceRequest/ServiceRequest";


export const adminPaths = [
    {
        name: "Dashboard",
        path: "dashboard",
        key: "/admin/dashboard",
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
                key: "/admin/product-inventory",
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
                key: "/admin/sales-history",
                element: <SalesHistory />,
            },

        ]
    },
    {
        name: "Service Requests",
        path: "service-requests",
        key: "/admin/service-requests",
        icon: React.createElement(SettingOutlined),
        element: <ServiceRequest />,
    }
]