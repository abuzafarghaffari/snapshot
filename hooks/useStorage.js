import { useEffect, useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc, onSnapshot, serverTimestamp } from "firebase/firestore";
import { projectStorage, projectFirestore } from "../firebase/config";

const useStorage = (inputdata) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

const {file,title,category} =inputdata;

  useEffect(() => {
    // references
    const storageRef = ref(projectStorage, `snapshot/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snap) => {
        let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
        setProgress(percentage);
      },
      (error) => {
        setError(error);
      },
      async () => {
        // Upload completed successfully, now we can get the download URL
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        // Save data in Firestore
        try {
          const docRef = await addDoc(collection(projectFirestore, "images"), {
            url: downloadURL,
            title: title,
            category: category,
            timeStamp: serverTimestamp(), // Use serverTimestamp() to get a valid Firestore timestamp
          });
          console.log("Document written with ID: ", docRef.id);
        } catch (e) {
          console.error("Error adding document: ", e);
        }
        setUrl(downloadURL); // Set the URL state after successful upload
      }
    );

   
  }, [file]);

  return {
    progress,
    url,
    error,
  };
};

export default useStorage;
