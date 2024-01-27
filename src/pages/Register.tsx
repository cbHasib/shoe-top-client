import { Button, Flex, Row, Space } from 'antd';
import { useRegisterMutation } from '../redux/features/auth/authApi';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import BaseForm from '../components/form/BaseForm';
import BaseInput from '../components/form/BaseInput';
import Title from 'antd/es/typography/Title';
import { FieldValues } from 'react-hook-form';

const Register = () => {
    const navigate = useNavigate();

    const [register] = useRegisterMutation();

    const onFinish = async (values: FieldValues) => {
        const toastId = toast.loading('Registering...');
        try {

            const userInfo = {name: values.name, email: values.email, password: values.password }
            const res = await register(userInfo).unwrap();
            toast.success(res?.message || 'User is registered succesfully!', { id: toastId });
            navigate(`/login`);
        } catch (err: any) {
            toast.error(err?.data?.message, { id: toastId });
        }
    };


    return (
        <Row justify="center" align="middle" style={{ height: '100vh', backgroundColor: '#F3FDFF' }}>


                <Space direction="vertical" style={{ padding: 50, border: '1px solid #ccccc', borderRadius: 5, boxShadow: 'rgba(17, 12, 46, 0.15) 0px 48px 100px 0px', maxWidth: '450px', backgroundColor: '#FFFFFF' }}>

                <Title level={3} style={{width: '100%', textAlign: 'center'}}>Register a new account</Title>

                <Flex justify="center" align="center">
                    <BaseForm onSubmit={onFinish}>
                        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <BaseInput type="text" name="name" label="Name" />
                            <BaseInput type="email" name="email" label="Email" />
                            <BaseInput type="password" name="password" label="Password" />

                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </div>
                    </BaseForm>

                </Flex>
                    <p style={{width: '100%', textAlign: 'center'}}>Already have an account? <Link to="/login">Login</Link></p>
                </Space>
            </Row>
    );
};

export default Register;