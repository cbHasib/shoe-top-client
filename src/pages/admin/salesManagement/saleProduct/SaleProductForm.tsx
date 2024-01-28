import { Button, Flex, Row, Space } from "antd";
import BaseForm from "../../../../components/form/BaseForm";
import BaseInput from "../../../../components/form/BaseInput";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { SALE_PRODUCT_INPUTS } from "./SaleProduct.config";
import { useAddSaleMutation } from "../../../../redux/features/sales/salesApi";

const SaleProductForm = ({ setOpen, defaultValues }: any) => {

    const [addSale, { isLoading }] = useAddSaleMutation();

    const onSubmit = async (values: FieldValues) => {
        
        const toastId = toast.loading('Adding sale...');
        try {
            const res = await addSale({...values, product: defaultValues._id}).unwrap();
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
                    <BaseForm onSubmit={onSubmit} defaultValues={{buyer: '', quantity: 1, saleDate: new Date().toISOString().slice(0, 10)}}>
                        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                            <div style={{ width: '100%', display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gap: '24px' }}>
                                {
                                    SALE_PRODUCT_INPUTS.map((input, index) => {

                                        const defaultInput = {...input, min: 1, max: defaultValues.quantity}

                                        return (
                                        <BaseInput key={index} {...defaultInput} />
                                    )})
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

export default SaleProductForm;