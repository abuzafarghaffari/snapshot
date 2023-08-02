import { useEffect, useState } from 'react';
import { onSnapshot, query, collection, orderBy} from "firebase/firestore";
import {projectFirestore} from '../firebase/config';
import {DOCS} from "../pages/index";


const useFirestore = (collections:string) => {
  const [docs, setDocs] = useState<DOCS[]>([]);

  useEffect(() => {
    const myQuery = query(
      collection(projectFirestore, collections),
      orderBy('timeStamp', 'desc')
    );

    const unsubscribe = onSnapshot(myQuery, (snap) => {
      let documents:any = [];
      snap.forEach((doc) => {
        documents.push({ ...doc.data(), id: doc.id });
      });
      setDocs(documents);
    });

    return () => unsubscribe();
  }, [collections]);

  return { docs };
};

export default useFirestore;
