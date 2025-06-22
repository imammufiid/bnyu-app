import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { auth, db, FirestoreCollection } from "../../services/FirebaseService";
import { UserWater } from "../../models/UserWater";
// import { getStorage, ref, uploadString, getDownloadURL } from "firebase/storage";
// import { compressImage } from './path/to/compressImage'; // adjust path

export function useRegisterUser() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const register = async (
    email: string,
    displayName: string,
    password: string,
    photoURL: string | null
  ) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      // Register with Firebase Auth
      const result = await createUserWithEmailAndPassword(auth, email, password);
      const user = result.user;

      // Upload avatar to Firebase Storage if present
      let finalPhotoURL = "";
      if (photoURL) {
        // Compress the image
        // const compressedBase64 = await compressImage(photoURL, 128, 0.7);
        // const storage = getStorage();
        // const avatarRef = ref(storage, `avatars/${email}_${Date.now()}.jpg`);
        // const base64 = compressedBase64.replace(/^data:image\/[^;]+;base64,/, "");
        // await uploadString(avatarRef, base64, "base64");
        // finalPhotoURL = await getDownloadURL(avatarRef);
      }

      // Update display name and photoURL in Firebase Auth
      await updateProfile(user, { displayName, photoURL: finalPhotoURL || undefined });

      // Use Firebase Auth UID as the user UID
      const userData: UserWater = {
        uid: user.uid,
        email,
        displayName,
        createdAt: Timestamp.now(),
        photoURL: finalPhotoURL
      };

      // Save user to Firestore
      await setDoc(doc(db, FirestoreCollection.users, user.uid), userData);

      setSuccess("Registration successful!");
      setLoading(false);
      return userData;
    } catch (err: any) {
      setError(err.message || "Registration failed");
      setLoading(false);
      return null;
    }
  };

  return { register, loading, error, success };
}

export async function compressImage(base64: string, maxWidth = 128, quality = 0.7): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.onload = () => {
      // Calculate new size
      const scale = Math.min(maxWidth / img.width, 1);
      const width = img.width * scale;
      const height = img.height * scale;

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return reject("Canvas not supported");
      ctx.drawImage(img, 0, 0, width, height);
      // Compress to JPEG (smaller than PNG)
      const compressed = canvas.toDataURL('image/jpeg', quality);
      resolve(compressed);
    };
    img.onerror = reject;
    img.src = base64;
  });
} 