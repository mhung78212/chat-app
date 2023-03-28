import Login from "./components/Login";
import Register from "./components/Register";
import "./style.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ChatRoom from "./components/ChatRoom";
import AuthProvider from "./Context/AuthProvider";
import AppProvider from "./Context/AppProvider";
import AddRoomModal from "./components/Modals/AddRoomModal";
import InviteMemberModal from "./components/Modals/InviteMemberModal";

function App() {
    return (
        <Router>
            <AuthProvider>
                <AppProvider>
                    <Routes>
                        <Route path="/" element={<ChatRoom />} />
                        <Route path="register" element={<Register />} />
                        <Route path="login" element={<Login />} />
                    </Routes>
                    {/* Thêm phòng chat */}
                    <AddRoomModal />
                </AppProvider>
            </AuthProvider>
        </Router>
    );
}

export default App;
