import { Button, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import { CloseOutlined } from "@ant-design/icons";
import CreateNewProductForm from "./CreateNewProductForm";

const CreateNewProduct = () => {
    const [open, setOpen] = useState(false);
    // const [confirmLoading, setConfirmLoading] = useState(false);

    const showModal = () => {
        setOpen(true);
    };

    return (
        <>
            <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
                Create New Product
            </Button>
            <Modal
                title="Create New Product"
                centered
                open={open}
                maskClosable={false}
                closeIcon={<CloseOutlined />}
                onCancel={() => setOpen(false)}
                // confirmLoading={confirmLoading}
                cancelButtonProps={{ style: { display: 'none' } }}
                okButtonProps={{ style: { display: 'none' } }}
            >
                <CreateNewProductForm setOpen={setOpen} />
            </Modal>
        </>
    );
};

export default CreateNewProduct;