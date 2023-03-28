import { Button, Checkbox, Form, Input, Typography } from "antd";
import {
    getAdditionalUserInfo,
    signInWithEmailAndPassword,
    signInWithPopup,
} from "firebase/auth";
import React from "react";
import { Link } from "react-router-dom";
import { auth, facebookbProvider, googleProvider } from "../../firebase/config";
import { addDocument, generateKeywords } from "../../firebase/services";
const { Title } = Typography;
import styled from "styled-components";
import { FacebookFilled, GooglePlusOutlined } from "@ant-design/icons";

const StyledContainer = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: wheat;
`;
const StyledWrapper = styled.div`
    background-color: white;
    padding: 20px;
    width: 400px;
`;
const StyledBox = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
    margin: 10px 0;
`;
const StyledButton = styled(Button)`
    margin-bottom: 10px;
    width: 100%;
`;
function Login() {
    const [form] = Form.useForm();

    const handleLogin = async (providerID) => {
        const data = await signInWithPopup(auth, providerID);
        const user = data.user;
        const details = getAdditionalUserInfo(data);
        if (details.isNewUser) {
            addDocument("users", {
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                uid: user.uid,
                providerId: data.providerId,
                keyword: generateKeywords(user.displayName),
            });
        }
    };
    const handleButtonLogin = async () => {
        const formData = form.getFieldsValue();
        try {
            await signInWithEmailAndPassword(
                auth,
                formData.email,
                formData.password,
            );
        } catch (error) {
            console.log(error.message);
            console.log(error.code);
        }
    };
    return (
        <div>
            <StyledContainer>
                <StyledWrapper>
                    <Title style={{ textAlign: "center" }} level={3}>
                        Chat App
                    </Title>
                    <Form form={form} layout="vertical">
                        <Form.Item
                            label="Email đăng nhập"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng điền email!",
                                },
                            ]}
                        >
                            <Input placeholder="Nhập email" />
                        </Form.Item>
                        <Form.Item
                            label="Mật khẩu"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng điền mật khẩu!",
                                },
                            ]}
                        >
                            <Input.Password placeholder="Nhập mật khẩu" />
                        </Form.Item>
                        <Form.Item name="remember" valuePropName="checked">
                            <Checkbox>Ghi nhớ tài khoản</Checkbox>
                        </Form.Item>
                        <StyledButton onClick={handleButtonLogin}>
                            Sign up
                        </StyledButton>
                    </Form>
                    <StyledBox>
                        <Button
                            onClick={() => handleLogin(googleProvider)}
                            icon={<GooglePlusOutlined />}
                        >
                            Google
                        </Button>
                        <Button
                            onClick={() => handleLogin(facebookbProvider)}
                            icon={<FacebookFilled />}
                        >
                            Facebook
                        </Button>
                    </StyledBox>
                    <p>
                        Bạn chưa có tài khoản?{" "}
                        <Link to="/register">Đăng ký</Link>
                    </p>
                </StyledWrapper>
            </StyledContainer>
        </div>
    );
}

export default Login;
