import { useState } from "react";
import {  Divider, Row, Table, TableProps, DatePicker } from "antd";
import Title from "antd/es/typography/Title";
import { useGetAllSalesQuery } from "../../../redux/features/sales/salesApi";
import dayjs from 'dayjs';
const { RangePicker } = DatePicker;


type ColumnsType<T> = TableProps<T>['columns'];

interface DataType {
    _id: string;
    product: any;
    price: number;
    quantity: number;
    buyer: string;
    saleDate: string;
    seller: any;
}

const SalesHistory = () => {
    const [query, setQuery] = useState<Record<string, any>>({
        // page: 1,
        // limit: 10,
    }); // ['name', 'price'
    const { data, isLoading } = useGetAllSalesQuery(query);
    // const [deleteProduct, {isLoading: deleteLoading}] = useDeleteProductMutation();


    // const handleDeleteProduct = async(slug: string) => {
    //     const toastId = toast.loading('Deleting product...');
    //     try {
    //         const res = await deleteProduct(slug).unwrap();
    //         toast.success(res?.message, { id: toastId });
    //     } catch (error:any) {
    //         toast.error(error?.data?.message), { id: toastId };
    //     }
    // }

    const columns: ColumnsType<DataType> = [
        {
            title: 'Product Name',
            dataIndex: 'productName',
            sorter: false,
            width: '20%',
            render: (_, record) => ( <span>{record?.product?.name}</span>),
        },
        {
            title: 'Price',
            dataIndex: 'price',
            width: '15%',
            sorter: true,
            render: (_, record) => ( <span>${record.price}</span>),
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            width: '10%',
            sorter: true,
        },
        {
            title: 'Buyer',
            dataIndex: 'buyer',
            width: '10%',
            sorter: true,
        },
        {
            title: 'Sale Date',
            dataIndex: 'saleDate',
            width: '10%',
            sorter: true,
            render: (_, record) => ( <span>{dayjs(record.saleDate).format('DD MMM YYYY')}</span>),
        },
        {
            title: 'Seller',
            dataIndex: 'sellerName',
            width: '10%',
            sorter: false,
            render: (_, record) => ( <span>{record?.seller?.name}</span>),
        },
        // {
        //     title: 'Action',
        //     width: '15%',
        //     key: 'action',
        //     render: (_, record) => (
        //         <Space size="middle">
        //             <SaleProduct product={record} />
        //             <UpdateProduct product={record} />
        //                 <Popconfirm
        //                     title="Delete this product?"
        //                     description={`Are you sure to delete this product?`}
        //                     onConfirm={() => handleDeleteProduct(record.slug)}
        //                     okText="Delete"
        //                     cancelText="Cancel"
        //                     okButtonProps={{ danger: true, loading: deleteLoading}}
        //                 >
        //                     <Button type="default" danger shape="circle" icon={<DeleteOutlined />} />
        //                 </Popconfirm>
        //         </Space>
        //     ),
        // },
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
                <Title level={3}>Sales History</Title>
                {/* <CreateNewProduct /> */}
                <RangePicker onChange={(e) => setQuery({ ...query, "saleDate[$gte]": e?.[0]?.format('YYYY-MM-DD') as any, "saleDate[$lte]": e?.[1]?.format('YYYY-MM-DD') as any })} 
                style={{marginRight: 10}}    />
            </Row>
            <Divider />
            <Table
                bordered={true}
                scroll={{ x: 1000 }}
                columns={columns}
                rowKey={(record) => record._id}
                dataSource={(data?.data || [])}
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

export default SalesHistory;