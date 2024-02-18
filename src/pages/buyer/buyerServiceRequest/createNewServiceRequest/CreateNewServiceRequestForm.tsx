import { Button, Flex, Row, Space } from "antd";
import BaseForm from "../../../../components/form/BaseForm";
import BaseInput from "../../../../components/form/BaseInput";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { CREATE_SERVICE_REQUEST_INPUTS } from "./CreateNewServiceRequest.config";
import { useAddServiceRequestMutation } from "../../../../redux/features/serviceRequest/service-requestApi";
import { useAppSelector } from "../../../../redux/hooks";
import { selectCurrentUser } from "../../../../redux/features/auth/authSlice";

const CreateNewServiceRequestForm = ({ setOpen }: any) => {

    const [createServiceRequest, { isLoading }] = useAddServiceRequestMutation();
    const user = useAppSelector(selectCurrentUser)

    const onSubmit = async (values: FieldValues) => {
        const toastId = toast.loading('Adding service request...');
        try {
            const res = await createServiceRequest(values).unwrap();
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
                    <BaseForm onSubmit={onSubmit} defaultValues={{ contactName: user?.name, contactEmail: user?.email }}>
                        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                            <div style={{ width: '100%', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
                                {
                                    CREATE_SERVICE_REQUEST_INPUTS.map((input, index) => (
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

export default CreateNewServiceRequestForm;