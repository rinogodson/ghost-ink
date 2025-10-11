import React from "react";

function TextBox({ toggled }: { toggled?: boolean }) {
  const [showed, setShowed] = React.useState<boolean>(true);
  return (
    <>
      <div
        style={{
          background: showed ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
          border: showed
            ? "solid 3px rgba(255,255,255,0.2)"
            : "dashed 3px rgba(255,255,255,0.2)",
        }}
        className="w-full h-40 text-white text-2xl transition-all duration-300 rounded-xl [corner-shape:_squircle]"
      >
        <textarea
          className="font-[Merriweather] w-full h-full p-5 resize-none"
          placeholder={showed ? "Text Everyone sees." : "Secret text."}
        />
      </div>
      <div className="flex justify-end items-center gap-5 mt-4">
        <p className="text-white/50">
          Switch to {showed ? "Secret Text" : "Public Text"}
        </p>
        <button
          className="bg-linear-to-t from-[rgba(255,255,255,0.1)] to-[rgba(255,255,255,0.2)] transition-all duration-200 active:from-[rgba(255,255,255,0.2)] active:to-[rgba(255,255,255,0.3)] border-1 border-solid border-[rgba(255,255,255,0.1)] text-white px-4 py-2 text-2xl w-fit rounded-3xl [corner-shape:_squircle]"
          onClick={() => setShowed(!showed)}
        >
          FLIP
        </button>
      </div>
    </>
  );
}

export default TextBox;
