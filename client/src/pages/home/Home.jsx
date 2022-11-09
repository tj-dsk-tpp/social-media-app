import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import "./home.css"
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Home({ currentUser }) {
  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <Sidebar currentUser={currentUser} />
        <Feed />
        <Rightbar currentUser={currentUser} />
      </div>
    </>
  );
}
