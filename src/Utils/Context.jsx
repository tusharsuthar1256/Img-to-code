import { createContext, useState  } from "react";

const DataContext = createContext();

export const DataContextProvider = ({children}) => {
     const [file,setFile] = useState("");
     const [userPrompt,setUserPrompt] = useState("Hello Guuys");

     const [output,setOutput] = useState("");
  const [loading,setLoading] = useState(false);



     return(
          <DataContext.Provider value={{file,setFile,userPrompt,setUserPrompt,output,setOutput,loading,setLoading}}>
               {children}
          </DataContext.Provider>
     )
}

export default DataContext;