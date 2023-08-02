import React, { useEffect, useState } from "react";
import useFirestore from "../hooks/useFirestore";
import Image from "next/image";
import { NextPage } from "next";
import { DOCS } from "../pages/index";
import Header from "./Header";
import classes from "./imageGring.module.css";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


export interface PROPS {
  setImage: (img: string) => void;
}

const simpleStyle ={
  maxWidth: "90%", 
  "&:hover":{
    transform: "scale(1.5)"
  }
}

// const simpleStyle ={
//   root: {
//     maxWidth: 310,
//     transition: "transform 0.15s ease-in-out",
//     "&:hover": { transform: "scale3d(1.05, 1.05, 1)" },
//   },
// }

const ImagesGrid: NextPage<PROPS> = (props) => {
const [searchInput , setSearchInput] = useState("");
const [filterInput, setFilterInput] = useState("All"); // filter input
const [serachParameter] = useState(["title"]);
  const { docs } = useFirestore("images");

  console.log("docs", docs);

  const Search = (items:any)=>{
    //console.log(items);
    return items.filter((item:any)=>{
if(item.category == filterInput){
    return serachParameter.some((newItem)=>{
return item[newItem].toString().toLowerCase().indexOf(searchInput.toLowerCase()) > -1;
    })
} else if(filterInput == "All"){
    return serachParameter.some((newItem)=>{
return item[newItem].toString().toLowerCase().indexOf(searchInput.toLowerCase()) > -1;
    })
}
    })
    }

  console.log("search" ,Search(docs))
  // image for modal
  const clickHandler = (url: string) => {
    props.setImage(url);
  };

  const searchHandler =(input:string)=>{
setSearchInput(input)
  }

  const filterHandler =(input:string)=>{
setFilterInput(input)
  }
 
//console.log(filterInput)
  return (
    <>
      <Header searchInput ={searchHandler} setFilterInput ={filterHandler} filterInput ={filterInput} />

     <div className={classes.imageGrid}>
        {docs &&
          Search(docs).map((doc: any) => (
            <Card key={doc.id} sx={simpleStyle} onClick={() => clickHandler(doc.url)} id="card">
            <CardMedia
              sx={{ height: 200 }}
              image={doc.url}
              title="green iguana"
             
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
               Title: {doc.title}
              </Typography>
              <Typography variant="h6" color="text.secondary">
               Category: {doc.category}
              </Typography>
            </CardContent>
          
          </Card>
          ))}
      </div>
    </>
  );
};

export default ImagesGrid;
