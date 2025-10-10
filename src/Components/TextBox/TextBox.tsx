import React from "react";

function TextBox({ toggled }: { toggled?: boolean }) {
  const [showed, setShowed] = React.useState<boolean>(true);
  return (
    <>
      {showed ? (
        <div className="w-full h-full bg-[#1b2847] text-white text-3xl border-15 focus-within:border-5 transition-all duration-300 border-solid border-gray-700 rounded-4xl">
          <textarea
            className="w-full h-full p-5 resize-none"
            placeholder="Text everyone sees."
          />
        </div>
      ) : (
        <div className="w-full h-full bg-gray-900 text-white text-3xl border-5 border-dashed border-gray-700 rounded-4xl">
          <textarea
            className="w-full h-full p-5 resize-none"
            placeholder="Secret Text."
          />
        </div>
      )}
      <button
        className="bg-red-400 absolute bottom-0"
        onClick={() => setShowed(!showed)}
      >
        toggle
      </button>
    </>
  );
}

export default TextBox;
