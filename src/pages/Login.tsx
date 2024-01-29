import { Button, Flex, Row, Space } from 'antd';
import { useLoginMutation } from '../redux/features/auth/authApi';
import { useAppDispatch } from '../redux/hooks';
import { setUser } from '../redux/features/auth/authSlice';
import { verifyToken } from '../utils/verifyToken';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import BaseForm from '../components/form/BaseForm';
import BaseInput from '../components/form/BaseInput';
import Title from 'antd/es/typography/Title';
import './Login.css'

const Login = () => {

    const navigate = useNavigate();

    const [login, { isLoading }] = useLoginMutation();
    const dispatch = useAppDispatch();

    const onFinish = async (values: any) => {
        const toastId = toast.loading('Logging in...');
        try {

            const userInfo = { email: values.email, password: values.password }
            const res = await login(userInfo).unwrap();

            const decoded: any = verifyToken(res.data.accessToken);

            dispatch(setUser({ user: decoded, token: res.data.accessToken }))
            toast.success(res.messgae || 'Logged in successfully!', { id: toastId });
            navigate(`/${decoded.role.toLowerCase()}/dashboard`);
        } catch (err: any) {
            toast.error(err?.data?.message, { id: toastId });
        }
    };


    return (
        <Row justify="center" align="middle" style={{ height: '100vh', }}>
            <div className="lines">
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
            </div>


            <div className='card-blur' >
                <Space direction="vertical" >

                    <Title level={3} style={{ width: '100%', textAlign: 'center' }}>Login to your account</Title>

                    <Flex justify="center" align="center">
                        <BaseForm onSubmit={onFinish} defaultValues={{ email: '', password: '' }}>
                            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                                <BaseInput type="email" name="email" label="Email" />
                                <BaseInput type="password" name="password" label="Password" />

                                <Button type="primary" htmlType="submit" loading={isLoading} style={{ width: '100%' }}>
                                    Login
                                </Button>
                            </div>
                        </BaseForm>

                    </Flex>
                    <p style={{ width: '100%', textAlign: 'center' }}>Don't have an account? <Link to="/register">Register</Link></p>
                </Space>
            </div>

        </Row>
    );
};

export default Login;