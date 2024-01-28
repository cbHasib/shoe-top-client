import { useState } from "react";
import { useGetAllProductsQuery } from "../../../redux/features/products/productsApi";
import { Divider, GetProp, Row, Table, TableProps } from "antd";
import Title from "antd/es/typography/Title";
import CreateNewProduct from "./createProduct/CreateNewProduct";

type ColumnsType<T> = TableProps<T>['columns'];
type TablePaginationConfig = Exclude<GetProp<TableProps, 'pagination'>, boolean>;

interface DataType {
    name: string;
    price: number;
    quantity: number;
    brand: string;
    color: string;
    size: string;
}

interface TableParams {
    pagination?: TablePaginationConfig;
    sortField?: string;
    sortOrder?: string;
    filters?: Parameters<GetProp<TableProps, 'onChange'>>[1];
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
        width: '15%',
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
        width: '15%',
        sorter: true,
    },
    {
        title: 'Size',
        dataIndex: 'size',
        width: '15%',
        sorter: true,
    }
];

const ProductInventory = () => {
    const [query, setQuery] = useState({}); // ['name', 'price'
    const { data, isLoading } = useGetAllProductsQuery(query);

    const [tableParams, setTableParams] = useState<TableParams>({
        pagination: {
            current: 1,
            pageSize: 10,
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
                dataSource={data?.data}
                pagination={tableParams.pagination}
                loading={isLoading}
                onChange={handleTableChange}
            />
        </div>
    );
};

export default ProductInventory;