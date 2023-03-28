import React from "react";
import { Link } from "react-router-dom";
import { Button, Form, Input, Typography } from "antd";
import styled from "styled-components";
import {
    createUserWithEmailAndPassword,
    getAdditionalUserInfo,
    signInWithEmailAndPassword,
    updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import { addDocument, generateKeywords } from "../../firebase/services";
const { Title } = Typography;

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
const StyledButton = styled(Button)`
    margin-bottom: 10px;
    width: 100%;
`;
function Register() {
    const [form] = Form.useForm();
    const handleSubmit = async () => {
        const formData = form.getFieldsValue();
        const displayName = formData.name;
        const data = await createUserWithEmailAndPassword(
            auth,
            formData.email,
            formData.password,
        );
        await signInWithEmailAndPassword(
            auth,
            formData.email,
            formData.password,
        );
        const user = data.user;
        const details = getAdditionalUserInfo(data);
        if (details.isNewUser) {
            await updateProfile(user, {
                displayName: displayName,
            });
            addDocument("users", {
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                uid: user.uid,
                providerId: user.providerId,
                keyword: generateKeywords(user.displayName),
            });
        }
    };
    return (
        <StyledContainer>
            <StyledWrapper>
                <Title style={{ textAlign: "center" }} level={3}>
                    Chat App
                </Title>
                <Form form={form} layout="vertical">
                    <Form.Item
                        label="Tên tài khoản"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng điền tên tài khoản!",
                            },
                        ]}
                    >
                        <Input placeholder="Nhập tên tài khoản" />
                    </Form.Item>
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
                    <StyledButton onClick={handleSubmit}>Sign up</StyledButton>
                </Form>
                <p>
                    Bạn đã có tài khoản? <Link to="/login">Đăng nhập</Link>
                </p>
            </StyledWrapper>
        </StyledContainer>
    );
}

export default Register;
