//./NewMeetupForm.module.module.css
import React, { useState } from "react";

//import classes from "./form.module.css";

import { useForm, SubmitHandler } from "react-hook-form";
import classes from "./form.module.css";
import { CleanHands } from "@mui/icons-material";
import ProgressBar from '../ProgressBar';
import FormHeader from './FormHeader';

// interface IFormInput {
//   //[key: string]: string;
//   title:string;
//   file:Object;
//   category:string;

// }

const NewMeetupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

const [inputData, setInputData] = useState();
  const types = ["image/png", "image/jpeg"];

  const SubmitHanler = (data) => {
    const files = data.file?.[0];
  //console.log(files.type);
  //console.log(data)
   setInputData({
    title:data.title,
    file: data.file?.[0],
    category:data.category,
  })
  };

  //console.log(inputData.file.name);

  const resetData =()=>{
    setInputData("");
  }
  return (
    <>
       <FormHeader />
      <div className={classes.div}>
        <form onSubmit={handleSubmit(SubmitHanler)}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="fname"
            
            placeholder="Title.."
            className={classes.input}
            {...register("title", { required: true })}
          />

          <label htmlFor="image">Last Name</label>
          <input
            type="file"
            id="image"
           
            placeholder="image"
            className={classes.input}
            {...register("file", { required: true })}
          />

          <label htmlFor="category">Last Name</label>
          <input
            type="text"
            id="category"
           
            placeholder="category"
            className={classes.input}
            {...register("category", { required: true })}
          />
          <button type="submit">Submit</button>
        </form>
         </div>

         <div className="output">
       
        {inputData && <ProgressBar file={inputData} setfile={resetData} />}
      </div>
    </>
  );
};
export default NewMeetupForm;
