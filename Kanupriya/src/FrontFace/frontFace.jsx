import axios from 'axios';
import {useEffect,useState} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';



const baseURL = 'https://my-json-server.typicode.com/codebuds-fk/chat/chats'

export default function FrontFace(){

    const [chat,setChat] = useState([])
    const [messages,setMessages] = useState([])

    useEffect(() => {
        axios.get(baseURL)
        .then((response) => {
            console.log('response data',response.data);
            setChat(response.data)
            })
        .catch((e)=>console.log("error",e))
    },[])

    function handleClick(e,idx){
        const clickedProduct = chat?.filter(product => product.id === idx)
        //[{}]
        console.log("clicked product",clickedProduct)
        setMessages(clickedProduct?.[0]?.messageList)
    }
    console.log("messages", messages)

    return (
        
            <Box sx={{
                    width: '500px',
                    height:'500px',
                    border: '2px solid grey',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-around',
                    alignItems: 'center'
                }}>

                    <Box sx={{textAlign : 'center'}}>
                        <Typography variant='h2'>Chat Application</Typography>
                    </Box>

                    <Box style={{
                         width: '95%',
                         height : '75%',
                         display : 'flex', 
                         flexDirection: 'row', 
                         justifyContent: 'space-around',
                        //  overflow:'scroll',
                         }}>

                        <Box sx={{
                            width: '40%',
                            backgroundColor: 'lightseagreen',
                            flexDirection: 'column',
                            gap: '10px', 
                            overflow : 'scroll'}}>

                            {console.log("chat",chat)}
                        
                            {chat?.map((item) => {
                                return (
                                    <Box sx={{ 
                                        display : 'flex', 
                                        flexDirection: 'row',//height:'20%',
                                        gap : '20px'}} >

                                        <Avatar alt={item.title} src={item.imageURL} />
                                        <div  style={{cursor:"pointer"}} onClick={(e) => handleClick(e,item?.id)}>{item.title}</div>

                                    </Box>
                                )
                            })}
                        </Box>

                        <Box sx={{
                            width: '60%',
                            backgroundColor: 'lightpink',
                            gap: '10px',
                            overflow: 'scroll'}}>
                        
                        {messages?.map((chat)=>{
                                console.log("chatss",chat)
                                if(chat?.length === 0){
                                   return(
                                    <p>No chat available for the product</p>
                                   )
                                }
                                else if(chat?.sender === 'BOT'){
                                    return(
                                    <Typography variant='h6' textAlign='left'>
                                        {chat?.message}
                                    </Typography>)
                                }
                                else{
                                    return(
                                         <Typography variant='h6' textAlign='right'>
                                            {chat?.message}
                                        </Typography>
                                    )
                                }
                                
                            })
                        }
                        </Box>

                    </Box>

            </Box>
    )
}