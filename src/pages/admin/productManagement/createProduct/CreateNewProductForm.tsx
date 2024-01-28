import { Button, Flex, Row, Space } from "antd";
import BaseForm from "../../../../components/form/BaseForm";
import BaseInput from "../../../../components/form/BaseInput";
import { CREATE_PRODUCT_INPUTS } from "./CreateProduct.config";
import { useAddProductMutation } from "../../../../redux/features/products/productsApi";

const CreateNewProductForm = ({setOpen}:any) => {

    const [createProduct] = useAddProductMutation();

    const onSubmit = async(values: any) => {
        console.log(values);

        await createProduct(values).unwrap();
        setOpen(false);
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

                            <Button type="primary" htmlType="submit">
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