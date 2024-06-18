const AddGuess = ({
  state,
  setState,
  isAdult,
  isPet,
  isChildren,
  maxGuess,
}: {
  state: number;
  setState: React.Dispatch<React.SetStateAction<number>>;
  isAdult?: boolean;
  isPet?: boolean;
  isChildren?: boolean;
  maxGuess?: number;
}) => {
  const handelLimitGuess = () => {
    if (isAdult) return state < maxGuess && setState(state + 1);
    if (isPet) return state < 2 && setState(state + 1);
    if (isChildren) return state < 5 && setState(state + 1);
  };
  return (
    <section className="space-x-5">
      <div className="flex items-center space-x-3">
        <span
          onClick={() =>
            isAdult
              ? state > 1 && setState(state - 1)
              : state > 0 && setState(state - 1)
          }
          className="border rounded-full hover:border-gray-500 text-xl cursor-pointer flex justify-center items-center w-9 h-9"
        >
          <svg
            viewBox="0 0 12 12"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            role="presentation"
            focusable="false"
            className="h-3 w-3"
          >
            <path d="m.75 6.75h10.5v-1.5h-10.5z"></path>
          </svg>
        </span>
        <span className="text-lg font-medium w-[20px]">{state}</span>
        <span
          onClick={handelLimitGuess}
          className="border rounded-full text-xl hover:border-black  cursor-pointer flex justify-center items-center w-9 h-9"
        >
          <svg
            viewBox="0 0 12 12"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            role="presentation"
            focusable="false"
            className="h-3 w-3"
          >
            <path d="m6.75.75v4.5h4.5v1.5h-4.5v4.5h-1.5v-4.5h-4.5v-1.5h4.5v-4.5z"></path>
          </svg>
        </span>
      </div>
    </section>
  );
};

export default AddGuess;
