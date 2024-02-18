import { Button, Modal, Tooltip } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useState } from "react";
import { CloseOutlined } from "@ant-design/icons";
import UpdateServiceRequestForm from "./UpdateServiceRequestForm";

const UpdateServiceRequest = ({product}:any) => {
    const [open, setOpen] = useState(false);
    // const [confirmLoading, setConfirmLoading] = useState(false);

    const showModal = () => {
        setOpen(true);
    };


    return (
        <>
            <Tooltip title="Edit">
                        <Button type="default" shape="circle" icon={<EditOutlined />} onClick={showModal} />
                    </Tooltip>
            <Modal
                title="Update Service Request"
                centered
                open={open}
                maskClosable={false}
                closeIcon={<CloseOutlined />}
                onCancel={() => setOpen(false)}
                // confirmLoading={confirmLoading}
                cancelButtonProps={{ style: { display: 'none' } }}
                okButtonProps={{ style: { display: 'none' } }}
            >
                <UpdateServiceRequestForm setOpen={setOpen} defaultValues={product} />
            </Modal>
        </>
    );
};

export default UpdateServiceRequest;