import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listUsers } from "../actions/userAction";
import Topbar from "../components/ui/Topbar";

const HomePage = () => {
  const dispatch = useDispatch();

  // Accessing state from Redux store
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  useEffect(() => {
    dispatch(listUsers());
  }, [dispatch]);

  return (
    <>
      <Topbar />
      <div>
        <h1>User List</h1>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
      </div>
    </>
  );
};

export default HomePage;

// <div className="relative flex flex-col items-center justify-between p-8 overflow-hidden bg-green-50 rounded-xl md:p-16 md:flex-row">
{
  /* Left Content */
}
{
  /* <div className="z-10 max-w-xl text-center md:text-left">
          <h1 className="text-4xl font-bold leading-tight text-gray-900 md:text-5xl">
            Freshness You Can Trust, <br />
            Savings You will <span className="text-green-600">Love!</span>
          </h1>

          <div className="flex justify-center gap-4 mt-8 md:justify-start">
            <Button
              variant="contained"
              color="success"
              size="large"
              className="!rounded-md !px-6 !py-3 !text-white"
            >
              Shop now
            </Button>
            <Button
              variant="text"
              color="primary"
              // endIcon={< />}
              className="!text-lg !font-medium"
            >
              Explore deals
            </Button>
          </div>
        </div> */
}

{
  /* Right Image */
}
{
  /* <div className="hidden md:block absolute right-0 bottom-0 w-1/2 max-w-[500px]">
          <img
            src="/maggie.jpg"
            alt="Fresh Veggies"
            className="object-contain w-full h-auto"
          />
        </div> */
}
{
  /* </div> */
}
