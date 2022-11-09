import axios from "axios";
import { useEffect, useState } from "react";
import "./conversation.css";

export default function Conversation({ conversation, currentUser }) {
    const [user, setUser] = useState(null);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    useEffect(() => {
        const frid = conversation.members.find(m => m !== currentUser._id);
        const getUser = async () => {
            try {
                const res = await axios("/user?userId=" + frid);
                setUser(res.data);
            } catch (e) {
                console.log(e);
            }
        };
        getUser();
    }, [currentUser, conversation])
    return (
        <div className="conversation">
            <img className="conversationImage" src={user?.profilePicture ? PF + user.profilePicture : PF + "person/noAvatar.png"} alt="" />
            <span className="conversationName">{user?.username}</span>
        </div>
    )
}
