// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
import InsertChartOutlined from "@material-ui/icons/InsertChartOutlined";
import Launch from "@material-ui/icons/Launch";
import Description from "@material-ui/icons/Description";
// core components/views
import DashboardPage from "views/Dashboard/Dashboard.jsx";
import UserProfile from "views/UserProfile/UserProfile.jsx";
import NotificationsPage from "views/Notifications/Notifications.jsx";
import UpgradeToPro from "views/UpgradeToPro/UpgradeToPro.jsx";
import MarketView from "views/Market/MarketView.jsx";
import SelfOrder from "views/Order/SelfOrder.jsx";
import CreateOrder from "views/Order/CreateOrder.jsx";

export const dashboardRoutes = [
  {
    path: "/market",
    sidebarName: "MarketView",
    navbarName: "MarketView",
    icon: InsertChartOutlined,
    component: MarketView
  },
  {
    path: "/create",
    sidebarName: "CreateOrder",
    navbarName: "CreateOrder",
    icon: Launch,
    component: CreateOrder
  },
  {
    path: "/order/self",
    sidebarName: "MyOrders",
    navbarName: "MyOrders",
    icon: Description,
    component: SelfOrder
  },
  {
    path: "/user",
    sidebarName: "User Profile",
    navbarName: "Profile",
    icon: Person,
    component: UserProfile
  },

  { redirect: true, path: "/", to: "/market", navbarName: "Redirect" }
];

let routesNotInSideBar = [];

export const deepRoutes = routesNotInSideBar.concat(dashboardRoutes);

