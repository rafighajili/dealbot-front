import { useEffect, useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

const ChangeSubscription = () => {
  const [currentSubModel, setCurrentSubModel] = useState();
  const [values, setValues] = useState({});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const axiosPrivate = useAxiosPrivate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: +value }));
  };

  useEffect(() => {
    const getSubModel = async () => {
      try {
        const res = await axiosPrivate.get(
          "/api/Account/subscriptionModel",
          JSON.stringify(values)
        );
        setCurrentSubModel(res.data.subscriptionModel);
        setValues(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getSubModel();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentSubModel != values.subscriptionModel) {
      try {
        const res = await axiosPrivate.patch(
          "/api/Account/subscriptionModel",
          JSON.stringify(values)
        );
        setError("");
        setSuccess("Subscription model updated!");
        setCurrentSubModel(values.subscriptionModel);
      } catch (error) {
        console.log(error);
        setSuccess("");
        if (error.response.status == 403) {
          setError(error.response.data.message);
        } else if (error.response.status == 500) {
          setError("Updating subscription model failed!");
        }
      }
    } else {
      setSuccess("");
      setError("Already in this subsciption model!");
    }
  };
  return (
    <div>
      <h2 className="mb-8">Change subscription</h2>

      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="flex items-center gap-x-2">
          <input
            type="radio"
            id="esas"
            name="subscriptionModel"
            onChange={handleChange}
            value="0"
            checked={values.subscriptionModel == 0 && true}
          />
          <label htmlFor="esas">Basic</label>
        </div>
        <div className="flex items-center gap-x-2">
          <input
            type="radio"
            id="standard"
            name="subscriptionModel"
            onChange={handleChange}
            value="1"
            checked={values.subscriptionModel == 1 && true}
          />
          <label htmlFor="standard">Standart</label>
        </div>
        <div className="flex items-center gap-x-2">
          <input
            type="radio"
            id="medium"
            name="subscriptionModel"
            onChange={handleChange}
            value="2"
            checked={values.subscriptionModel == 2 && true}
          />
          <label htmlFor="medium">Premium</label>
        </div>

        <button className="btn before:bg-[hsla(0,0%,0%,0.5)] py-2 px-8 w-fit mt-4">
          Change subscription type
        </button>

        {error && <p className="mt-2 font-medium text-red-500">{error}</p>}

        {success && (
          <p className="mt-2 font-medium text-green-500">{success}</p>
        )}
      </form>
    </div>
  );
};

export default ChangeSubscription;
