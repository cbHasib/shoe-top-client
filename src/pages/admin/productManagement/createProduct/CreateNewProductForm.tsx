import { Button, Flex, Row, Space } from "antd";
import BaseForm from "../../../../components/form/BaseForm";
import BaseInput from "../../../../components/form/BaseInput";
import { CREATE_PRODUCT_INPUTS } from "./CreateProduct.config";
import { useAddProductMutation } from "../../../../redux/features/products/productsApi";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

const CreateNewProductForm = ({ setOpen }: any) => {

    const [createProduct, { isLoading }] = useAddProductMutation();

    const onSubmit = async (values: FieldValues) => {
        const toastId = toast.loading('Adding product...');
        try {
            const res = await createProduct(values).unwrap();
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
                    <BaseForm onSubmit={onSubmit}>
                        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                            <div style={{ width: '100%', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
                                {
                                    CREATE_PRODUCT_INPUTS.map((input, index) => (
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

export default CreateNewProductForm;