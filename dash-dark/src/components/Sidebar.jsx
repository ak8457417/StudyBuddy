// "use client"
// import logo from '../assets/logo.png'
//
// import { useState } from "react"
// import {
//   Search,
//   LayoutGrid,
//   BarChart2,
//   Star,
//   Users,
//   DollarSign,
//   Box,
//   Component,
//   Settings,
//   FileText,
//   ChevronRight,
// } from "lucide-react"
//
// const Sidebar = () => {
//   const [activeItem, setActiveItem] = useState("dashboard")
//
//   const menuItems = [
//     { id: "demo", icon: <LayoutGrid size={18} />, label: "Dashboard", hasSubmenu: true },
//     { id: "users", icon: <Users size={18} />, label: "Chatbuddy", hasSubmenu: true },
//     { id: "pricing", icon: <DollarSign size={18} />, label: "Taxbuddy", hasSubmenu: true },
//     { id: "dashboard", icon: <BarChart2 size={18} />, label: "Analytics", hasSubmenu: true },
//     { id: "features", icon: <Star size={18} />, label: "Goals", hasSubmenu: true },
//     { id: "integrations", icon: <Box size={18} />, label: "Market", hasSubmenu: true },
//     { id: "components", icon: <Component size={18} />, label: "Chat History", hasSubmenu: true },
//     { id: "settings", icon: <Settings size={18} />, label: "Settings", hasSubmenu: true },
//     { id: "templates", icon: <FileText size={18} />, label: "Template pages", hasSubmenu: true },
//   ]
//
//   return (
//     <aside className="sidebar">
//       <div className="sidebar-header">
//         <div className="logo">
//           <div className="logo-icon">
//             <img src={logo} alt="logo" />
//           </div>
//           <span className="logo-text">FinFlow</span>
//         </div>
//
//         <div className="search-container">
//           <Search size={16} className="search-icon" />
//           <input type="text" placeholder="Search for..." className="search-input" />
//         </div>
//       </div>
//
//       <nav className="sidebar-nav">
//         <ul className="nav-list">
//           {menuItems.map((item) => (
//             <li
//               key={item.id}
//               className={`nav-item ${activeItem === item.id ? "active" : ""}`}
//               onClick={() => setActiveItem(item.id)}
//             >
//               <div className="nav-link">
//                 <span className="nav-icon">{item.icon}</span>
//                 <span className="nav-label">{item.label}</span>
//                 {item.hasSubmenu && <ChevronRight size={16} className="submenu-arrow" />}
//               </div>
//             </li>
//           ))}
//         </ul>
//       </nav>
//
//       <div className="user-profile">
//         <div className="avatar">
//           <span>JC</span>
//         </div>
//         <div className="user-info">
//           <div className="user-name">John Carter</div>
//           <div className="user-role">Account settings</div>
//         </div>
//         <ChevronRight size={16} className="profile-arrow" />
//       </div>
//
//       <div className="get-template-btn">
//         <button>Logout</button>
//       </div>
//     </aside>
//   )
// }
//
// export default Sidebar
//


