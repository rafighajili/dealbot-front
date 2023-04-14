import { useState, useEffect } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

const AdManaging = () => {
  const [keywords, setKeywords] = useState([]);
  const [availableKeywords, setAvailableKeywords] = useState([]);
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState({});
  const [focus, setFocus] = useState("");

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axiosPrivate.get("/api/Advertisement/keyword");
        setKeywords(res.data);
        setAvailableKeywords(res.data);
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
  const validateKeywords = () => {
    if (selectedKeywords?.length) {
      setErrors((prev) => ({ ...prev, keywords: "" }));
      return true;
    } else {
      setErrors((prev) => ({ ...prev, keywords: "Required!" }));
    }
  };

  useEffect(() => {
    if (focus == "title") {
      validateField("title");
    }

    if (focus == "body") {
      validateField("body");
    }

    if (focus == "url") {
      validateField("url");
    }
  }, [values]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    var isValidTitle = validateField("title");
    var isValidBody = validateField("body");
    var isValidUrl = validateField("url");
    var isValidKeywords = validateKeywords();

    if (isValidTitle && isValidBody && isValidUrl && isValidKeywords) {
      try {
        const res = await axiosPrivate.post("/api/Advertisement", {
          title: values.title,
          body: values.body,
          url: values.url,
          audiences: selectedKeywords.map((item) => item.id),
        });
        setErrors((prev) => ({ ...prev, request: "" }));
        setSuccess((prev) => ({
          ...prev,
          request: "Advertisement published successfully!",
        }));
        setValues({});
        setSelectedKeywords([]);
        setAvailableKeywords(keywords);
      } catch (error) {
        console.log(error);
        setSuccess((prev) => ({ ...prev, request: "" }));
        setErrors((prev) => ({
          ...prev,
          request: "Advertisement cannot be published!",
        }));
      }
    }
  };

  return (
    <div>
      <h2 className="mb-8">Publish advertisement</h2>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center w-full sm:w-2/3 md:w-3/4 lg:w-1/2"
      >
        {/* title */}
        <div className="w-full relative">
          <input
            type="text"
            name="title"
            placeholder="Title"
            className={`${
              errors.title ? "bg-red-500" : "bg-dark-400"
            } py-3 px-4 rounded-xl text-sm outline-none text-white w-full mt-4`}
            value={values.title ?? ""}
            onChange={handleChange}
            onFocus={() => setFocus("title")}
            onBlur={() => setFocus("")}
          />
          {errors.title && (
            <p className="absolute top-full left-2 text-xs text-red-500">
              {errors.title}
            </p>
          )}
        </div>

        {/* body */}
        <div className="w-full relative">
          <textarea
            name="body"
            placeholder="Body"
            rows="5"
            className={`${
              errors.body ? "bg-red-500" : "bg-dark-400"
            } py-3 px-4 rounded-xl text-sm outline-none text-white w-full mt-4`}
            value={values.body ?? ""}
            onChange={handleChange}
            onFocus={() => setFocus("body")}
            onBlur={() => setFocus("")}
          />
          {errors.body && (
            <p className="absolute top-full left-2 text-xs text-red-500 -mt-1">
              {errors.body}
            </p>
          )}
        </div>

        {/* url */}
        <div className="w-full relative">
          <input
            type="text"
            name="url"
            placeholder="URL"
            className={`${
              errors.url ? "bg-red-500" : "bg-dark-400"
            } py-3 px-4 rounded-xl text-sm outline-none text-white w-full mt-4`}
            value={values.url ?? ""}
            onChange={handleChange}
            onFocus={() => setFocus("url")}
            onBlur={() => setFocus("")}
          />
          {errors.url && (
            <p className="absolute top-full left-2 text-xs text-red-500">
              {errors.url}
            </p>
          )}
        </div>

        {/* keywords */}
        <div className="w-full relative">
          <div
            className={`${
              errors.keywords ? "bg-red-500" : "bg-dark-400"
            } py-3 px-4 rounded-xl text-sm outline-none w-full mt-4`}
          >
            <div>
              <p className="text-white mb-2">Keywords</p>
              <div className="flex gap-3 flex-wrap">
                {availableKeywords.length ? (
                  availableKeywords.map((item) => (
                    <div
                      key={item.id}
                      className="bg-[rgba(255,255,255,0.3)] text-white rounded p-1 cursor-pointer"
                      onClick={() => {
                        setSelectedKeywords((prev) => [...prev, item]);
                        setAvailableKeywords(
                          availableKeywords.filter(
                            (keyword) => keyword.id != item.id
                          )
                        );
                      }}
                    >
                      {item.keyword}: {item.userCount}
                    </div>
                  ))
                ) : (
                  <p className="text-white text-xs">No more keywords</p>
                )}
              </div>
            </div>

            <span className="w-full h-[1px] bg-white block my-4"></span>

            <div>
              <p className="text-white mb-2">Target audience</p>
              <div className="flex gap-3 flex-wrap">
                {selectedKeywords.length ? (
                  selectedKeywords.map((item) => (
                    <div
                      key={item.id}
                      className="bg-[rgba(255,255,255,0.3)] text-white rounded p-1 cursor-pointer"
                      onClick={() => {
                        setAvailableKeywords((prev) => [...prev, item]);
                        setSelectedKeywords(
                          selectedKeywords.filter(
                            (keyword) => keyword.id != item.id
                          )
                        );
                      }}
                    >
                      {item.keyword}: {item.userCount}
                    </div>
                  ))
                ) : (
                  <p className="text-white text-xs">No target audience</p>
                )}
              </div>
            </div>
          </div>

          {errors.keywords && (
            <p className="absolute top-full left-2 text-xs text-red-500">
              {errors.keywords}
            </p>
          )}
        </div>

        <button className="btn w-1/2 py-3 mt-8 before:bg-[hsla(0,0%,0%,0.5)]">
          Publish
        </button>

        {errors.request && (
          <p className="mt-4 font-medium text-red-500 text-center">
            {errors.request}
          </p>
        )}

        {success.request && (
          <p className="mt-4 font-medium text-green-500 text-center">
            {success.request}
          </p>
        )}
      </form>
    </div>
  );
};

export default AdManaging;
