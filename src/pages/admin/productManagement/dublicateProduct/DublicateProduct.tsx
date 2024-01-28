import { Button, Modal, Tooltip } from "antd";
import { CopyOutlined } from "@ant-design/icons";
import { useState } from "react";
import { CloseOutlined } from "@ant-design/icons";
import DublicateProductForm from "./DublicateProductForm";

const DublicateProduct = ({product}:any) => {
    const [open, setOpen] = useState(false);
    // const [confirmLoading, setConfirmLoading] = useState(false);

    const showModal = () => {
        setOpen(true);
    };


    return (
        <>
            <Tooltip title="Copy and create new product">
                        <Button type="default" shape="circle" icon={<CopyOutlined />}
                         onClick={showModal} />
                    </Tooltip>
            <Modal
                title="Create new product"
                centered
                open={open}
                maskClosable={false}
                closeIcon={<CloseOutlined />}
                onCancel={() => setOpen(false)}
                // confirmLoading={confirmLoading}
                cancelButtonProps={{ style: { display: 'none' } }}
                okButtonProps={{ style: { display: 'none' } }}
            >
                <DublicateProductForm setOpen={setOpen} defaultValues={product} />
            </Modal>
        </>
    );
};

export default DublicateProduct;