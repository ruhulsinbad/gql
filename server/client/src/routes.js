import CreateQuote from "./components/CreateQuote";
import Home from "./components/Home";
import Login from "./components/Login";
import OtherUserProfile from "./components/OtherUserProfile";
import Profile from "./components/Profile";
import SignUp from "./components/SignUp";

const routes = [
  { path: "/", element: <Home /> },
  { path: "/createQuote", element: <CreateQuote /> },
  { path: "/login", element: <Login /> },
  { path: "/signUp", element: <SignUp /> },
  { path: "/profile", element: <Profile /> },
  { path: "/profile/:id", element: <OtherUserProfile /> },
];

export default routes;
