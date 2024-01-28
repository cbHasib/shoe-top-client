import { Button, Flex, Row, Space } from "antd";
import BaseForm from "../../../../components/form/BaseForm";
import BaseInput from "../../../../components/form/BaseInput";
import { useAddProductMutation } from "../../../../redux/features/products/productsApi";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { DUPLICATE_PRODUCT_INPUTS } from "./DublicateProduct.config";

const DublicateProductForm = ({ setOpen, defaultValues }: any) => {

    const [addProduct, { isLoading }] = useAddProductMutation();

    const onSubmit = async (values: FieldValues) => {
        const toastId = toast.loading('Adding product...');
        try {
            const {_id, createdAt, updatedAt, __v, isDeleted, slug,  ...rest} = values;
            const res = await addProduct(rest).unwrap();
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
                                    DUPLICATE_PRODUCT_INPUTS.map((input, index) => (
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

export default DublicateProductForm;