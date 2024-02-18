import { Button, Flex, Row, Space } from "antd";
import BaseForm from "../../../../components/form/BaseForm";
import BaseInput from "../../../../components/form/BaseInput";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { getChangedValues } from "../../../../utils/getChangedValues";
import { useUpdateServiceRequestMutation } from "../../../../redux/features/serviceRequest/service-requestApi";
import { UPDATE_SERVICE_REQUEST_INPUTS } from "./UpdateServiceRequest.config";

const UpdateServiceRequestForm = ({ setOpen, defaultValues }: any) => {

    const [updateService, { isLoading }] = useUpdateServiceRequestMutation();

    const onSubmit = async (values: FieldValues) => {
        const changedValues = getChangedValues(values, defaultValues)

        const toastId = toast.loading('Updating service...');
        try {
            const res = await updateService({id:defaultValues._id, body:changedValues}).unwrap();
            toast.success(res.message, { id: toastId });
            
            setOpen(false);
        } catch (error: any) {
            toast.error(error.data.message);
        }
    };

    return (
        <Row justify="center" align="middle">
            <Space direction="vertical" style={{ padding: 10 }}>

                <Flex justify="center" align="center">
                    <BaseForm onSubmit={onSubmit} defaultValues={defaultValues}>
                        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                            <div style={{ width: '100%', minWidth: '300px' }}>
                                    {
                                        UPDATE_SERVICE_REQUEST_INPUTS.map((input, index) => (
                                            <BaseInput key={index} {...input} />
                                        ))
                                    }
                            </div>

                            <Button type="primary" htmlType="submit" loading={isLoading}>
                                Submit
                            </Button>
                        </div>
                    </BaseForm>
                </Flex>
            </Space>
        </Row>
    );
};

export default UpdateServiceRequestForm;