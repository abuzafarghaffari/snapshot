import { NextPage } from 'next'
import Image from 'next/image'

import React from 'react'

const Modal:NextPage<{selectedImg:string,closeModal:()=>void}> = (props) => {

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        // if (event.currentTarget.classList.contains('backdrop')) {
        // }
        props.closeModal();
      };


  return (
    <div className='backdrop' onClick ={handleClick}>
<Image src={props.selectedImg} alt="image" width={500} height={500}
 onClick ={(event)=> event.stopPropagation()}
 />

    </div>
  )
}

export default Modal