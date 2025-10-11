import { Eye, Feather } from "lucide-react";
import PasswordBox from "./Components/PasswordBox/PasswordBox";
import TextBox from "./Components/TextBox/TextBox";

function App() {
  return (
    <div className="font-[Roboto_slab] overflow-hidden w-screen h-screen p-5 sm:p-0 flex flex-col justify-start items-center sm:items-center">
      <div className="jacquard-24-regular text-[#E8F1FD] text-4xl sm:text-6xl sm:h-25 flex justify-center items-center">
        Ghost Ink
      </div>
      <div className="gap-10 flex-col relative h-[calc(100%_-_10em)] sm:h-200 w-full mt-10 sm:mt-0 sm:w-130 flex justify-start sm:pt-15 pt-5 items-center bg-white/5 border-3 border-[#AEDEEC] sm:rounded-b-[5em] rounded-b-[3em] sm:rounded-t-[8em] rounded-t-[5em] shadow-[inset_0_0_150px_rgba(174,222,236,0.3),_0_0_80px_0px_#AEDEEC] sm:shadow-[inset_0_0_150px_rgba(174,222,236,0.4),_0_0_300px_0px_rgba(174,222,236,0.8)]">
        <div className="sm:w-100 w-full sm:px-0 px-5 h-30 gap-5 sm:gap-10 grid grid-cols-2">
          <div className="flex flex-col justify-center items-center text-white w-full  bg-linear-to-b from-[rgba(255,255,255,0.1)] shadow-[inset_0px_1px_1px_1px_rgba(255,255,255,0.1),_0px_1px_1px_1px_rgba(0,0,0,0.1)] rounded-[4em]">
            <Feather size={40} />
            <p>Hide</p>
          </div>
          <div className="flex flex-col justify-center items-center text-[#AEDEEC] w-full  bg-linear-to-b from-[rgba(174,222,236,0.2)] shadow-[inset_0px_1px_1px_1px_rgba(255,255,255,0.1),_0px_1px_1px_1px_rgba(0,0,0,0.1),_inset_0px_0px_3px_2px_rgba(174,222,236,0.2)] rounded-[4em]">
            <Eye size={40} />
            <p>Reveal</p>
          </div>
        </div>

        <div className="h-fit w-full px-3 sm:w-100">
          <TextBox />
        </div>
        <div className="h-fit w-full px-3 sm:w-100 flex justify-center">
          <PasswordBox />
        </div>
        <div className="shadow-[0_0_50px_#AEDEEC,_inset_0_0_50px_rgba(255,255,255,0.3)] sm:hover:shadow-[0_0_100px_#AEDEEC] bg-[url(/orb.webp)] bg-contain w-30 rounded-full aspect-square absolute bottom-0 translate-y-15 animate-spin hover:scale-110 active:scale-90 transition-all duration-400 cursor-pointer bg-no-repeat active:brightness-200 hover:brightness-110"></div>
      </div>
    </div>
  );
}

export default App;
