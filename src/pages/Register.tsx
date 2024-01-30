import { Button, Flex, Row, Space } from 'antd';
import { useRegisterMutation } from '../redux/features/auth/authApi';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import BaseForm from '../components/form/BaseForm';
import BaseInput from '../components/form/BaseInput';
import Title from 'antd/es/typography/Title';
import { FieldValues } from 'react-hook-form';
import './Login.css'

const Register = () => {
    const navigate = useNavigate();

    const [register, { isLoading }] = useRegisterMutation();

    const onFinish = async (values: FieldValues) => {
        if (!values.email || !values.password || !values.name) return toast.error('Please fill all the fields!');
        const toastId = toast.loading('Registering...');
        try {
            const userInfo = { name: values.name, email: values.email, password: values.password }
            const res = await register(userInfo).unwrap();
            toast.success(res?.message || 'User is registered succesfully!', { id: toastId });
            navigate(`/login`);
        } catch (err: any) {
            toast.error(err?.data?.message === 'Validation Error' ? err?.data?.errorSource[0]?.message : err?.data?.message, { id: toastId });
        }
    };


    return (
        <Row justify="center" align="middle" style={{ height: '100vh' }}>
            <div className="lines">
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
            </div>
            <div className='card-blur' >
                <Space direction="vertical">

                    <Title level={3} style={{ width: '100%', textAlign: 'center' }}>Register a new account</Title>

                    <Flex justify="center" align="center">
                        <BaseForm onSubmit={onFinish}>
                            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <BaseInput type="text" name="name" label="Name" />
                                <BaseInput type="email" name="email" label="Email" />
                                <BaseInput type="password" name="password" label="Password" />

                                <Button type="primary" htmlType="submit" loading={isLoading} style={{ width: '100%' }}>
                                    Register
                                </Button>
                            </div>
                        </BaseForm>

                    </Flex>
                    <p style={{ width: '100%', textAlign: 'center' }}>Already have an account? <Link to="/login">Login</Link></p>
                </Space>
            </div>
        </Row>
    );
};

export default Register;