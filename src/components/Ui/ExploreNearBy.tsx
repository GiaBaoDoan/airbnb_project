import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState, useAppDispath } from "store";
import { getLocationThunk } from "store/GetViTri/thunk";
import styled from "styled-components";

const ExploreNearBy = () => {
  const dispatch = useAppDispath();
  const { location } = useSelector(
    (state: RootState) => state.getLocationReducer
  );
  useEffect(() => {
    dispatch(getLocationThunk());
  }, []);
  const navigate = useNavigate();
  return (
    <CssContainer>
      <section className="py-12">
        <h3 className="text-2xl font-bold max-sm:text-xl ">Khám phá lân cận</h3>
        <div className="grid grid-cols-4 max-xl:grid-cols-3 max-lg:grid-cols-2  max-md:grid-cols-2 max-sm:grid-cols-1 max-sm:gap-3 gap-5 mt-5">
          {location?.map((i) => {
            return (
              <div
                onClick={() => navigate(`/results/${i.id}`)}
                key={i.id}
                className="flex items-center max-md:space-y-3 p-3 max-md:items-start max-md:flex-col md:space-x-3 location cursor-pointer hover:bg-black/5 transition-all  rounded-lg"
              >
                <img
                  src={i.hinhAnh}
                  className="w-16 h-16 max-md:w-full max-md:h-full object-cover rounded-lg"
                />
                <div className="space-y-6 flex-1 text-lg">
                  <p>{i.tenViTri}</p>
                  <p className="font-600">{i.tinhThanh}</p>
                </div>
                <div className="bg-mainColor arrow p-6 opacity-0 transition-all translate-y-[50%] rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    color="white"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-move-right"
                  >
                    <path d="M18 8L22 12L18 16" />
                    <path d="M2 12H22" />
                  </svg>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </CssContainer>
  );
};

const CssContainer = styled.div`
  .location {
    &:hover {
      .arrow {
        opacity: 1;
        transform: translateY(0);
      }
    }
  }
`;
export default ExploreNearBy;
