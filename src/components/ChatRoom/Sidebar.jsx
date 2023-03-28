import React from "react";
import UserInfo from "./UserInfo";
import styled from "styled-components";
import RoomList from "./RoomList";
import { Col, Row } from "antd";

const StyledSidebar = styled.div`
    height: 100vh;
`;

function Sidebar() {
    return (
        <StyledSidebar>
            <Row>
                <Col span={24}>
                    <UserInfo />
                </Col>
                <Col span={24}>
                    <RoomList />
                </Col>
            </Row>
        </StyledSidebar>
    );
}

export default Sidebar;
