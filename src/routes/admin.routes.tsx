import AdminDashboard from "../pages/admin/AdminDashboard";
import AcademicSemester from "../pages/admin/academicManagement/AcademicSemester";
import React from "react";
import { DashboardOutlined , ShopOutlined, ShoppingCartOutlined } from '@ant-design/icons';


export const adminPaths = [
    {
        name: "Dashboard",
        path: "dashboard",
        icon: React.createElement(DashboardOutlined),
        element: <AdminDashboard />,
    },
    {
        name: "Products Management",
        icon: React.createElement(ShopOutlined),
        children: [
            {
                name: "Create Product",
                path: "create-product",
                element: <AcademicSemester />,
            },
        ]
    },
    {
        name: "Sales Management",
        icon: React.createElement(ShoppingCartOutlined),
        children: [
            {
                name: "Create Sale",
                path: "create-sale",
                element: <AcademicSemester />,
            },

        ]
    },
]