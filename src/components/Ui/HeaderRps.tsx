import SearchUiRps from "./SearchRps";

const HeaderRps = () => {
  return (
    <div className="border p-5 hidden top-header shadow">
      <div className="flex space-x-5 justify-center items-center">
        <SearchUiRps />
      </div>
    </div>
  );
};

export default HeaderRps;
