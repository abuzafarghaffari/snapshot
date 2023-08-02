import React, { useState } from "react";
import ProgressBar from "../ProgressBar";
import FormHeader from './FormHeader';



const UploadForm = () => {
  const [file, setFile] = useState<any | null>(null);
  const [error, setError] = useState<any | null>(null);
  const types = ["image/png", "image/jpeg"];

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    let selected = event.currentTarget.files?.[0];
    console.log(selected);

    if (selected && types.includes(selected.type)) {
      setFile(selected);
      setError(null);
    } else {
      setFile(null);
      setError("Please select valid image");
    }
  };

  const resetSetFile = () => {
    setFile(null);
  };

  return (<>
  
    <FormHeader />
    <form>
      <input type="file" onChange={changeHandler} />

     
    </form>

    <div className="output">
        {error && <div className="error">{error} </div>}
        {file && <div>{file.name} </div>}
        {file && <ProgressBar file={file} setfile={resetSetFile} />}
      </div>
    </>
  );
};

export default UploadForm;
