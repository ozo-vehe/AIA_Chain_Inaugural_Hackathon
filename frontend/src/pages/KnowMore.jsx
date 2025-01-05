import { data } from "../utils/know-more";
import { Link } from "react-router-dom";

export default function KnowMore() {
  return (
    <>
      <div className="px-4 md:px-5 lg:px-10">
        <header className="mb-8">
          <h1 className="lg:text-5xl md:text-3xl text-xl uppercase font-[500] mb-2">Know More</h1>
        </header>
        <div className="know-more-container flex flex-wrap lg:justify-start md:justify-start justify-center gap-x-8 gap-y-4 ">
        {data.map((data, index) => (
          <div
            key={index}
            className="w-[300px] rounded-lg bg-white p-4 shadow"
          >
            <h2 className="mb-2 text-xl font-[500]">{data.title}</h2>
            <p className="mb-4 line-clamp-2 text-gray-600">{data.header}</p>
            <Link
              to={`/know-more/${data.id}`}
              className="rounded-lg border border-[#ff450d] px-3 py-1 text-sm text-[#ff450d] hover:bg-[#ff450d] hover:text-white"
            >
              Read More
            </Link>
          </div>
        ))}
        </div>
      </div>
    </>
  );
}
