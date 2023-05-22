import { GoogleAuthProvider, signInWithRedirect, signOut } from "firebase/auth";
import { auth } from "./firebase";

const provider = new GoogleAuthProvider();

export const googleSignin = async () => {
  try {
    await signInWithRedirect(auth, provider)
  } catch (err) {
    // TODO: Sentryへ送信
    console.error(err)
  }
};

export const logout = () => {
  signOut(auth);
};
