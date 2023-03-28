// import { Avatar, Typography } from "@mui/material";
import { Button, Collapse, Typography } from "antd";
import React, { useContext } from "react";
import styled from "styled-components";
import { AppContext } from "../../Context/AppProvider";
const { Panel } = Collapse;

const PanelStyled = styled(Panel)`
    &&& {
        .ant-collapse-content-box {
            padding: 0 40px;
        }
        .add-room {
            padding: 0;
        }
    }
`;
const StyledButton = styled(Button)`
    width: 100%;
    border: none;
    margin: 20px 0;
`;

const LinkStyled = styled(Typography.Link)`
    &&& {
        display: inline-block;
        width: 100%;
        padding: 10px 0;
        font-size: 15px;
        color: black;
        text-transform: capitalize;
    }
`;
function RoomList() {
    const { rooms, setSelectedRoomId, setIsAddRoomVisible } =
        useContext(AppContext);
    const handleOpen = () => {
        setIsAddRoomVisible(true);
    };
    return (
        <Collapse defaultActiveKey={["1"]}>
            <PanelStyled header="Danh sách các phòng" key="1">
                {rooms.map((room) => (
                    <LinkStyled
                        key={room.id}
                        onClick={() => setSelectedRoomId(room.id)}
                    >
                        {room.name}
                    </LinkStyled>
                ))}
                <StyledButton onClick={handleOpen}>
                    Thêm cuộc trò chuyện
                </StyledButton>
            </PanelStyled>
        </Collapse>
    );
}

export default RoomList;
