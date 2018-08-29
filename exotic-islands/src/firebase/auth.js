import { auth } from './firebase';

export const registerUser = (email, password) => {
    auth.createUserWithEmailAndPassword(email, password);
}
export const loginUser = (email, password) => {
    auth.signInWithEmailAndPassword(email, password);
}
export const logout = () => {
    auth.signOut();
}


