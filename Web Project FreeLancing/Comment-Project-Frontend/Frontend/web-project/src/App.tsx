import AdminNavBar from "../Page/Admin/AdminNavBar";
import ModeratorNavBar from "../Page/Moderator/ModeratorNavBar";
import AdminHomePage from "../Page/Admin/HomePage";
import RequestPage from "../Page/Admin/RequestPage";
import WordPage from "../Page/Admin/WordPage";

import ProfilePage from "./Components/Profile";
import ModeratorHomePage from "../Page/Moderator/HomePage";
import ModeratorTopicPage from "../Page/Moderator/TopicPage";

import UserNavBar from "../Page/User/UserNavBar";
import UserHomePage from "../Page/User/HomePage";
import CreateTopicPage from "../Page/User/CreateTopicPage";

function App() {
  return (
    <>
      <AdminNavBar />
      <AdminHomePage />
      {/* <RequestPage /> */}
      {/* <WordPage /> */}
      {/* <ProfilePage /> */}

      {/* <ModeratorNavBar /> */}
      {/* <ModeratorHomePage /> */}
      {/* <ModeratorTopicPage /> */}
      {/* <ProfilePage /> */}

      {/* <UserNavBar /> */}
      {/* <UserHomePage /> */}
      {/* <CreateTopicPage /> */}
    </>
  );
}

export default App;
