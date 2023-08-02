import { useState } from "react";
import styles from "@/styles/Home.module.css";
import UploadForm from "../components/Form/UploadForm";
import ImagesGrid from "../components/ImagesGrid";
import Modal from "@/components/Modal";
import useFirestore from "../hooks/useFirestore";

//const docs = useFirestore("images")

export interface DOCS {
  category: string;
  timeStamp: any;
  title: string;
  url: string;
}

export default function Home() {

  const [selectedImg, setSelectedImg] = useState<string>("");

  const lists = useFirestore("images");
  
  const setImageHandler = (img: string) => {
    setSelectedImg(img);
  };

  const closeModalHandler = () => {
    setSelectedImg("");
  };
  return (
    <>
      {/* <UploadForm /> */}
      <ImagesGrid setImage={setImageHandler} />
      {selectedImg && (
        <Modal selectedImg={selectedImg} closeModal={closeModalHandler} />
      )}
    </>
  );
}

