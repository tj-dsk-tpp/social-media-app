import "./chatOnline.css";

export default function ChatOnline() {
    return (
        <div className="chatOnline">
            <div className="chatOnlineFriend">
                <div className="chatOnlineImageContainer">
                    <img src="https://iso.500px.com/wp-content/uploads/2015/03/business_cover.jpeg" alt="" className="chatOnlineImage" />
                    <div className="chatOnlineBadge"></div>
                </div>
                <span className="chatOnlineName">Tushar Jain</span>
            </div>
        </div>
    )
}
