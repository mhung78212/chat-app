import { Space, Spin } from "antd";
import React from "react";
import styled from "styled-components";

const StyledWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
`;
function Loading() {
    return (
        <StyledWrapper>
            <Space direction="vertical" style={{ width: "100%" }}>
                <Spin tip="Loading" size="large">
                    <div className="content" />
                </Spin>
            </Space>
        </StyledWrapper>
    );
}

export default Loading;
