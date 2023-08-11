import { FaHome, FaSearch, FaHeart, FaEdit, FaUsers, FaUser, FaComment, FaUserFriends, FaTags } from 'react-icons/fa';




export const sidebarLinks = [
  {
    icon: <FaHome size={20}/>,
    route: "/",
    label: "Home",
  },
  {
    icon: <FaSearch size={20}/>,
    route: "/search",
    label: "Search",
  },
  {
    icon: <FaEdit size={20}/>,
    route: "/create-bites",
    label: "Create Bites",
  },
  {
    icon: <FaHeart size={20}/>,
    route: "/activity",
    label: "Activity",
  },
  
  // {
  //   icon: <FaUsers />,
  //   route: "/communities",
  //   label: "Communities",
  // },
  {
    icon: <FaUser size={20}/>,
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
