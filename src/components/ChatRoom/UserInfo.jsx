import React, { useState } from "react";
import { auth } from "../../firebase/config";
import styled from "styled-components";
import { AuthContext } from "../../Context/AuthProvider";
import { Avatar, Button, Input, Tooltip } from "antd";
import { LoginOutlined } from "@ant-design/icons";
import { SearchOutlined } from "@ant-design/icons/lib/icons";
import { MoreOutlined } from "@ant-design/icons/lib/icons";
import { Navigate } from "react-router-dom";

const StyledHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px;
    border-bottom: 1px solid whitesmoke;
    position: sticky;
    top: 0;
    z-index: 1000;
    background-color: wheat;
`;
const StyledSearch = styled.div`
    display: flex;
    align-items: center;
    padding: 15px;
    gap: 10px;
    .searchIcon {
        border: none;
        outline: none;
    }
`;

function UserInfo() {
    const {
        user: { displayName, photoURL },
        isSignOut,
        setIsSignOut,
    } = React.useContext(AuthContext);
    const handleSignOut = () => {
        auth.signOut();
        setIsSignOut(true);
    };
    return (
        <div>
            <StyledHeader>
                <Tooltip title={displayName} placement="right">
                    <Avatar src={photoURL}>
                        {photoURL ? "" : displayName?.charAt(0)?.toUpperCase()}
                    </Avatar>
                </Tooltip>
                <div>
                    <Tooltip title="Tùy chỉnh" placement="left">
                        <Button type="text" icon={<MoreOutlined />}></Button>
                    </Tooltip>
                    <Tooltip title="Đăng xuất" placement="left">
                        <Button
                            type="text"
                            icon={<LoginOutlined />}
                            onClick={handleSignOut}
                        ></Button>
                        {isSignOut ? <Navigate to="/login" /> : <></>}
                    </Tooltip>
                </div>
            </StyledHeader>
            <StyledSearch>
                <Input
                    placeholder="Tìm kiếm"
                    prefix={<SearchOutlined />}
                    className="searchIcon"
                />
            </StyledSearch>
        </div>
    );
}

export default UserInfo;
