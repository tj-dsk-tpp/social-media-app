import axios from "axios";
import { useEffect, useState } from "react";
import "./chatOnline.css";

export default function ChatOnline({ onlineUsers, currentUserId, setCurrentChat }) {
    const [friends, setFriends] = useState([]);
    const [onlineFriends, setOnlineFriends] = useState([]);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    useEffect(async () => {
        const getFriends = () => {
            const res = await axios.get("/users/friends/" + currentUserId);
            setFriends(res.data);
        }
        getFriends();
    }, [currentUserId]);

    useEffect(() => { setOnlineFriends(friends.filter(f => onlineUsers.includes(f._id))) }, [onlineUsers, friends]);

    const handleClick = async (user) => {
        try {
            const res = await axios.get(`/conversation/find/${currentUserId}/${user._id}`);
            setCurrentChat(res.data);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="chatOnline">
            {onlineFriends.map(ofrnd => (
                <div className="chatOnlineFriend" onclick={() => handleClick(ofrnd)}>
                    <div className="chatOnlineImageContainer">
                        <img src={ofrnd?.profilePicture ? PF + ofrnd.profilePicture : PF + "person/noAvatar.png"} alt="" className="chatOnlineImage" />
                        <div className="chatOnlineBadge"></div>
                    </div>
                    <span className="chatOnlineName">{ofrnd.username}</span>
                </div>

            ))
            }
        </div >
    )
}
