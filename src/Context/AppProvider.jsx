import React, { useState } from "react";
import useFireStore from "../hooks/useFireStore";
import { AuthContext } from "./AuthProvider";

export const AppContext = React.createContext();

export default function AppProvider({ children }) {
    const [isAddRoomVisible, setIsAddRoomVisible] = useState(false);
    const [isInviteMemberVisible, setIsInviteMemberVisible] = useState(false);

    const [selectedRoomId, setSelectedRoomId] = useState("");

    const {
        user: { uid },
    } = React.useContext(AuthContext);

    const roomCondition = React.useMemo(() => {
        return {
            fieldName: "members",
            operator: "array-contains",
            compareValue: uid,
        };
    }, [uid]);

    const rooms = useFireStore("rooms", roomCondition);

    const selectdRoom = React.useMemo(
        () => rooms.find((room) => room.id === selectedRoomId) || {},
        [rooms, selectedRoomId],
    );

    const usersCondition = React.useMemo(() => {
        return {
            fieldName: "uid",
            operator: "in",
            compareValue: selectdRoom.members,
        };
    }, [selectdRoom]);

    const members = useFireStore("users", usersCondition);
    return (
        <AppContext.Provider
            value={{
                rooms,
                isAddRoomVisible,
                setIsAddRoomVisible,
                selectedRoomId,
                setSelectedRoomId,
                selectdRoom,
                members,
                isInviteMemberVisible,
                setIsInviteMemberVisible,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}
