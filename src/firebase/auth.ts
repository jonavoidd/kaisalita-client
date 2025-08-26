import {
  signInWithEmailAndPassword,
  signOut,
  setPersistence,
  browserLocalPersistence,
} from "@firebase/auth";
import { auth } from "./firebase";

setPersistence(auth, browserLocalPersistence);

export const login = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

export const logout = async () => await signOut(auth);
