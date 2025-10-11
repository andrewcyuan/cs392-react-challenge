import { signOut } from "firebase/auth";
import { auth } from "../../utils/firebase";

export default function GoogleSignOutButton() {
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log("Signed out successfully");
    } catch (err) {
      console.error("Sign-out error:", err);
    }
  };

  return (
    <button
      onClick={handleSignOut}
      className="bg-gray-500 hover:bg-gray-600 rounded-lg text-white px-2 py-1"
    >
      Sign out
    </button>
  );
}
