import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../assets";
import { axiosPrivate } from "../../api/axios";

const Register = () => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [focus, setFocus] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  /* validations */
  const validateField = (key) => {
    if (values[key]?.length) {
      setErrors((prev) => ({ ...prev, [key]: "" }));
      return true;
    } else {
      setErrors((prev) => ({ ...prev, [key]: "Required!" }));
    }
  };
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
    } else if (values.password?.length >= 8) {
      setErrors((prev) => ({ ...prev, password: "" }));
      return true;
    } else {
      setErrors((prev) => ({
        ...prev,
        password: "Password must be 8 characters or longer!",
      }));
    }
  };
  const validateConfirmPwd = () => {
    if (!values?.confirmPassword || values.confirmPassword?.length == 0) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: "Password required!",
      }));
    } else if (values.confirmPassword?.length < 8) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: "Password must be 8 characters or longer!",
      }));
    } else if (values.password == values.confirmPassword) {
      setErrors((prev) => ({ ...prev, confirmPassword: "" }));
      return true;
    } else {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: "Passwords must match!",
      }));
    }
  };

  useEffect(() => {
    if (focus == "name") {
      validateField("name");
    }

    if (focus == "surname") {
      validateField("surname");
    }

    if (focus == "email") {
      validateEmail();
    }

    if (focus == "password" || focus == "confirmPassword") {
      validatePwd();
      validateConfirmPwd();
    }
  }, [values]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    var isValidName = validateField("name");
    var isValidSurname = validateField("surname");
    var isValidEmail = validateEmail();
    var isValidPwd = validatePwd();
    var isValidConfirmPwd = validateConfirmPwd();

    if (
      isValidName &&
      isValidSurname &&
      isValidEmail &&
      isValidPwd &&
      isValidConfirmPwd
    ) {
      try {
        const res = await axiosPrivate.post(
          "/api/Authentication/register",
          JSON.stringify(values)
        );
        navigate("/login");
      } catch (error) {
        console.log(error);
        setErrors((prev) => ({
          ...prev,
          exist: error?.response?.data?.message,
        }));
      }
    }
  };

  return (
    <div className="grid grid-cols-1 items-center md:grid-cols-2 px-4 xs:px-16 lg:px-32 xl:px-64 gap-12 lg:gap-24 xl:gap-48 min-h-[100vh] py-32 md:py-24 bg-dark-600">
      <div className="border-4 rounded-3xl border-dark-400 bg-dark-500 flex flex-col items-center justify-center text-center py-16 px-8 w-full sm:w-2/3 -translate-x-1/2 ml-[50%] md:w-full">
        <img src={register} alt="" className="w-2/3" />

        <h5 className="text-white mt-8">Already registered?</h5>

        <p className="text-white mt-2 small">
          Log in as an advertisement manager
        </p>

        <button
          className="btn w-2/3 py-3 mt-4 before:bg-[hsla(0,0%,0%,0.5)]"
          onClick={() => navigate("/login")}
        >
          Log in
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center w-full sm:w-2/3 -translate-x-1/2 ml-[50%] md:w-full"
      >
        <h2 className="text-white">Register</h2>
        <p className="text-white mt-2">
          Register as an advertisement manager
        </p>

        <div className="w-full relative">
          <input
            type="text"
            name="name"
            placeholder="Name"
            className={`${
              errors.name ? "bg-red-500 bg-opacity-50" : "bg-dark-400"
            } py-3 px-4 rounded-xl text-sm outline-none text-white w-full mt-4`}
            value={values.name ?? ""}
            onChange={handleChange}
            onFocus={() => setFocus("name")}
            onBlur={() => setFocus("")}
          />
          {errors.name && (
            <p className="absolute top-full left-2 text-xs text-red-500">
              {errors.name}
            </p>
          )}
        </div>

        <div className="w-full relative">
          <input
            type="text"
            name="surname"
            placeholder="Surname"
            className={`${
              errors.surname ? "bg-red-500 bg-opacity-50" : "bg-dark-400"
            } py-3 px-4 rounded-xl text-sm outline-none text-white w-full mt-4`}
            value={values.surname ?? ""}
            onChange={handleChange}
            onFocus={() => setFocus("surname")}
            onBlur={() => setFocus("")}
          />
          {errors.surname && (
            <p className="absolute top-full left-2 text-xs text-red-500">
              {errors.surname}
            </p>
          )}
        </div>

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
          <p className="absolute top-full left-2 text-xs text-red-500">
            {errors.password}
          </p>
        </div>

        <div className="w-full relative">
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            className={`${
              errors.confirmPassword
                ? "bg-red-500 bg-opacity-50"
                : "bg-dark-400"
            } py-3 px-4 rounded-xl text-sm outline-none text-white w-full mt-4`}
            value={values.confirmPassword ?? ""}
            onChange={handleChange}
            onFocus={() => setFocus("confirmPassword")}
            onBlur={() => setFocus("")}
          />
          <p className="absolute top-full left-2 text-xs text-red-500">
            {errors.confirmPassword}
          </p>
        </div>

        {errors.exist && (
          <p className="mt-2 font-medium text-red-500">{errors.exist}</p>
        )}

        <button className="btn w-3/4 py-3 mt-8 before:bg-[hsla(0,0%,0%,0.5)]">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
