import { useState, useEffect } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

const ProfileSettings = () => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState({});
  const [focus, setFocus] = useState("");

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axiosPrivate.get("/api/Account/admanager");
        setValues(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

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
  const validateOldPwd = () => {
    if (!values?.oldPwd || values.oldPwd?.length == 0) {
      setErrors((prev) => ({ ...prev, oldPwd: "Passworsd required!" }));
    } else if (values.oldPwd?.length >= 8) {
      setErrors((prev) => ({ ...prev, oldPwd: "" }));
      return true;
    } else {
      setErrors((prev) => ({
        ...prev,
        oldPwd: "Passworsd must be 8 characters or longer!",
      }));
    }
  };
  const validateNewPwd = () => {
    if (!values?.newPwd || values.newPwd?.length == 0) {
      setErrors((prev) => ({ ...prev, newPwd: "Passworsd required!" }));
    } else if (values.newPwd?.length >= 8) {
      setErrors((prev) => ({ ...prev, newPwd: "" }));
      return true;
    } else {
      setErrors((prev) => ({
        ...prev,
        newPwd: "Passworsd must be 8 characters or longer!",
      }));
    }
  };
  const validateConfirmNewPwd = () => {
    if (!values.confirmNewPwd?.length) {
      setErrors((prev) => ({
        ...prev,
        confirmNewPwd: "Password required!",
      }));
    } else if (values.confirmNewPwd?.length < 8) {
      setErrors((prev) => ({
        ...prev,
        confirmNewPwd: "Password must be 8 characters or longer!",
      }));
    } else if (values.newPwd == values.confirmNewPwd) {
      setErrors((prev) => ({ ...prev, confirmNewPwd: "" }));
      return true;
    } else {
      setErrors((prev) => ({
        ...prev,
        confirmNewPwd: "Passwords must match!",
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

    if (focus == "oldPwd") {
      validateOldPwd();
    }

    if (focus == "newPwd" || focus == "confirmNewPwd") {
      validateNewPwd();
      validateConfirmNewPwd();
    }
  }, [values]);

  const updateUser = async (e) => {
    e.preventDefault();

    var isValidName = validateField("name");
    var isValidSurname = validateField("surname");

    if (isValidName && isValidSurname) {
      try {
        const res = await axiosPrivate.put("/api/Account/admanager", {
          name: values.name,
          surname: values.surname,
        });
        setErrors((prev) => ({ ...prev, user: "" }));
        setSuccess((prev) => ({ ...prev, user: "User updated successfully!" }));
      } catch (error) {
        console.log(error);
        setSuccess((prev) => ({ ...prev, user: "" }));
        setErrors((prev) => ({ ...prev, user: "User cannot be edited!" }));
      }
    }
  };

  const updatePassword = async (e) => {
    e.preventDefault();

    var isValidOldPwd = validateOldPwd();
    var isValidNewPwd = validateNewPwd();
    var isValidConfirmNewPwd = validateConfirmNewPwd();

    if (isValidOldPwd && isValidNewPwd && isValidConfirmNewPwd) {
      try {
        const res = await axiosPrivate.patch(
          "/api/Account/admanager/password",
          {
            oldPassword: values.oldPwd,
            newPassword: values.newPwd,
          }
        );
        setErrors((prev) => ({ ...prev, password: "" }));
        setSuccess((prev) => ({
          ...prev,
          password: "Password changed successfully!",
        }));
      } catch (error) {
        console.log(error);
        setSuccess((prev) => ({ ...prev, password: "" }));
        setErrors((prev) => ({
          ...prev,
          password: "Password cannot be changed!",
        }));
      }
    }
  };

  return (
    <div>
      <h2 className="mb-8">Profile settings</h2>

      <div className="grid grid-cols-2 gap-16">
        {/* update user */}
        <div>
          <form
            onSubmit={updateUser}
            className="flex flex-col items-center w-full sm:w-2/3 -translate-x-1/2 ml-[50%] md:w-full"
          >
            <h3>Update user</h3>

            <div className="w-full relative">
              <input
                type="text"
                name="name"
                placeholder="Name"
                className={`${
                  errors.name ? "bg-red-500" : "bg-dark-400"
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
                  errors.surname ? "bg-red-500" : "bg-dark-400"
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

            <button className="btn w-1/2 py-3 mt-8 before:bg-[hsla(0,0%,0%,0.5)]">
              Update
            </button>
          </form>

          {errors.user && (
            <p className="mt-4 font-medium text-red-500 text-center">
              {errors.user}
            </p>
          )}

          {success.user && (
            <p className="mt-4 font-medium text-green-500 text-center">
              {success.user}
            </p>
          )}
        </div>

        <div>
          <form
            onSubmit={updatePassword}
            className="flex flex-col items-center w-full sm:w-2/3 -translate-x-1/2 ml-[50%] md:w-full"
          >
            <h3>Update password</h3>
            <div className="w-full relative">
              <input
                type="password"
                name="oldPwd"
                placeholder="Old password"
                className={`${
                  errors.oldPwd ? "bg-red-500" : "bg-dark-400"
                } py-3 px-4 rounded-xl text-sm outline-none text-white w-full mt-4`}
                value={values.oldPwd ?? ""}
                onChange={handleChange}
                onFocus={() => setFocus("oldPwd")}
                onBlur={() => setFocus("")}
              />
              <p className="absolute top-full left-2 text-xs text-red-500">
                {errors.oldPwd}
              </p>
            </div>

            <div className="w-full relative">
              <input
                type="password"
                name="newPwd"
                placeholder="New password"
                className={`${
                  errors.newPwd ? "bg-red-500" : "bg-dark-400"
                } py-3 px-4 rounded-xl text-sm outline-none text-white w-full mt-4`}
                value={values.newPwd ?? ""}
                onChange={handleChange}
                onFocus={() => setFocus("newPwd")}
                onBlur={() => setFocus("")}
              />
              <p className="absolute top-full left-2 text-xs text-red-500">
                {errors.newPwd}
              </p>
            </div>

            <div className="w-full relative">
              <input
                type="password"
                name="confirmNewPwd"
                placeholder="Confirm new password"
                className={`${
                  errors.confirmNewPwd ? "bg-red-500" : "bg-dark-400"
                } py-3 px-4 rounded-xl text-sm outline-none text-white w-full mt-4`}
                value={values.confirmNewPwd ?? ""}
                onChange={handleChange}
                onFocus={() => setFocus("confirmNewPwd")}
                onBlur={() => setFocus("")}
              />
              <p className="absolute top-full left-2 text-xs text-red-500">
                {errors.confirmNewPwd}
              </p>
            </div>

            <button className="btn w-1/2 py-3 mt-8 before:bg-[hsla(0,0%,0%,0.5)]">
              Update
            </button>
          </form>

          {errors.password && (
            <p className="mt-4 font-medium text-red-500 text-center">
              {errors.password}
            </p>
          )}

          {success.password && (
            <p className="mt-4 font-medium text-green-500 text-center">
              {success.password}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
