import React, { useContext, useState } from 'react'
import { Sandpack } from "@codesandbox/sandpack-react";
import DataContext from '../../Utils/Context';

function EditiorCom() {

  const {output} = useContext(DataContext);
    
     return (
          <>
        <div className=" px-20 rounded-3xl ">
        <Sandpack
      files={{
        "/index.html": `${output}`
      }} 
      options={{
        
        showLineNumbers: true,
        showNavigator: false,
        editorHeight: 695,
        externalResources: ["https://unpkg.com/lucide@latest"],

        
      }}
      theme="dark" 
      template="static"
    />
        
        </div>
          </>
     )
}

export default EditiorCom
