// import axios from "axios"
// import { useState,useEffect } from "react"
// import { BACKEND_URL } from "../../../config"

// export function useContent(){

//     const [contents,setContents] = useState([])

//     function refresh(){
//         axios.get(`${BACKEND_URL}/api/v1/content`,{
//             headers:{
//                 "Authorization":localStorage.getItem("token")
//             }
//         }).then((response)=>{
//             setContents(response.data.content)
//         })
//     }
//     useEffect(()=>{

//         refresh()
//         const interval = setInterval(()=>{
//             refresh()
//         }, 5000)
        
//         return()=>{
//             clearInterval(interval)
//         }

//     },[])

//     return {contents,refresh}
// }





import axios from "axios";
import { useState, useEffect } from "react";
import { BACKEND_URL } from "../../../config";

export function useContent() {
  const [contents, setContents] = useState([]);

  function refresh() {
    const token = localStorage.getItem("token");
    if (!token) {
      // Skip request if no token
      return;
    }

    axios
      .get(`${BACKEND_URL}/api/v1/content`, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        setContents(response.data.content);
      })
      .catch((error) => {
        console.error("Error fetching content:", error);
        // Optionally handle errors (e.g., clear contents or redirect)
      });
  }

  useEffect(() => {
    refresh();
    const interval = setInterval(() => {
      refresh();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return { contents, refresh };
}