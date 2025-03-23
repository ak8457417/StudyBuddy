import React, {useEffect, useState} from 'react';
import {createContext} from "react";
import axios from "axios";

export const FinContext = createContext();

const FinContextProvider = (props) => {

    const [token, setToken] = React.useState('');
    const [currentUser, setCurrentUser] = useState('John Carter');

    const getCurrentUser = async () => {
        try {
            const token = localStorage.getItem("token"); // Get token from localStorage

            if (!token) {
                console.log("No token found, user not logged in.");
                return;
            }

            const response = await axios.get("http://localhost:5000/user/api/getCurrentUser", {
                headers: {
                    Authorization: `Bearer ${token}` // Include token in request
                }
            });

            if (response.data.success) {
                console.log(response.data);
                setCurrentUser(response.data.user.name); // Make sure setCurrentUser is defined
            }
        } catch (e) {
            console.error("Error fetching user:", e);
        }
    };

    useEffect(() => {
        if (!token && localStorage.getItem("token")) {
            setToken(localStorage.getItem("token"));
        }
    }, []);

    const values = {
        setToken,
        token,
        getCurrentUser,
        currentUser,
        setCurrentUser,
    }

    return (
        <FinContext.Provider value={values}>
            {props.children}
        </FinContext.Provider>
    );
};

export default FinContextProvider;
