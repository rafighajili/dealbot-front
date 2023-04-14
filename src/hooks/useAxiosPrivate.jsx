import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const useAxiosPrivate = () => {
  const { auth, setAuth } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth?.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true;

          // new access and refresh tokens
          try {
            const res = await axiosPrivate.post(
              "/api/Authentication/refresh",
              JSON.stringify({
                accessToken: auth?.accessToken,
                refreshToken: auth?.refreshToken,
              })
            );
            const newAccessToken = res.data.accessToken;
            const newRefreshToken = res.data.refreshToken;
            setAuth({
              accessToken: newAccessToken,
              refreshToken: newRefreshToken,
            });
            prevRequest.headers = {
              ...prevRequest.headers,
              Authorization: `Bearer ${newAccessToken}`,
            };
          } catch (error) {
            console.log(error);
            setAuth({});
            localStorage.clear();
            navigate("/");
          }

          return axiosPrivate(prevRequest);
        } else {
          return Promise.reject(error);
        }
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, []);

  return axiosPrivate;
};

export default useAxiosPrivate;
