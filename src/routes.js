import Dashboard from "views/Dashboard.jsx";
import UserProfile from "views/UserProfile.jsx";
import TableList from "views/TableList.jsx";
import Typography from "views/Typography.jsx";
import Icons from "views/Icons.jsx";
import Maps from "views/Maps.jsx";
import Notifications from "views/Notifications.jsx";
//import Upgrade from "views/Upgrade.jsx";
import Candidates from "views/Candidates.jsx";
import CreateCandidate from "views/CreateCandidate.jsx";
import ViewCandidate from "views/viewCandidate";
import SearchProfiles from "views/SearchProfiles";
import Login from "views/Login.jsx";
const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/candidates",
    name: "Candidates",
    icon: "ni ni-single-02 text-yellow",
    component: Candidates,
    layout: "/admin"
  },
 
  {
    path:"/createCandidate",
    name:"Create Candidate",
    icon:"",
    redirect:true,
    component:CreateCandidate,
    layout:"/admin"
  },
  {
    path:"/viewCandidateDetails",
    name:"View Candidate",
    icon:"",
    redirect:true,
    component:ViewCandidate,
    layout:"/admin"
  },
  {
    path: "/searchProfile",
    name: "Search Profile",
    icon: "ni ni-planet text-orange",
    component: SearchProfiles,
    layout: "/admin"
  },
];

export default dashboardRoutes;
/*
{
    path: "/user",
    name: "User Profile",
    icon: "pe-7s-user",
    component: UserProfile,
    layout: "/admin"
  },
{
    path: "/table",
    name: "Table List",
    icon: "pe-7s-note2",
    component: TableList,
    layout: "/admin"
  },
  {
    path: "/typography",
    name: "Typography",
    icon: "pe-7s-news-paper",
    component: Typography,
    layout: "/admin"
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "pe-7s-science",
    component: Icons,
    layout: "/admin"
  },
  {
    path: "/maps",
    name: "Maps",
    icon: "pe-7s-map-marker",
    component: Maps,
    layout: "/admin"
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: "pe-7s-bell",
    component: Notifications,
    layout: "/admin"
  }
  ,
  {
    upgrade: true,
    path: "/upgrade",
    name: "Upgrade to PRO",
    icon: "pe-7s-rocket",
    component: Upgrade,
    layout: "/admin"
  }*/