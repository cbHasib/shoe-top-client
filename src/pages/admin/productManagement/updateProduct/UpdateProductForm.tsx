import { Button, Flex, Row, Space } from "antd";
import BaseForm from "../../../../components/form/BaseForm";
import BaseInput from "../../../../components/form/BaseInput";
import { UPDATE_PRODUCT_INPUTS } from "./UpdateProduct.config";
import { useUpdateProductMutation } from "../../../../redux/features/products/productsApi";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { getChangedValues } from "../../../../utils/getChangedValues";

const UpdateProductForm = ({ setOpen, defaultValues }: any) => {

    const [updateProduct, { isLoading }] = useUpdateProductMutation();

    const onSubmit = async (values: FieldValues) => {
        const changedValues = getChangedValues(values, defaultValues)

        const toastId = toast.loading('Updating product...');
        try {
            const res = await updateProduct({slug:defaultValues.slug, body:changedValues}).unwrap();
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
                            <div style={{ width: '100%', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
                                {
                                    UPDATE_PRODUCT_INPUTS.map((input, index) => (
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

export default UpdateProductForm;