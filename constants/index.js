import { FaHome, FaSearch, FaHeart, FaEdit, FaUsers, FaUser, FaComment, FaUserFriends, FaTags } from 'react-icons/fa';




export const sidebarLinks = [
  {
    icon: <FaHome />,
    route: "/",
    label: "Home",
  },
  {
    icon: <FaSearch />,
    route: "/search",
    label: "Search",
  },
  {
    icon: <FaHeart />,
    route: "/activity",
    label: "Activity",
  },
  {
    icon: <FaEdit />,
    route: "/create-bites",
    label: "Create Bites",
  },
  {
    icon: <FaUsers />,
    route: "/communities",
    label: "Communities",
  },
  {
    icon: <FaUser />,
    route: "/profile",
    label: "Profile",
  },
];

export const profileTabs = [
  { value: "bites", label: "Bites", icon: <FaComment /> },
  { value: "replies", label: "Replies", icon: <FaUserFriends /> },
  { value: "tagged", label: "Tagged", icon: <FaTags /> },
];

export const communityTabs = [
  { value: "bites", label: "Bites", icon: <FaComment /> },
  { value: "members", label: "Members", icon: <FaUserFriends /> },
  { value: "requests", label: "Requests", icon: <FaUserFriends /> }, // You might want to choose an appropriate icon for requests
];
