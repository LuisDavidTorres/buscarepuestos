import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAq78VeZGAeFgxDd6h-PfP9EpFZdfq1qdA",
  authDomain: "busca-repuestos-cf287.firebaseapp.com",
  databaseURL: "https://busca-repuestos-cf287-default-rtdb.firebaseio.com",
  projectId: "busca-repuestos-cf287",
  storageBucket: "busca-repuestos-cf287.appspot.com",
  messagingSenderId: "1016458967033",
  appId: "1:1016458967033:web:2c732f6f663c86baa0ef28",
  measurementId: "G-5MNC75EW5X",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

async function resizeImageWithPadding(file: File, width: number, height: number): Promise<File> {
  return new Promise((resolve, reject) => {
    const img = document.createElement("img");
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (ctx) {
        const aspectRatio = img.width / img.height;
        const targetAspectRatio = width / height;

        let drawWidth = width;
        let drawHeight = height;
        let offsetX = 0;
        let offsetY = 0;

        if (aspectRatio > targetAspectRatio) {
          drawHeight = width / aspectRatio;
          offsetY = (height - drawHeight) / 2;
        } else {
          drawWidth = height * aspectRatio;
          offsetX = (width - drawWidth) / 2;
        }

        canvas.width = width;
        canvas.height = height;

        const paddingColor = "rgba(244, 241, 241, 0.5)";
        ctx.fillStyle = paddingColor;
        ctx.fillRect(0, 0, width, height);

        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

        canvas.toBlob((blob) => {
          if (blob) {
            resolve(new File([blob], file.name, { type: file.type }));
          } else {
            reject(new Error("Image resizing failed"));
          }
        }, file.type);
      } else {
        reject(new Error("Canvas context is null"));
      }
    };

    img.onerror = (error) => {
      reject(error);
    };
  });
}

export async function uploadFile(files: File[]) {
  const uploadPromises = [];
  for (const file of files) {
    const resizedFile = await resizeImageWithPadding(file, 1919, 1079);
    const storageRef = ref(storage, `images/${file.name}` + Date.now());
    uploadPromises.push(uploadBytes(storageRef, resizedFile));
  }

  await Promise.all(uploadPromises);

  const downloadUrls = [];
  
  for (const uploadPromise of uploadPromises) {
    const snapshot = await uploadPromise;
    const url = await getDownloadURL(snapshot.ref);
    downloadUrls.push(url);
  }

  return { downloadUrls };
}

export async function UploadDocuemnts(files: File[]) {
  const uploadPromisesDocuments = []

  for (const file of files){
    const storageRef = ref(storage, `documents/${file.name}` + Date.now())
    uploadPromisesDocuments.push(uploadBytes(storageRef, file))
  }

  await Promise.all(uploadPromisesDocuments);
  const downloadUrlsDocuments = [];

  for(const uploadPromisesDocument of uploadPromisesDocuments){
    const snapshot = await uploadPromisesDocument;
    const url = await getDownloadURL(snapshot.ref);
    downloadUrlsDocuments.push(url)
  }
  
  return { downloadUrlsDocuments }
}

