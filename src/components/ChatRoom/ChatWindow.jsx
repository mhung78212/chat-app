import React, { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../../Context/AppProvider";
import styled from "styled-components";
import { Button, Tooltip, Avatar, Form, Input, Alert } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import InviteMemberModal from "../Modals/InviteMemberModal";
import { addDocument } from "../../firebase/services";
import { AuthContext } from "../../Context/AuthProvider";
import useFireStore from "../../hooks/useFireStore";
import Message from "./Message";

const HeaderStyled = styled.div`
    display: flex;
    justify-content: space-between;
    height: 56px;
    padding: 0 16px;
    align-items: center;
    border-bottom: 1px solid rgb(230, 230, 230);
    .header {
        &__info {
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
        &__title {
            margin: 0;
            font-weight: bold;
        }
        &__description {
            font-size: 12px;
        }
    }
`;

const ButtonGroupStyled = styled.div`
    display: flex;
    align-items: center;
`;

const WrapperStyled = styled.div`
    height: 100vh;
`;

const ContentStyled = styled.div`
    height: calc(100% - 56px);
    display: flex;
    flex-direction: column;
    padding: 11px;
    justify-content: flex-end;
`;

const FormStyled = styled(Form)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2px 2px 2px 0;
    border: 1px solid rgb(230, 230, 230);
    border-radius: 2px;
    .ant-form-item {
        flex: 1;
        margin-bottom: 0;
    }
`;

const MessageListStyled = styled.div`
    max-height: 100%;
    overflow-y: auto;
`;
function ChatWindow() {
    const {
        selectdRoom,
        members,
        setIsInviteMemberVisible,
        isInviteMemberVisible,
    } = useContext(AppContext);
    const {
        user: { uid, photoURL, displayName },
    } = useContext(AuthContext);

    const [inputValue, setInputValue] = useState("");
    const [form] = Form.useForm();

    const inputRef = useRef(null);
    const messageListRef = useRef(null);

    const handleOnSubmit = () => {
        addDocument("messages", {
            text: inputValue,
            uid,
            photoURL,
            roomId: selectdRoom.id,
            displayName,
        });

        form.resetFields(["message"]);
        // if (inputRef?.current) {
        //     setTimeout(() => {
        //         inputRef.current.focus();
        //     });
        // }
    };
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const condition = React.useMemo(
        () => ({
            fieldName: "roomId",
            operator: "==",
            compareValue: selectdRoom.id,
        }),
        [selectdRoom.id],
    );

    const messages = useFireStore("messages", condition);

    useEffect(() => {
        // scroll to bottom after message changed
        if (messageListRef?.current) {
            messageListRef.current.scrollTop =
                messageListRef.current.scrollHeight + 50;
        }
    }, [messages]);
    return (
        <WrapperStyled>
            {selectdRoom.id ? (
                <>
                    <HeaderStyled>
                        <div className="header__info">
                            <p className="header__title">{selectdRoom.name}</p>
                            <span className="header__description">
                                {selectdRoom.description}
                            </span>
                        </div>
                        <ButtonGroupStyled>
                            {selectdRoom.name ? (
                                <>
                                    <Button
                                        icon={<UserAddOutlined />}
                                        onClick={() =>
                                            setIsInviteMemberVisible(true)
                                        }
                                        type="text"
                                    >
                                        Mời
                                    </Button>
                                </>
                            ) : (
                                <></>
                            )}
                            {isInviteMemberVisible ? (
                                <InviteMemberModal />
                            ) : (
                                <></>
                            )}

                            <Avatar.Group size="small" maxCount={2}>
                                {members.map((member) => (
                                    <Tooltip
                                        title={member.displayName}
                                        key={member.id}
                                    >
                                        <Avatar src={member.photoURL}>
                                            {member.photoURL
                                                ? ""
                                                : member.displayName
                                                      ?.charAt(0)
                                                      ?.toUpperCase()}
                                        </Avatar>
                                    </Tooltip>
                                ))}
                            </Avatar.Group>
                        </ButtonGroupStyled>
                    </HeaderStyled>
                    <ContentStyled>
                        <MessageListStyled ref={messageListRef}>
                            {messages.map((mess) => (
                                <Message
                                    key={mess.id}
                                    text={mess.text}
                                    photoURL={mess.photoURL}
                                    displayName={mess.displayName}
                                    createdAt={mess.createdAt}
                                />
                            ))}
                        </MessageListStyled>
                        <FormStyled form={form}>
                            <Form.Item name="message">
                                <Input
                                    ref={inputRef}
                                    onChange={handleInputChange}
                                    onPressEnter={handleOnSubmit}
                                    placeholder="Nhập tin nhắn..."
                                    bordered={false}
                                    autoComplete="off"
                                />
                            </Form.Item>
                            <Button type="primary" onClick={handleOnSubmit}>
                                Gửi
                            </Button>
                        </FormStyled>
                    </ContentStyled>
                </>
            ) : (
                <Alert
                    message="Hãy chọn phòng"
                    type="info"
                    showIcon
                    style={{ margin: 5 }}
                    closable
                />
            )}
        </WrapperStyled>
    );
}

export default ChatWindow;
