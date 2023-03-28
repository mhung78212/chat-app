import { Avatar, Form, Modal, Select, Spin } from "antd";
import {
    collection,
    doc,
    onSnapshot,
    query,
    updateDoc,
    where,
} from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../Context/AppProvider";
import { db } from "../../firebase/config";

function DebounceSelect({ curMembers, ...props }) {
    const [options, setOptions] = useState([]);
    const [fetching, setFetching] = useState(false);

    const onSearch = (search) => {
        setOptions([]);
        setFetching(true);
        const collectionRef = query(
            collection(db, "users"),
            where("keyword", "array-contains", search),
        );
        onSnapshot(collectionRef, (snapshot) => {
            const documents = snapshot.docs
                .map((doc) => ({
                    label: doc.data().displayName,
                    value: doc.data().uid,
                    photoURL: doc.data().photoURL,
                }))
                .filter((opt) => !curMembers.includes(opt.value));
            setFetching(false);
            setOptions(documents);
        });
    };
    useEffect(() => {
        return () => {
            // clear when unmount
            setOptions([]);
        };
    }, []);
    return (
        <Select
            labelInValue
            filterOption={false}
            onSearch={onSearch}
            notFoundContent={fetching ? <Spin size="small" /> : null}
            {...props}
        >
            {options.map((opt) => (
                <Select.Option
                    key={opt.value}
                    value={opt.value}
                    title={opt.label}
                >
                    <Avatar size="small" src={opt.photoURL}>
                        {opt.photoURL
                            ? ""
                            : opt.label?.charAt(0)?.toUpperCase()}
                    </Avatar>
                    {` ${opt.label}`}
                </Select.Option>
            ))}
        </Select>
    );
}
const InviteMemberModal = () => {
    const {
        isInviteMemberVisible,
        setIsInviteMemberVisible,
        selectedRoomId,
        selectdRoom,
    } = useContext(AppContext);
    const [value, setValue] = useState([]);
    const [form] = Form.useForm();

    const handleOk = () => {
        form.resetFields();
        setValue([]);
        const roomRef = doc(db, "rooms", selectedRoomId);
        updateDoc(roomRef, {
            members: [...selectdRoom.members, ...value.map((val) => val.value)],
        });
        setIsInviteMemberVisible(false);
    };
    const handleCancel = () => {
        form.resetFields();
        setIsInviteMemberVisible(false);
        setValue([]);
    };
    return (
        <>
            <div>
                <Modal
                    title="Thêm thành viên"
                    visible={isInviteMemberVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                >
                    <Form form={form} layout="vertical">
                        <DebounceSelect
                            mode="multiple"
                            name="search-user"
                            label="Tên các thành viên"
                            placeholder="Nhập tên thành viên"
                            style={{ width: "100%" }}
                            onChange={(newValue) => setValue(newValue)}
                            value={value}
                            curMembers={selectdRoom.members}
                        ></DebounceSelect>
                    </Form>
                </Modal>
            </div>
        </>
    );
};

export default InviteMemberModal;