"use client";
import logo from "../assets/logo.png";
import {useContext, useEffect, useState} from "react";
import {
  Search,
  LayoutGrid,
  BarChart2,
  Star,
  Users,
  DollarSign,
  Box,
  Component,
  Settings,
  FileText,
  ChevronRight,
} from "lucide-react";
import {Link, NavLink, useNavigate} from "react-router-dom";
import {FinContext} from '../context/FinContext.jsx'
import axios from "axios";

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState("dashboard");
  const {token, setToken, getCurrentUser, currentUser, setCurrentUser} = useContext(FinContext)
  const navigate = useNavigate();

  useEffect(() => {
    getCurrentUser()
  }, [token])


  const logout = () => {
    navigate('/login')
    localStorage.removeItem("token");
    setToken('')
  }

  return (
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo">
            <div className="logo-icon">
              <img src={logo} alt="logo" />
            </div>
            <span className="logo-text">StudyBuddy</span>
          </div>

          <div className="search-container">
            <Search size={16} className="search-icon" />
            <input type="text" placeholder="Search for..." className="search-input" />
          </div>
        </div>

        <nav className="sidebar-nav">
          <ul className="nav-list">
            <NavLink  to={'/'}>
              <li className={`nav-item ${activeItem === "demo" ? "active" : ""}`} onClick={() => setActiveItem("demo")}>
                <div className="nav-link">
                  <span className="nav-icon"><LayoutGrid size={18} /></span>
                  <span className="nav-label">Dashboard</span>
                  <ChevronRight size={16} className="submenu-arrow" />
                </div>
              </li>
            </NavLink>

            <NavLink to={'/chat'}>
              <li className={`nav-item ${activeItem === "users" ? "active" : ""}`} onClick={() => setActiveItem("users")}>
                <div className="nav-link">
                  <span className="nav-icon"><Users size={18} /></span>
                  <span className="nav-label">StudyBuddy</span>
                  <ChevronRight size={16} className="submenu-arrow" />
                </div>
              </li>
            </NavLink>

            <NavLink to={'/analytics'}>
              <li className={`nav-item ${activeItem === "dashboard" ? "active" : ""}`} onClick={() => setActiveItem("dashboard")}>
                <div className="nav-link">
                  <span className="nav-icon"><BarChart2 size={18} /></span>
                  <span className="nav-label">Analytics</span>
                  <ChevronRight size={16} className="submenu-arrow" />
                </div>
              </li>
            </NavLink>

            <NavLink to={'/goals'}>
              <li className={`nav-item ${activeItem === "features" ? "active" : ""}`} onClick={() => setActiveItem("features")}>
                <div className="nav-link">
                  <span className="nav-icon"><Star size={18} /></span>
                  <span className="nav-label">Goals</span>
                  <ChevronRight size={16} className="submenu-arrow" />
                </div>
              </li>
            </NavLink>

            {/*<NavLink to={'/market'}>*/}
            {/*  <li className={`nav-item ${activeItem === "integrations" ? "active" : ""}`} onClick={() => setActiveItem("integrations")}>*/}
            {/*    <div className="nav-link">*/}
            {/*      <span className="nav-icon"><Box size={18} /></span>*/}
            {/*      <span className="nav-label">Market</span>*/}
            {/*      <ChevronRight size={16} className="submenu-arrow" />*/}
            {/*    </div>*/}
            {/*  </li>*/}
            {/*</NavLink>*/}

            <NavLink to={'/record'}>
              <li className={`nav-item ${activeItem === "components" ? "active" : ""}`} onClick={() => setActiveItem("components")}>
                <div className="nav-link">
                  <span className="nav-icon"><Component size={18} /></span>
                  <span className="nav-label">Course Schedule</span>
                  <ChevronRight size={16} className="submenu-arrow" />
                </div>
              </li>
            </NavLink>

            <NavLink to={'/settings'}>
              <li className={`nav-item ${activeItem === "settings" ? "active" : ""}`} onClick={() => setActiveItem("settings")}>
                <div className="nav-link">
                  <span className="nav-icon"><Settings size={18} /></span>
                  <span className="nav-label">Settings</span>
                  <ChevronRight size={16} className="submenu-arrow" />
                </div>
              </li>
            </NavLink>

            <NavLink to={'/template'}>
              <li className={`nav-item ${activeItem === "templates" ? "active" : ""}`} onClick={() => setActiveItem("templates")}>
                <div className="nav-link">
                  <span className="nav-icon"><FileText size={18} /></span>
                  <span className="nav-label">Template Pages</span>
                  <ChevronRight size={16} className="submenu-arrow" />
                </div>
              </li>
            </NavLink>
          </ul>
        </nav>

        <div className="user-profile">
          <div className="avatar">
            <span>JC</span>
          </div>
          <div className="user-info">
            <div className="user-name">{currentUser}</div>
            <div className="user-role">Account settings</div>
          </div>
          <ChevronRight size={16} className="profile-arrow" />
        </div>

        <div>
          <div className={"flex flex-col items-center gap-2"}>
            {!token && (
                <div className="get-template-btn w-full">
                  <Link to={"/login"}>
                    <button>Login</button>
                  </Link>
                </div>
            )}
            {token && (
                <div className="get-template-btn w-full">
                  <button onClick={logout}>Logout</button>
                </div>
            )}
          </div>
        </div>
      </aside>
  );
};

export default Sidebar;

