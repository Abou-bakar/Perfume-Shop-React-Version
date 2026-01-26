import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import Loader from '../components/Loader/Loader';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context
};

export const AuthProvider =({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true)

    // Login function
    const login = async (email, password) => {
        return await signInWithEmailAndPassword(auth, email, password)
    };

    // Logout function
    const logout = async () => {
        return await signOut(auth);
    };

    // Listen for auth state changes
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setCurrentUser(user);
        setLoading(false);
      });

      return unsubscribe
    }, []);

    const value = {
        currentUser,
        login,
        logout,
        loading
    };

    if (loading) {
        return <Loader fullScreen={true} />
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}