import './App.css'
import axios from "axios";
import React from "react";

export default function App()
{
  const baseURL = "https://my-json-server.typicode.com/codebuds-fk/chat/chats";
  const [post, setPost] = React.useState([]);
  const [chat, setChat] = React.useState([]);
  
  if(post.length === 0){
    axios.get(baseURL).then((response) => {
      setPost(response.data);
    });
  }
  console.log("GET",post);

  function handleClick(idx)
  {
    let temp = [];
    for(let i=0;i<post[idx].messageList.length;i++)
    temp.push(post[idx].messageList[i]);
    setChat(temp);
    console.log(chat);
  }

  function Users()
  {
    return(
      <div className='users'>
        {post.map((item,idx) => {
          return (
            <div className='row' onClick={() => handleClick(idx)}>
              <img src={post[idx].imageURL} alt="User" className='image'/>
              <div className='user'>{post[idx].title}</div>
            </div>
          )
        })}
      </div> 
    )
  }
  function Chats()
  {
    return (
      <div className='chats'>
        {chat.map((item,idx) => {
          if(chat[idx].sender == "BOT")
          {
            return (
              <div style={{textAlign: "left"}}>{chat[idx].message}</div>
            )
          }
          else
          {
            return (
              <div style={{textAlign: "right"}}>{chat[idx].message}</div>
            )
          }
        })}
      </div> 
    )
  }
  return (
    <>
    <h3>Chat Application</h3>
    <div className="box">
      <Users />
      <Chats />
    </div>
    </>
  )
}