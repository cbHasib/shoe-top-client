import { useState } from "react";
import { Button, Collapse, CollapseProps, Divider,  Row, Space, Table, TableProps, DatePicker, Select } from "antd";
import Title from "antd/es/typography/Title";
import Search from "antd/es/input/Search";
import dayjs from 'dayjs';
import { useAppSelector } from "../../../redux/hooks";
import { JwtPayload } from "jwt-decode";
import { useCurrentToken } from "../../../redux/features/auth/authSlice";
import { verifyToken } from "../../../utils/verifyToken";
import { SERVICE_REQUEST_FILTER_INPUTS } from "./ServiceRequest.config";
import CreateNewServiceRequest from "./createNewServiceRequest/CreateNewServiceRequest";
import { useGetMyServiceRequestQuery } from "../../../redux/features/serviceRequest/service-requestApi";
import './ServiceRequest.css'
import UpdateServiceRequest from "./updateServiceRequest/UpdateServiceRequest";
const { RangePicker } = DatePicker;


type ColumnsType<T> = TableProps<T>['columns'];

interface DataType {
    _id: string;
    contactAddress: string;
    contactEmail: string;
    contactName: string;
    contactPhone: string;
    createdAt: string; // It seems like a date string, you might want to use Date type or parse it accordingly
    instructions: string;
    polishType: 'normal' | 'military' | 'parade';
    requestId: string;
    shineLevel: 'low' | 'medium' | 'high';
    shoeBrand: string;
    shoeColor: string;
    shoeMaterial: string;
    shoeModel: string;
    shoeSize: string;
    status: 'pending' | 'in-progress' | 'completed' | 'cancelled' | 'rejected' | 'delivered';
    updatedAt: string; // It seems like a date string, you might want to use Date type or parse it accordingly
    user: {
        _id: string;
        name: string;
        email: string;
    };
}



interface JwtPayloadUser extends JwtPayload {
    role: string;
}

const ServiceRequest = () => {
    const [query, setQuery] = useState<Record<string, any>>({
        // page: 1,
        // limit: 10,
    }); // ['name', 'price'
    const { data, isLoading } = useGetMyServiceRequestQuery(query);

    const token = useAppSelector(useCurrentToken);

    let user: JwtPayloadUser | null = null;

    if (token) {
        user = verifyToken(token) as JwtPayloadUser;
    }

    const columns: ColumnsType<DataType> = [
        {
            title: 'Request ID',
            dataIndex: 'requestId',
            sorter: true
        },
        ...(user?.role === 'admin' || user?.role === 'seller' ? [
            {
                title: 'Name',
                dataIndex: 'contactName',
                sorter: true,
                render: (_:any, record:any) => (<span>{record.contactName}</span>),
            },
            {
                title: 'Phone',
                dataIndex: 'contactPhone',
                sorter: true,
            },
            {
                title: 'Email',
                dataIndex: 'contactEmail',
                sorter: true,
            },
            {
                title: 'Address',
                dataIndex: 'contactAddress',
                sorter: true,
                render: (_:any, record:any) => (<span title={record.contactAddress} style={{ overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical' }}>{record.contactAddress}</span>),
            }
        ] : []),
        {
            title: 'Shoe Brand',
            dataIndex: 'shoeBrand',
            sorter: true,
        },
        {
            title: 'Shoe Model',
            dataIndex: 'shoeModel',
            sorter: true,
        },
        {
            title: 'Shoe Size',
            dataIndex: 'shoeSize',
            sorter: true,
        },
        {
            title: 'Shoe Material',
            dataIndex: 'shoeMaterial',
            sorter: true,
            render: (_, record) => (<span style={{ textTransform: 'capitalize' }}>{record.shoeMaterial}</span>),
        },
        {
            title: 'Shoe Color',
            dataIndex: 'shoeColor',
            sorter: true,
            // render: (_, record) => (<>
            //     {/* <span style={{ textTransform: 'capitalize' }} className={`color-view ${record.shoeColor}`}>{record.shoeColor}</span> */}
            // </>
            // ),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            sorter: true,
            render: (_, record) => (<span style={{ textTransform: 'capitalize', textWrap: 'nowrap' }} className={`status ${record.status}`}>{record.status}</span>),
        },
        {
            title: 'Shine Level',
            dataIndex: 'shineLevel',
            sorter: true,
            render: (_, record) => (<span style={{ textTransform: 'capitalize' }}>{record.shineLevel}</span>),
        },
        {
            title: 'Polish Type',
            dataIndex: 'polishType',
            sorter: true,
            render: (_, record) => (<span style={{ textTransform: 'capitalize' }}>{record.polishType}</span>),
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            sorter: true,
            render: (_, record) => (<span>{dayjs(record.createdAt).format('DD MMM YYYY')}</span>),
        },

        ...(user?.role === 'admin' || user?.role === 'seller' ? [
            {
                title: 'Action',
                key: 'action',
                render: (_:any, record : any) => (
                    <Space size="middle">
                        <UpdateServiceRequest product={record} />
                        {/* <SaleProduct product={record} />
                        <DublicateProduct product={record} />
                        <Popconfirm
                            title="Delete this product?"
                            description={`Are you sure to delete this product?`}
                            onConfirm={() => handleDeleteProduct(record.slug)}
                            okText="Delete"
                            cancelText="Cancel"
                            okButtonProps={{ danger: true, loading: deleteLoading }}
                        >
                            <Button type="default" danger shape="circle" icon={<DeleteOutlined />} />
                        </Popconfirm> */}
                    </Space>
                ),
            },
        ] : []),
    ];


    const handleTableChange: TableProps['onChange'] = (pagination, filters, sorter: any) => {
        console.log(pagination, filters, sorter);

        const newQuery = {
            // page: pagination.current,
            // limit: pagination.pageSize,
            ...query,
            ...filters,
            ...(sorter?.field ? { sort: sorter.order === 'ascend' ? sorter.field : `-${sorter.field}` } : {}),
        };
        setQuery(newQuery);
    }

    const onSearch = (value: string) => {
        const updateQuery = {
            ...query,
            searchTerm: value
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
                            <Title level={5}>Create Date Range</Title>
                            <RangePicker allowClear onChange={(e) => setQuery({ ...query, "createdAt[$gte]": e?.[0]?.format('YYYY-MM-DD') as any, "createdAt[$lte]": e?.[1]?.format('YYYY-MM-DD') as any })}
                                style={{ marginRight: 10 }} />
                        </div>
                        {
                            SERVICE_REQUEST_FILTER_INPUTS.map((input, index) => (
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


    return (
        <div>
            <Row justify="space-between">
                <Search placeholder="search for a request..." allowClear onSearch={onSearch} style={{ width: 220 }} />
                <Title level={3}>Service Request</Title>
                {
                    user?.role === 'buyer' ? <CreateNewServiceRequest /> : <div></div> 
                }
            </Row>

            <Row justify="space-between" align="middle">
                <Collapse expandIconPosition="start" ghost items={items} />
            </Row>

            <Divider />

            <Table
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

export default ServiceRequest;