import AdminDashboard from "../pages/admin/AdminDashboard";
import AcademicSemester from "../pages/admin/academicManagement/AcademicSemester";
import React from "react";
import { DashboardOutlined , ShopOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import CreateNewProduct from "../pages/admin/productManagement/CreateNewProduct";
import ProductInventory from "../pages/admin/productManagement/ProductInventory";
import UpdateProduct from "../pages/admin/productManagement/UpdateProduct";
import ViewProduct from "../pages/admin/productManagement/ViewProduct";


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
                name: "Create Product",
                path: "create-product",
                key: "create-product",
                element: <CreateNewProduct />,
            },
            {
                name: "Product Inventory",
                path: "product-inventory",
                key: "/admin/product-inventory",
                element: <ProductInventory />,
            },
            {
                name: "Update Product",
                path: "update-product",
                key: "update-product",
                element: <UpdateProduct />,
            },
            {
                name: "View Product",
                path: "view-product/:slug",
                key: "view-product",
                element: <ViewProduct />,
            }
        ]
    },
    {
        name: "Sales Management",
        key: "sales-management",
        icon: React.createElement(ShoppingCartOutlined),
        children: [
            {
                name: "Create Sale",
                path: "create-sale",
                key: "create-sale",
                element: <AcademicSemester />,
            },

        ]
    },
]