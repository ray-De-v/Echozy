// src/Context/authContext.jsx

import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Simulate an async call to fetch user data
        const fetchUser = async () => {
            // Simulating loading
            setLoading(true);
            const response = await new Promise((resolve) => {
                // Simulating API call delay
                setTimeout(() => resolve({ username: 'exampleUser' }), 2000);
            });
            setUser(response);
            setLoading(false);
        };
        fetchUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
