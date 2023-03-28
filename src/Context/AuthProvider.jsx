import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { auth } from "../firebase/config";

export const AuthContext = React.createContext();

export default function AuthProvider({ children }) {
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [isSignOut, setIsSignOut] = useState(true);

    React.useEffect(() => {
        const unsub = auth.onAuthStateChanged((user) => {
            if (user) {
                const { displayName, email, photoURL, uid } = user;
                setUser({
                    displayName,
                    email,
                    photoURL,
                    uid,
                });
                setIsLoading(false);
                setIsSignOut(false)
                navigate("/");
                return;
            }
            setIsLoading(false);
            setIsSignOut(true)
        });

        // Clean function
        return () => {
            unsub();
        };
    }, [navigate]);

    return (
        <AuthContext.Provider value={{ user, isSignOut, setIsSignOut }}>
            {isLoading ? <Loading /> : children}
        </AuthContext.Provider>
    );
}
