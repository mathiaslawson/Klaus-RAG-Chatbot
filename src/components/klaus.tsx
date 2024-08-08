"use client"

import React, { useEffect } from 'react'
import { klasuAction } from '~/app/actions/action'


function Klaus() {

   
       async function fetchData() {
           try {
               const data = await klasuAction("What does the Headstarter Summer Fellow Programe entail?")
               console.log(data)
          }catch(error){
              console.log(error)
          }
       }
        
 
  return (
      <>
        
      <div onClick={fetchData}>
               k - for Klaus
      </div>
      </>
  )
}

export default Klaus