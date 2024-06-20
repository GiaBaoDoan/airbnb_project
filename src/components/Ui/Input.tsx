import { HTMLInputTypeAttribute } from "react";
import { UseFormRegister } from "react-hook-form";

type InputProps = {
  register?: UseFormRegister<any>;
  error?: string;
  name?: string;
  value?: string;
  placeholder?: string;
  type: HTMLInputTypeAttribute;
};
export const Input = ({
  register,
  error,
  name,
  placeholder,
  type,
  value,
}: InputProps) => {
  return (
    <div className="w-full space-y-3">
      <div>
        <input
          value={value}
          placeholder={placeholder}
          type={type}
          className={`w-full outline-none ${error ? "!border-red-600" : ""}`}
          {...register(name)}
        ></input>
      </div>
      {error && (
        <div className="!text-red-600 flex items-center !text-[16px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="red"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-[20px] h-[20px] text-white font-800 align-bottom mr-[5px]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
            />
          </svg>
          <span className="w-[90%]">{error}</span>
        </div>
      )}
    </div>
  );
};
