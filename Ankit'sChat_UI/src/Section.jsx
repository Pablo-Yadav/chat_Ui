import axios from "axios";
import { useState, useEffect } from "react";
import "./App.css";
import React from "react";
// import Avatar from "@mui/material/Avatar";

export default function Section() {
  const [post, setPost] = useState([]);
  const [chats, setChats] = useState();
  const getData = () => {
    axios
      .get("https://my-json-server.typicode.com/codebuds-fk/chat/chats")
      .then((response) => {
        console.log("responnse", response.data);
        setPost(response.data);
      });
  };
  const handleClick = (chatId) => {
    let filtered_Object = post?.filter((item, idx) => item.id === chatId);
    setChats(filtered_Object[0]?.messageList);
  };
  useEffect(() => getData(), []);
  return (
    <>
      <div
        style={{
          border: "2px solid grey",
          width: "550px",
          height: "600px",
        }}
      >
        <h3 style={{ textAlign: "center" }}>Chat Application</h3>
        <div
          className="box"
          style={{
            paddingLeft: "20px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            width: "500px",
            height: "500px",
          }}
        >
          <div
            className="div1"
            style={{
              // display: "flex",
              // flexDirection: "column",
              backgroundColor: "orange",
              width: "40%",
              height: "100%",
              overflow: "scroll",
            }}
          >
            {post?.map((object) => {
              return (
                <div
                  onClick={() => handleClick(object.id)}
                  style={{ display: "flex" }}
                >
                  <img
                    alt="Remy Sharp"
                    src={object.imageURL}
                    style={{ width: "50px", height: "50px" }}
                  />
                  <p key={object.id}>{object.title}</p>
                </div>
              );
            })}
          </div>
          <div
            style={{
              //   display: "flex",
              //   flexDirection: "column",
              backgroundColor: "blue",
              width: "50%",
              height: "100%",
              overflow: "scroll",
            }}
          >
            {chats?.length>0 ? chats?.map((object) => {
                return(
                    <div>
                        <p>{object.message}</p>
                    </div>
                )
            }):<p>No chats found</p>}
          </div>
        </div>
      </div>
    </>
  );
}
