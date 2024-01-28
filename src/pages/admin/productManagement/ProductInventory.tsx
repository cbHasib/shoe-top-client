import { useState } from "react";
import { useDeleteProductMutation, useGetAllProductsQuery } from "../../../redux/features/products/productsApi";
import { Button, Divider, Popconfirm, Row, Space, Table, TableProps } from "antd";
import Title from "antd/es/typography/Title";
import CreateNewProduct from "./createProduct/CreateNewProduct";
import { DeleteOutlined } from "@ant-design/icons";
import { toast } from "sonner";
import UpdateProduct from "./updateProduct/UpdateProduct";

type ColumnsType<T> = TableProps<T>['columns'];

interface DataType {
    name: string;
    price: number;
    quantity: number;
    brand: string;
    color: string;
    size: string;
    slug: string;
}

const ProductInventory = () => {
    const [query, setQuery] = useState<Record<string, any>>({
        // page: 1,
        // limit: 10,
    }); // ['name', 'price'
    const { data, isLoading } = useGetAllProductsQuery(query);
    const [deleteProduct, {isLoading: deleteLoading}] = useDeleteProductMutation();


    const handleDeleteProduct = async(slug: string) => {
        const toastId = toast.loading('Deleting product...');
        try {
            const res = await deleteProduct(slug).unwrap();
            toast.success(res?.message, { id: toastId });
        } catch (error:any) {
            toast.error(error?.data?.message), { id: toastId };
        }
    }

    const columns: ColumnsType<DataType> = [
        {
            title: 'Name',
            dataIndex: 'name',
            sorter: true,
            width: '20%',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            width: '15%',
            sorter: true,
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            width: '10%',
            sorter: true,
        },
        {
            title: 'Brand',
            dataIndex: 'brand',
            width: '10%',
            sorter: true,
        },
        {
            title: 'Color',
            dataIndex: 'color',
            width: '10%',
            sorter: true,
        },
        {
            title: 'Size',
            dataIndex: 'size',
            width: '10%',
            sorter: true,
        },
        {
            title: 'Action',
            width: '15%',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <UpdateProduct product={record} />
                        <Popconfirm
                            
                            title="Delete this product?"
                            description={`Are you sure to delete this product?`}
                            onConfirm={() => handleDeleteProduct(record.slug)}
                            okText="Delete"
                            cancelText="Cancel"
                            okButtonProps={{ danger: true, loading: deleteLoading}}
                        >
                            <Button type="default" danger shape="circle" icon={<DeleteOutlined />} />
                        </Popconfirm>
                </Space>
            ),
        },
    ];


    const handleTableChange: TableProps['onChange'] = (pagination, filters, sorter: any) => {
        console.log(pagination, filters, sorter);

        const query = {
            // page: pagination.current,
            // limit: pagination.pageSize,
            ...filters,
            ...(sorter?.field ? { sort: sorter.order === 'ascend' ? sorter.field : `-${sorter.field}` } : {}),
        };
        setQuery(query);
    }


    return (
        <div>
            <Row justify="space-between">
                <Title level={3}>Product Inventory</Title>
                <CreateNewProduct />
            </Row>
            <Divider />
            <Table
                bordered={true}
                scroll={{ x: 1000 }}
                columns={columns}
                rowKey={(record) => record.name}
                dataSource={(data?.data?.data || [])}
                loading={isLoading}
                pagination={{
                    defaultCurrent: 1,
                    defaultPageSize: 10,
                    showSizeChanger: true,
                }}
            
                onChange={handleTableChange}
            />
        </div>
    );
};

export default ProductInventory;