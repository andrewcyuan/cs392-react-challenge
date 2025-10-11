import { useEffect, useState } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "./firebase";
import { useDataQuery } from "./firebase";

export function useAuth() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            setUser(firebaseUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    return { user, loading };
}

export const useIsAdmin = (): boolean => {
    const { user } = useAuth();
    const [isAdmin, _isLoading, _error] = useDataQuery(`/admins/${user?.uid}`);
    return isAdmin as boolean;
};