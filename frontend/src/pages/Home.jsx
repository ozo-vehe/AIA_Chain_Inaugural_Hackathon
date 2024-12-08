// import Home_image from "../assets/Container.png";
import Home_image_2 from "../assets/Container(1).png";
import Home_image_3 from "../assets/Container(2).png";
import Home_image_4 from "../assets/Container(4).png";
import Home_image_5 from "../assets/Container(5).png";
import Home_image_6 from "../assets/Container(6).png";
import Bot from "../assets/chatbot.png";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <section className="flex flex-col items-center justify-center">
        <div className="fixed lg:bottom-8 lg:right-8 md:bottom-8 md:right-8 bottom-4 right-4">
          <button>
            <Link to='/chatbot'>
               <img src={Bot} alt="Chatbot" className="w-[50px]" />
            </Link>
          </button>
        </div>
        <div>
          {/* <img
            src={Home_image}
            alt="Home page image"
            className="h-[px] w-[1440px] gap-[0px] pl-[80px] pr-[80px] pt-[30px]"
          /> */}
        </div>

        <div>
          <img
            src={Home_image_2}
            alt="Home page image2"
            className="h-[1529px] w-[1440px] gap-[56px] pl-[80px] pr-[80px] pt-[0px]"
          />
        </div>

        <div>
          <img
            src={Home_image_3}
            alt="Home page image3"
            className="h-[839px] w-[1440px] gap-[48px] pl-[80px] pr-[80px] pt-[0px]"
          />
        </div>

        <div>
          <img
            src={Home_image_4}
            alt="Home page image4"
            className="h-[825.33px] w-[1440px] gap-[48px] pl-[80px] pr-[80px] pt-[0px]"
          />
        </div>

        <div>
          <img
            src={Home_image_5}
            alt="Home page image5"
            className="h-[503px] w-[1440px] gap-[48px] pb-[0px] pl-[80px] pr-[80px] pt-[0px]"
          />
        </div>

        <div>
          <img
            src={Home_image_6}
            alt="Home page image6"
            className="h-[586.24px] w-[1440px] gap-[48px] pb-[120px] pl-[80px] pr-[80px] pt-[0px]"
          />
        </div>
      </section>
    </>
  );
};

export default Home;
