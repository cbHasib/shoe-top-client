import { useState } from "react";
import { useDeleteProductMutation, useGetAllProductsQuery } from "../../../redux/features/products/productsApi";
import { Button, Divider, GetProp, Popconfirm, Row, Space, Table, TableProps, Tooltip } from "antd";
import Title from "antd/es/typography/Title";
import CreateNewProduct from "./createProduct/CreateNewProduct";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { toast } from "sonner";

type ColumnsType<T> = TableProps<T>['columns'];
type TablePaginationConfig = Exclude<GetProp<TableProps, 'pagination'>, boolean>;

interface DataType {
    name: string;
    price: number;
    quantity: number;
    brand: string;
    color: string;
    size: string;
    slug: string;
}

interface TableParams {
    pagination?: TablePaginationConfig;
    sortField?: string;
    sortOrder?: string;
    filters?: Parameters<GetProp<TableProps, 'onChange'>>[1];
}


const ProductInventory = () => {
    const [query, setQuery] = useState<Record<string, any>>({
        page: 1,
        limit: 1,
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
            width: '20%',
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
                    <Tooltip title="Edit">
                        <Button type="default" shape="circle" icon={<EditOutlined />} />
                    </Tooltip>
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

    const [tableParams, setTableParams] = useState<TableParams>({
        pagination: {
            current: 1,
            pageSize: 1,
           total: data?.data?.meta?.total 
        },
    });


    const handleTableChange: TableProps['onChange'] = (pagination, filters, sorter: any) => {
        console.log(pagination, filters, sorter);
        setTableParams({
            pagination,
            filters,
            ...sorter,
        });

        const query = {
            page: pagination.current,
            limit: pagination.pageSize,
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
                pagination={tableParams.pagination}
                loading={isLoading}
                onChange={handleTableChange}
            />
        </div>
    );
};

export default ProductInventory;