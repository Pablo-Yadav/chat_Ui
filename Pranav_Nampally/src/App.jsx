import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import axios from "axios";
import Avatar from "@mui/material/Avatar";

function App() {
  const [res, setRes] = useState([]);
  const [conversation, setConversation] = useState([]);
  const [sender, setSender] = useState("");

  useEffect(() => {
    axios
      .get("https://my-json-server.typicode.com/codebuds-fk/chat/chats")
      .then((res) => {
        setRes(res.data);
        console.log(res.data);
      });
  }, []);

  function handleChat(id) {
    const filteredConv = res.filter((i) => i.id === id);
    console.log("list", filteredConv[0]?.messageList);
    setConversation(filteredConv[0]?.messageList);
  }

  function handleDate(ts) {
    const date = new Date(ts);
    console.log(date.toLocaleDateString("en-UK"));
    return date.toLocaleDateString("en-UK");
  }

  return (
    <>
      {/* <Box> */}
      {/* {console.log(res)} */}
      {/* {res?.map((item, index) => ( */}
      {/* <Grid container>
            <Grid item direction="column">
              <Grid item direction="row">
                <Avatar src={item.imageURL} alt={item.title} />
                <p>{item.title}</p>
              </Grid>
            </Grid>
          </Grid> */}
      {/* ))} */}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "600px",
          height: "500px",
          border: "1px solid black",
          padding: "5vw",
          paddingTop: "1vw",
        }}
      >
        <h1>Chat App</h1>
        <div style={{ display: "flex", height: "90%", width: "100%" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              overflow: "scroll",
              width: "40%",
              backgroundColor: "yellow",
              padding: "1vw",
            }}
          >
            {res?.map((item, index) => {
              return (
                <>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      gap: "2vw",
                    }}
                    onClick={() => {
                      handleChat(item.id);
                    }}
                  >
                    <Avatar src={item.imageURL} alt={item.title} />
                    <p style={{ margin: "0" }}>{item.title}</p>
                  </div>
                  {index < res.length - 1 && (
                    <div
                      style={{
                        minHeight: "1px",
                        backgroundColor: "black",
                        margin: "4px",
                        boxSizing: "border-box",
                      }}
                    />
                  )}
                </>
              );
            })}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              overflow: "scroll",
              width: "60%",
              backgroundColor: "aquamarine",
              padding: "1vw",
            }}
          >
            {conversation.length !== 0 ? (
              conversation?.map((chat, idx) => {
                return (
                  <>
                    <div
                      style={{
                        display: "flex",
                        flexDirection:
                          chat?.sender === "BOT" ? "row" : "row-reverse",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        gap: "1vw",
                        backgroundColor: "#ece5dd",
                        marginBottom: "2px",
                        borderRadius: "10px",
                        // border: "1px solid black",
                      }}
                    >
                      <Avatar>{chat?.sender === "BOT" ? "B" : "U"}</Avatar>
                      {/* {chat.sender==='BOT'} */}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems:
                            chat?.sender === "BOT" ? "flex-start" : "flex-end",
                        }}
                      >
                        <p style={{ margin: "0" }}>{chat.message}</p>
                        <p
                          style={{
                            margin: "0",
                            marginTop: "1px",
                            fontSize: "10px",
                          }}
                        >
                          {handleDate(chat.timestamp)}
                        </p>
                      </div>
                    </div>
                  </>
                );
              })
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                No Chats Found
              </div>
            )}
          </div>
        </div>
      </div>
      {/* </Box> */}
    </>
  );
}

export default App;
