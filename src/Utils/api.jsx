import { UploadPrompt } from "./prompts";
import {GoogleGenerativeAI} from "@google/generative-ai";

export const fileToGenerativePart = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    
    reader.onloadend = () =>
      resolve({
           inlineData: {
             data: reader.result.split(",")[1], // Extracts Base64 data without the prefix
             mimeType: file.type,
           },
         });
         
         reader.readAsDataURL(file);
        });
      };
      

      export const GenerateResponse = async (userPrompt) => {
        const MAX_RETRIES = 5; // Maximum retries
        const RETRY_DELAY = 2000; // Delay in milliseconds

      
        for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
          try {
            const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
            const result = await model.generateContent([ userPrompt,UploadPrompt]);
      
            if (result?.response?.text) {
              const responseText = await result.response.text();
              return responseText;
            } else {
              throw new Error("Unexpected response structure");
            }
          } catch (error) {
            if (error.message.includes("503") && attempt < MAX_RETRIES) {
              console.warn(`Attempt ${attempt} failed. Retrying in ${RETRY_DELAY}ms...`);
              await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
            } else {
              console.error("Error while generating response:", error);
              return `Error while generating response: ${error.message}`;
            }
          }
        }
      };
      
      



