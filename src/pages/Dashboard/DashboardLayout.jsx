import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import SidebarMenu from "./SidebarMenu";
import useAuth from "../../hooks/useAuth";
import useCurrentPath from "../../hooks/useCurrentPath";
import jwtDecode from "jwt-decode";

const DashboardLayout = () => {
  const { auth } = useAuth();
  const role = jwtDecode(auth.accessToken).role;

  const currentPath = useCurrentPath();

  const navigate = useNavigate();

  useEffect(() => {
    if (currentPath == "dashboard") {
      if (role == "AdManager") {
        navigate("/dashboard/admanaging");
      } else if (role == "CustomUser") {
        navigate("/dashboard/freshdeal");
      } else {
        navigate("/");
      }
    }
  }, [currentPath]);

  return (
    <div className="min-h-screen">
      <SidebarMenu role={role} />
      <div className="p-8 md:ml-[300px]">
        <Outlet />
      </div>
      {/* <FooterDashboard/> */}
    </div>
  );
};

export default DashboardLayout;
