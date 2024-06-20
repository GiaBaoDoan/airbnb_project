import { Link } from "react-router-dom";

const Notfound = () => {
  return (
    <>
      <div className=" py-36 items-center m-auto justify-between flex ">
        <div className="items-center mx-auto">
          <div>
            <img className="mx-auto justify-between " src="https://i.ibb.co/zStGF9M/3747371.jpg" alt="" />
          </div>
          <div className="mx-auto justify-between text-center">
            <p>Sorry, the page you're looking for doesn't exist. Please try again or return to the homepage.</p>
          </div>
          <div className=" items-center flex justify-center py-5">
            <Link to={"/"}>
              <button className="text-white bg-mainColor py-[12px] px-5 rounded-md mr-5 shadow-2xl">Home</button>
      
            </Link>
            <button className="text-white bg-mainColor py-[12px] px-5 rounded-md shadow-2xl">contract us</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Notfound;
