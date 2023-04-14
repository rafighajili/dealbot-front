import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../assets";
import { axiosPrivate } from "../../api/axios";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [focus, setFocus] = useState("");

  const navigate = useNavigate();

  const { setAuth } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  /* validations */
  const validateEmail = () => {
    const EMAIL_REGEX = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
    if (!values?.email || values.email?.length == 0) {
      setErrors((prev) => ({ ...prev, email: "Email required!" }));
    } else if (values.email.match(EMAIL_REGEX)) {
      setErrors((prev) => ({ ...prev, email: "" }));
      return true;
    } else {
      setErrors((prev) => ({ ...prev, email: "This email is invalid!" }));
    }
  };
  const validatePwd = () => {
    if (!values?.password || values.password?.length == 0) {
      setErrors((prev) => ({ ...prev, password: "Password required!" }));
    } else if (values.password?.length >= 7) {
      setErrors((prev) => ({ ...prev, password: "" }));
      return true;
    } else {
      setErrors((prev) => ({
        ...prev,
        password: "Password must be 7 characters or longer!",
      }));
    }
  };

  useEffect(() => {
    if (focus == "email") {
      validateEmail();
    }
    if (focus == "password") {
      validatePwd();
    }
  }, [values]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    var isValidEmail = validateEmail();
    var isValidPwd = validatePwd();

    if (isValidEmail && isValidPwd) {
      try {
        const res = await axiosPrivate.post(
          "/api/Authentication/login",
          JSON.stringify(values)
        );

        const accessToken = res.data.accessToken;
        const refreshToken = res.data.refreshToken;

        setAuth({ accessToken, refreshToken });
        setValues({});
        navigate("/dashboard/admanaging");
      } catch (error) {
        console.log(error);
        setErrors((prev) => ({
          ...prev,
          invalid: "Email or password is wrong!",
        }));
      }
    }
  };

  return (
    <div className="grid grid-cols-1 items-center md:grid-cols-2 px-4 xs:px-16 lg:px-32 xl:px-64 gap-12 lg:gap-24 xl:gap-48 min-h-[100vh] py-32 md:py-24 bg-dark-600">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center w-full sm:w-2/3 -translate-x-1/2 ml-[50%] md:w-full"
      >
        <h2 className="text-white">Welcome!</h2>
        <p className="text-white mt-2">Happy to see you again!</p>

        <div className="w-full relative">
          <input
            type="text"
            name="email"
            placeholder="Email"
            className={`${
              errors.email ? "bg-red-500 bg-opacity-50" : "bg-dark-400"
            } py-3 px-4 rounded-xl text-sm outline-none text-white w-full mt-4`}
            value={values.email ?? ""}
            onChange={handleChange}
            onFocus={() => setFocus("email")}
            onBlur={() => setFocus("")}
          />
          {errors.email && (
            <p className="absolute top-full left-2 text-xs text-red-500">
              {errors.email}
            </p>
          )}
        </div>

        <div className="w-full relative">
          <input
            type="password"
            name="password"
            placeholder="Password"
            className={`${
              errors.password ? "bg-red-500 bg-opacity-50" : "bg-dark-400"
            } py-3 px-4 rounded-xl text-sm outline-none text-white w-full mt-4`}
            value={values.password ?? ""}
            onChange={handleChange}
            onFocus={() => setFocus("password")}
            onBlur={() => setFocus("")}
          />
          {errors.password && (
            <p className="absolute top-full left-2 text-xs text-red-500">
              {errors.password}
            </p>
          )}
        </div>

        {/* <Link
          to="/"
          className="self-end text-primary hover:text-secondary text-sm mt-2 duration-300"
        >
          Şifrəni unutmusunuz?
        </Link> */}

        {errors.invalid && (
          <p className="mt-2 font-medium text-red-500">{errors.invalid}</p>
        )}

        <button className="btn w-3/4 py-3 mt-8 before:bg-[hsla(0,0%,0%,0.5)]">
          Log in
        </button>
      </form>

      <div className="border-4 rounded-3xl border-dark-400 bg-dark-500 flex flex-col items-center justify-center text-center py-16 px-8 w-full sm:w-2/3 -translate-x-1/2 ml-[50%] md:w-full">
        <img src={login} alt="" className="w-2/3" />

        <h5 className="text-white mt-8">Don't have an account yet?</h5>

        <p className="text-white mt-2 small">
          Register as an advertisement manager
        </p>

        <button
          className="btn px-8 py-3 mt-4 before:bg-[hsla(0,0%,0%,0.5)]"
          onClick={() => navigate("/register")}
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default Login;
