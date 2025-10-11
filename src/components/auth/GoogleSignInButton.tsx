import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../utils/firebase.ts";

export default function GoogleSignInButton() {
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      // User info
      const user = result.user;
      console.log("Signed in as:", user.displayName, user.email);
    } catch (err) {
      console.error("Google Sign-In error:", err);
    }
  };

  return (
    <button 
      onClick={handleGoogleSignIn}
      className="bg-blue-500 hover:bg-blue-600 rounded-lg text-white px-2 py-1"
    >
      Sign in with Google
    </button>
  );
}
