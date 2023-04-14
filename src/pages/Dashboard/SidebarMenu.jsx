import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { logo } from "../../assets";
import useCurrentPath from "../../hooks/useCurrentPath";
import useAuth from "../../hooks/useAuth";
import { axiosPrivate } from "../../api/axios";
import useClickOutside from "../../hooks/useClickOutside";

const SidebarMenu = ({ role }) => {
  const { auth, setAuth } = useAuth();

  const [toggle, setToggle] = useState(true);

  const [active, setActive] = useState("");

  const currentPath = useCurrentPath();

  const navigate = useNavigate();

  const sidebar = useRef();
  useClickOutside(sidebar, () => setToggle(false));

  useEffect(() => {
    setActive(currentPath[1]);
  }, [currentPath]);

  const logout = async () => {
    try {
      const res = await axiosPrivate.post(
        "/api/Authentication/logout",
        JSON.stringify({
          accessToken: auth?.accessToken,
          refreshToken: auth?.refreshToken,
        })
      );
      setAuth({});
      localStorage.clear();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div ref={sidebar} className="fixed w-[300px] h-screen z-50">
      <aside
        className={`bg-dark-400 flex flex-col justify-between px-4 xs:px-8 py-8 fixed md:relative top-0 w-2/3 xs:w-1/2 md:w-auto min-h-screen z-20 ${
          toggle ? "left-0" : "left-full md:left-auto"
        }`}
      >
        <div>
          <img src={logo} alt="logo" className="w-2/3" />

          {role == "CustomUser" && (
            <ul className="flex flex-col gap-y-4 mt-24">
              <li
                className={`text-xl ${
                  active == "freshdeal" ? "text-secondary" : "text-white"
                } cursor-pointer duration-300`}
                onClick={() => navigate("/dashboard/freshdeal")}
              >
                Fresh deal parsing
              </li>
              <li
                className={`text-xl ${
                  active == "pricechecker" ? "text-secondary" : "text-white"
                } cursor-pointer duration-300`}
                onClick={() => navigate("/dashboard/pricechecker")}
              >
                Price tracking
              </li>
              <li
                className={`text-xl ${
                  active == "changesubscription"
                    ? "text-secondary"
                    : "text-white"
                } cursor-pointer duration-300`}
                onClick={() => navigate("/dashboard/changesubscription")}
              >
                Change subscription
              </li>
            </ul>
          )}

          {role == "AdManager" && (
            <ul className="flex flex-col gap-y-4 mt-24">
              <li
                className={`text-xl ${
                  active == "admanaging" ? "text-secondary" : "text-white"
                } cursor-pointer duration-300`}
                onClick={() => navigate("/dashboard/admanaging")}
              >
                Publish advertisement
              </li>
              <li
                className={`text-xl ${
                  active == "settings" ? "text-secondary" : "text-white"
                } cursor-pointer duration-300`}
                onClick={() => navigate("/dashboard/settings")}
              >
                Profile settings
              </li>
            </ul>
          )}
        </div>

        <button
          className="btn py-3 before:bg-[hsla(0,0%,0%,0.5)]"
          onClick={logout}
        >
          Log out
        </button>
      </aside>

      <div
        className={`bg-dark-400 fixed z-30 top-2 h-8 w-8 text-xl flex items-center justify-center rounded-full select-none text-white cursor-pointer ${
          toggle
            ? "left-[calc(66%+0.5rem)] xs:left-[calc(50%+0.5rem)]"
            : "left-2"
        } md:hidden`}
        onClick={() => setToggle((prev) => !prev)}
      >
        ☰
      </div>
    </div>
  );
};

export default SidebarMenu;
