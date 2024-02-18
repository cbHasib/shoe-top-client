import React from "react";
import { DashboardOutlined, ShopOutlined, SettingOutlined } from '@ant-design/icons';
import ProductInventory from "../pages/admin/productManagement/ProductInventory";
import BuyerDashboard from "../pages/buyer/buyerDashboard/BuyerDashboard";
import ServiceRequest from "../pages/buyer/buyerServiceRequest/ServiceRequest";
import ProductVerification from "../pages/buyer/productVerification/ProductVerification";

export const buyerPaths = [
    {
        name: "Dashboard",
        path: "dashboard",
        key: "/buyer/dashboard",
        icon: React.createElement(DashboardOutlined),
        element: <BuyerDashboard />,
    },
    {
        // name: "Products",
        // key: "products",
        // icon: React.createElement(ShopOutlined),
        // children: [
        //     {
        name: "Product Inventory",
        path: "products",
        key: "/buyer/products",
        icon: React.createElement(ShopOutlined),
        element: <ProductInventory />,
        //     },
        // ]
    },
    {
        name: "Service Requests",
        path: "service-requests",
        key: "/buyer/service-requests",
        icon: React.createElement(SettingOutlined),
        element: <ServiceRequest />,
    },
    {
        name: "Product Verification",
        path: "product-verification",
        key: "/buyer/product-verification",
        icon: React.createElement(SettingOutlined),
        element: <ProductVerification />,
    }
]