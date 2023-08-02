import React, { useEffect } from 'react'
import useStorage from '../hooks/useStorage'
import { NextPage } from 'next'
import { useRouter } from 'next/navigation';


const ProgressBar:NextPage<{file:any,setfile:()=>void}> = (props) => {

const {url, progress} = useStorage(props.file);
const {setfile} = props;
const router = useRouter();

useEffect(()=>{

  if(url){
    setfile();
    router.push('/')
  }

},[url,setfile])
// console.log(progress , url)
  return (
    <div className='progress-bar' style={{width:progress + '%', }}></div>
  )
}

export default ProgressBar