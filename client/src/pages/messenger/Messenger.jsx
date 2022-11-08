import "./messenger.css";
import Topbar from "../../components/topbar/Topbar";
import Conversation from "../../components/conversation/Conversation";
import Message from "../../components/message/Message";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from 'axios';

const Messenger = () => {
    const [conv, setConv] = useState([]);
    const [chat, setChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const { user } = useContext(AuthContext);
    const scrollRef = useRef();

    useEffect(() => {
        const getConv = async () => {
            try {
                const res = await axios.get("/conversation/" + user._id); setConv(res.data);
            } catch (e) {
                console.log(e);
            }
        };
        getConv();
    }, [user._id]);
    useEffect(() => {
        const getMessages = async () => {
            try {
                const res = await axios("/messages/" + chat?._id);
                setMessages(res.data);
            } catch (e) {
                console.log(e);
            }
        }
        getMessages();
    }, [chat]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const msg = {
            senderId: user._id,
            text: newMessage,
            conversationId: chat._id
        }
        try {
            const res = await axios.post("/messages", msg);
            setMessages([...messages, res.data]);
            setNewMessage("")
        } catch (e) {
            console.log(e);
        }
    }
    useEffect(() => { scrollRef.current?.scrollIntoView({ behaviour: "smooth" }) }, [messages])
    return (
        <>
            <Topbar />
            <div className="messenger">
                <div className="chatMenu">
                    <div className="chatMenuWrapper">
                        <input placeholder="Search for friends" className="chatMenuInput" />
                        {conv.map(c => (
                            <div onClick={() => {
                                setChat(c);
                            }}>
                                <Conversation conversation={c} currentUser={user} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="chatBox">
                    <div className="chatBoxWrapper">
                        {chat ?
                            <>
                                <div className="chatBoxTop">
                                    {messages.map(m => (
                                        <div ref={scrollRef}>
                                            <Message message={m} own={m.senderId === user._id} />
                                        </div>
                                    ))}
                                </div>
                                <div className="chatBoxBottom">
                                    <textarea placeholder="write something" className="chatMessageInput" onChange={e => { setNewMessage(e.target.value) }} value={newMessage} />
                                    <button className="chatSubmitButton" onClick={handleSubmit}>Send</button>
                                </div>
                            </> :
                            <span className="noConversation">Open a conversation to start a chat</span>
                        }
                    </div>

                </div>
                <div className="chatOnline">
                    <div className="chatOnlineWrapper">
                        <ChatOnline />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Messenger;