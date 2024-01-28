import { useState } from "react";
import { useDeleteProductMutation, useGetAllProductsQuery, useMultipleDeleteProductMutation } from "../../../redux/features/products/productsApi";
import { Button, Collapse, CollapseProps, Divider, Popconfirm, Row, Slider, Space, Table, TableProps, DatePicker, Select } from "antd";
import Title from "antd/es/typography/Title";
import CreateNewProduct from "./createProduct/CreateNewProduct";
import { DeleteOutlined } from "@ant-design/icons";
import { toast } from "sonner";
import UpdateProduct from "./updateProduct/UpdateProduct";
import SaleProduct from "../salesManagement/saleProduct/SaleProduct";
import Search from "antd/es/input/Search";
import dayjs from 'dayjs';
import { PRODUCT_FILTER_INPUTS } from "./ProductFilter.config";
const { RangePicker } = DatePicker;

type ColumnsType<T> = TableProps<T>['columns'];

interface DataType {
    _id: string;
    name: string;
    price: number;
    quantity: number;
    brand: string;
    color: string;
    size: string;
    slug: string;
    releaseDate: string;
    style: string;
    model: string;
    material: string;
}

const ProductInventory = () => {
    const [query, setQuery] = useState<Record<string, any>>({
        // page: 1,
        // limit: 10,
    }); // ['name', 'price'
    const { data, isLoading } = useGetAllProductsQuery(query);
    const [deleteProduct, { isLoading: deleteLoading }] = useDeleteProductMutation();
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [deleteMultiple] = useMultipleDeleteProductMutation();


    const handleDeleteProduct = async (slug: string) => {
        const toastId = toast.loading('Deleting product...');
        try {
            const res = await deleteProduct(slug).unwrap();
            toast.success(res?.message, { id: toastId });
        } catch (error: any) {
            toast.error(error?.data?.message), { id: toastId };
        }
    }

    const columns: ColumnsType<DataType> = [
        {
            title: 'Name',
            dataIndex: 'name',
            sorter: true,
        },
        {
            title: 'Price',
            dataIndex: 'price',
            sorter: true,
            render: (_, record) => (<span>${record.price}</span>),
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            sorter: true,
        },
        {
            title: 'Brand',
            dataIndex: 'brand',
            sorter: true,
        },
        {
            title: 'Model',
            dataIndex: 'model',
            sorter: true,
        },
        {
            title: 'Color',
            dataIndex: 'color',
            sorter: true,
            render: (_, record) => (<>
                <span style={{ backgroundColor: record.color?.toLocaleLowerCase(), width: 12, height: 12, display: 'inline-block', borderRadius: '50%' }}></span>
                <span style={{ color: record.color?.toLocaleLowerCase(), fontWeight: 500, marginLeft: 4 }}>{record.color}</span>
            </>
            ),
        },
        {
            title: 'Size',
            dataIndex: 'size',
            sorter: true,
        },
        {
            title: 'Style',
            dataIndex: 'style',
            sorter: true,
            render: (_, record) => (<span style={{ textTransform: 'capitalize' }}>{record.style}</span>),
        },
        {
            title: 'Material',
            dataIndex: 'material',
            sorter: true,
            render: (_, record) => (<span style={{ textTransform: 'capitalize' }}>{record.material}</span>),
        },
        {
            title: 'Release Date',
            dataIndex: 'releaseDate',
            sorter: true,
            render: (_, record) => (<span>{dayjs(record.releaseDate).format('DD MMM YYYY')}</span>),
        },

        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <SaleProduct product={record} />
                    <UpdateProduct product={record} />
                    <Popconfirm
                        title="Delete this product?"
                        description={`Are you sure to delete this product?`}
                        onConfirm={() => handleDeleteProduct(record.slug)}
                        okText="Delete"
                        cancelText="Cancel"
                        okButtonProps={{ danger: true, loading: deleteLoading }}
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

    const onSearch = (value: string) => {
        const updateQuery = {
            ...query,
            searchTerm: value
        }
        setQuery(updateQuery);
    }


    const onPriceRangeChange = (value: number[]) => {
        if (value[0] === 0 && value[1] === 0) {
            // remove price[$lte] and price[$gte] from query
            const { 'price[$lte]': _, 'price[$gte]': __, ...rest } = query;
            setQuery(rest);
            return;
        }

        const updateQuery = {
            ...query,
            'price[$lte]': value[1],
            'price[$gte]': value[0]
        }
        setQuery(updateQuery);
    }



    const items: CollapseProps['items'] = [
        {
            key: '1',
            label: 'More Filters',
            children: (
                <Row justify="space-between" align="middle">
                    <Space size="middle">
                        <div>
                            <Title level={5}>Price Range</Title>
                            <Slider range max={data?.data?.meta?.highestPrice || 0} min={data?.data?.meta?.lowestPrice || 0} style={{ width: 250 }} onChangeComplete={(e) => onPriceRangeChange(e as number[])} />
                        </div>

                        <div>
                            <Title level={5}>Release Date Range</Title>
                            <RangePicker allowClear onChange={(e) => setQuery({ ...query, "releaseDate[$gte]": e?.[0]?.format('YYYY-MM-DD') as any, "releaseDate[$lte]": e?.[1]?.format('YYYY-MM-DD') as any })}
                                style={{ marginRight: 10 }} />
                        </div>
                        {
                            PRODUCT_FILTER_INPUTS.map((input, index) => (
                                <div key={index} style={{ width: 150 }}>
                                    <Title level={5}>{input.label}</Title>
                                    <Select
                                        className="my-2"
                                        value={query[input.name]}
                                        options={input.options}
                                        placeholder={input.placeholder}
                                        style={{ width: '100%' }}
                                        onChange={(e) => setQuery({ ...query, [input.name]: e })}
                                        allowClear
                                    />
                                </div>
                            ))
                        }

                    </Space>
                    <Button type="primary" onClick={() => setQuery({})} style={{ marginTop: 30, marginLeft: 20 }} danger>
                        Clear Filters
                    </Button>
                </Row>
            )
        },
    ];

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
      };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
      };


      const handleMultiDelete = async() => {
        const toastId = toast.loading('Deleting products...');
        try {

            const res = await deleteMultiple(selectedRowKeys).unwrap();
            toast.success(res?.message, { id: toastId });
            setSelectedRowKeys([]);
            
        } catch (error:any) {
            toast.error(error?.data?.message), { id: toastId };
        }
      }


    return (
        <div>
            <Row justify="space-between">
                <Search placeholder="search for a product..." allowClear onSearch={onSearch} style={{ width: 220 }} />
                <Title level={3}>Product Inventory</Title>
                <CreateNewProduct />
            </Row>

            <Row justify="space-between" align="middle">
                <Collapse expandIconPosition="start" ghost items={items} />
            </Row>

            <Divider />

{
    selectedRowKeys?.length > 0 ? ( <Button type="primary" onClick={handleMultiDelete} danger style={{marginBottom: 20}}>Delete Selected</Button>) : null
}


            <Table
            rowSelection={rowSelection}
                bordered={true}
                scroll={{ x: 1000 }}
                columns={columns}
                rowKey={(record) => record._id}
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