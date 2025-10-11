import { useEffect, useState } from 'react';
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref } from 'firebase/database';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA7ckHflbzb_39M0OLRM-mYzJjWb1-wonM",
  authDomain: "cs392-react-challenge.firebaseapp.com",
  databaseURL: "https://cs392-react-challenge-default-rtdb.firebaseio.com",
  projectId: "cs392-react-challenge",
  storageBucket: "cs392-react-challenge.firebasestorage.app",
  messagingSenderId: "835765816103",
  appId: "1:835765816103:web:8c8926c1d52c33fb57b702",
  measurementId: "G-XFMQEDC3HM"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);
export const auth = getAuth(firebase);
export const googleProvider = new GoogleAuthProvider();


export function useDataQuery<T>(path: string): [T, boolean, Error | undefined] {
    const [data, setData] = useState<unknown>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error>();

    useEffect(() => {
        setData(undefined);
        setLoading(true);
        setError(undefined);

        const dbRef = path && path !== '/' ? ref(database, path) : ref(database);

        return onValue(
            dbRef,
            (snapshot) => {
                setData(snapshot.val());
                setLoading(false);
            },
            (err) => {
                setError(err as Error);
                setLoading(false);
            }
        );
    }, [path]);

    return [data as T, loading, error];
};