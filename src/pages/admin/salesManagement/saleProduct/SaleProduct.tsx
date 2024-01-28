import { Button, Modal, Tooltip } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useState } from "react";
import { CloseOutlined } from "@ant-design/icons";
import SaleProductForm from "./SaleProductForm";

const SaleProduct = ({product}:any) => {
    const [open, setOpen] = useState(false);
    // const [confirmLoading, setConfirmLoading] = useState(false);

    const showModal = () => {
        setOpen(true);
    };

    console.log(product);

    return (
        <>
            <Tooltip title="Sale This Product">
                        <Button type="default" shape="circle" icon={<ShoppingCartOutlined />} onClick={showModal} />
                    </Tooltip>
            <Modal
                title="Sale Product"
                centered
                open={open}
                maskClosable={false}
                closeIcon={<CloseOutlined />}
                onCancel={() => setOpen(false)}
                // confirmLoading={confirmLoading}
                cancelButtonProps={{ style: { display: 'none' } }}
                okButtonProps={{ style: { display: 'none' } }}
            >
                <SaleProductForm setOpen={setOpen} defaultValues={product} />
            </Modal>
        </>
    );
};

export default SaleProduct;