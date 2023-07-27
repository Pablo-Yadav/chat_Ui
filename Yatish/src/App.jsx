import { useState ,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from "axios"
import Avatar from '@mui/material/Avatar'

import { BrowserRouter as Router,Route,Routes,Link,useNavigate } from "react-router-dom";
import React ,{Fragment} from "react";
    // import "./index.css"
const baseURL="https://my-json-server.typicode.com/codebuds-fk/chat/chats"
    
let flg=true;
    function App() {
     let [items,setItems]=useState([]);
     let [respectiveItems,setRespectiveItems]=useState([]);
     if(items.length===0){
        axios.get(baseURL).then((response) => {
            setItems(response?.data);
          });
     }

     function handleClick(index){
          let obj=items[index];
          let arr=obj.messageList;
          let object1=<div key={items[index].id}style={{textAlign:"center"}}>
                   No Chat Found
          </div>;
          if(arr.length!==0){
            setRespectiveItems(arr.map((item,ind)=>{
                let resObj;
                if(item.sender==='BOT'){
                  resObj=<div key={ind}style={{
                    textAlign:"left",
                    fontSize:"2em",
                    marginBottom:"30px",
                    display:"flex"
                  }}>
                    <Avatar  style={{
                        width:"50px",
                        height:"50px"
                    }}
                    src="../user.png"/>
                         <div>{item.message}</div>

                  </div>;
                }else{
                    resObj=<div style={{
                        textAlign:"right",
                        fontSize:"2em",
                    marginBottom:"30px",
                    display:"flex"

                      }}>
                         <div>{item.message}</div>
                       
                       <img  style={{
                        width:"50px",
                        height:"50px"
                    }}
                    src="../user.png"/>
                      </div>;
                }
              return(resObj);
            }));
          }else{
            setRespectiveItems([object1]);
          }
          


     }
        

          console.log("Items are ",items)
      return (
        <>
        
        <div style={{textAlign:"center"}}>
        <h5> Chat App!!!</h5>

        </div>

        <div style={{
        border:"1px solid black",
        width:"500px",
        height:"500px",
        display:"flex",
        padding:"10px"
       }}>
        <div style={{backgroundColor:"#e7faac",
         width:"100%",
         height:"100%",
         overflow:"auto"
    }}>
            {items.map((item,idx)=>{
              return(
                <div key={idx} style={{display:"flex",gap:"1em",borderBottom:"1px solid black",justifyContent:'space-around',
                borderLeft:"1px solid black"
                
                }}>
                    <Avatar style={{width:"50px",
                height:"50px",
                   marginTop:"15px",
                   marginBottom:"15px"
                }}src={`${item.imageURL}`} />
                    
                    
                    <button style={{marginBottom:"20px",
                     border:"none",
                     fontSize:"1em",
                     backgroundColor:"#e7faac",
                     cursor:"pointer"
                }}
                onClick={()=>{handleClick(idx);}}
                
                >{`${item.title}`}</button>
                </div>
              );
            })}
        </div>

        <div style={{backgroundColor:"#edeff0",
           width:"100%",
           height:"100%",
         overflow:"auto"

    }}>
        {respectiveItems}

        </div>

       </div>
        </>
      
        
      );
    
}


export default App
