import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { initializeApp } from "firebase/app";
import firebaseConfig from "@/firebase/firebase.config";

const useFirebaseFileUpload = () => {
  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);

  const uploadFile = async (file) => {
    const storageRef = ref(storage, `images/${file.name}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  };

  return { uploadFile };
};

export default useFirebaseFileUpload;



