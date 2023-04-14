import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

const FreshDeal = () => {
  const [elements, setElements] = useState([]);

  const [values, setValues] = useState({ linkType: 0 });
  const [errors, setErrors] = useState({});

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const getElements = async () => {
      try {
        const res = await axiosPrivate.get("/api/Link?type=0");
        setElements(res.data);
      } catch (error) {}
    };
    getElements();
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    var isValidTitle = validateField("title");
    var isValidUrl = validateField("url");

    if (isValidTitle && isValidUrl) {
      try {
        const res = await axiosPrivate.post(
          "/api/Link",
          JSON.stringify(values)
        );
        location.reload();
      } catch (error) {
        console.log(error);
        if (error.response.status == 403) {
          setErrors({ insert: error.response.data.message });
        } else if (error.response.status == 500) {
          setErrors({ insert: "Enter a valid url" });
        }
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await axiosPrivate.delete(`/api/Link/${id}`);
      location.reload();
    } catch (error) {
      console.log(error);
      if (error.response.status == 500) {
        setErrors({ delete: "Error occured during link deletion!" });
      }
    }
  };

  return (
    <div>
      <h2 className="mb-8">Fresh deal parsing module</h2>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr,auto] gap-16">
        <div className="overflow-auto h-fit rounded-lg border border-neutral-400">
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="text-start py-2 px-4 border-b border-neutral-400">
                  №
                </th>
                <th className="text-start py-2 px-4 border-b border-neutral-400">
                  Title
                </th>
                <th className="text-start py-2 px-4 border-b border-neutral-400">
                  Url
                </th>
                <th className="text-start py-2 px-4 border-b border-neutral-400"></th>
              </tr>
            </thead>
            <tbody>
              {elements?.map((element, key) => {
                return (
                  <tr
                    key={key}
                    className={key % 2 == 1 ? "bg-neutral-100" : ""}
                  >
                    <td className="py-2 px-4 w-2">{key + 1}</td>
                    <td className="py-2 px-4">{element.title}</td>
                    <td className="py-2 px-4">
                      <a
                        href={element.url}
                        className="text-primary hover:text-secondary duration-300 max-w-[160px]"
                        target="_blank"
                      >
                        {element.url.slice(0,50)}
                      </a>
                    </td>
                    <td className="py-2 px-4 w-16 text-end">
                      <p
                        className=" text-red-500 font-bold text-sm cursor-pointer"
                        onClick={() => handleDelete(element.id)}
                      >
                        Delete
                      </p>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {errors.delete && (
            <p className="self-end mt-2 font-medium text-red-500">
              {errors.delete}
            </p>
          )}
        </div>

        <form
          onSubmit={handleSubmit}
          className="w-full xs:w-[300px] flex flex-col"
        >
          <div className="w-full relative">
            <input
              type="text"
              name="title"
              placeholder="Title"
              className={`${
                errors.title ? "bg-red-500" : "bg-dark-400"
              } py-3 px-4 rounded-xl text-sm outline-none text-white w-full`}
              value={values.title ?? ""}
              onChange={handleChange}
            />
            {errors.title && (
              <p className="absolute top-full left-2 text-xs text-red-500">
                {errors.title}
              </p>
            )}
          </div>

          <div className="w-full relative">
            <input
              type="text"
              name="url"
              placeholder="Url"
              className={`${
                errors.url ? "bg-red-500" : "bg-dark-400"
              } py-3 px-4 rounded-xl text-sm outline-none text-white w-full mt-4`}
              value={values.url ?? ""}
              onChange={handleChange}
            />
            {errors.url && (
              <p className="absolute top-full left-2 text-xs text-red-500">
                {errors.url}
              </p>
            )}
          </div>

          <button className="py-2 px-8 bg-primary text-white rounded-lg mt-4 self-end">
            Add
          </button>

          {errors.insert && (
            <p className="self-end mt-2 font-medium text-red-500">
              {errors.insert}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default FreshDeal;
