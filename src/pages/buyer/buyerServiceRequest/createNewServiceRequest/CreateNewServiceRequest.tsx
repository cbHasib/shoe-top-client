import { Button, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import { CloseOutlined } from "@ant-design/icons";
import CreateNewServiceRequestForm from "./CreateNewServiceRequestForm";

const CreateNewServiceRequest = () => {
    const [open, setOpen] = useState(false);
    // const [confirmLoading, setConfirmLoading] = useState(false);

    const showModal = () => {
        setOpen(true);
    };

    return (
        <>
            <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
                New Polishing Service
            </Button>
            <Modal
                title="Request For a New Polishing Service"
                centered
                open={open}
                maskClosable={false}
                closeIcon={<CloseOutlined />}
                onCancel={() => setOpen(false)}
                // confirmLoading={confirmLoading}
                cancelButtonProps={{ style: { display: 'none' } }}
                okButtonProps={{ style: { display: 'none' } }}
            >
                <CreateNewServiceRequestForm setOpen={setOpen} />
            </Modal>
        </>
    );
};

export default CreateNewServiceRequest;