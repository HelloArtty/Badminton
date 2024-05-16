import { createContext } from 'react';

export const ContextValue = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
};

export const AuthContext = createContext(null);
