import { KeyRound } from "lucide-react";
function PasswordBox() {
  return (
    <>
      <div
        style={{
          background: "rgba(255,255,255,0.1)",
          border: "solid 3px rgba(255,255,255,0.2)",
        }}
        className="flex justify-between pr-5 items-center w-full h-fit text-white text-2xl transition-all duration-300 rounded-xl [corner-shape:_squircle] shadow-[inset_0px_2px_1px_1px_rgba(0,0,0,0.1)]"
      >
        <input
          type="text"
          className="font-[Merriweather] w-full h-full p-5 resize-none"
          placeholder={"Password (Optional)"}
        />
        <KeyRound size={30} />
      </div>
    </>
  );
}

export default PasswordBox;
