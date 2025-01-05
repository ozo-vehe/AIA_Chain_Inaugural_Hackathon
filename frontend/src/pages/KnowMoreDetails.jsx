import { useParams } from "react-router-dom";
import { data } from "../utils/know-more";
import { useState, useEffect } from "react";

const KnowMoreDetails = () => {
  const [info, setInfo] = useState({});
  const { id } = useParams();

  useEffect(() => {
    console.log(data);
    console.log(id);
    const infoData = data.find((d) => d.id === id);
    setInfo(infoData);
  }, [id]);

  return (
    <>
      {info && (
        <section className="mt-6 px-4 md:px-5 lg:px-10 mb-8">
          <button
            className="mb-2 capitalize text-gray-600 transition-all duration-300 hover:text-gray-900"
            onClick={() => window.history.back()}
          >
            go back
          </button>
          <h1 className="mb-2 text-xl font-[500] capitalize md:text-2xl lg:text-4xl">
            {info.title}
          </h1>
          <p className="mb-5 text-gray-700">{info.header}</p>

          <div className="info-details">
            <div className="mb-5">
              <h3 className="mb-2 text-[18px] font-[500] capitalize md:text-xl lg:text-2xl">
                key points
              </h3>
              <ul className="list-disc pl-5 text-gray-700">
                {info.paragraph?.map((details, index) => (
                  <li key={index}>{details}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-2 text-[18px] font-[500] capitalize md:text-xl lg:text-2xl">
                conclusion
              </h3>
              <p className="text-gray-700">{info.conclusion}</p>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default KnowMoreDetails;
