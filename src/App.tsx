import { Eye, Feather } from "lucide-react";
import PasswordBox from "./Components/PasswordBox/PasswordBox";
import TextBox from "./Components/TextBox/TextBox";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

function App() {
  const [inputState, setInputState] = useState<boolean>(false);
  // false for hide and true for reveal
  //
  return (
    <div className="font-[Roboto_slab] overflow-hidden w-screen h-screen p-2 sm:p-0 flex flex-col justify-start items-center sm:items-center">
      <div className="jacquard-24-regular text-[#E8F1FD] text-4xl sm:text-6xl sm:h-25 flex justify-center items-center">
        Ghost Ink
      </div>
      <div className="gap-10 flex-col relative h-[calc(100%_-_15em)] sm:h-[calc(100%_-_14em)] w-full mt-10 sm:mt-0 sm:w-130 flex justify-start sm:pt-15 pt-5 items-center bg-white/5 border-3 border-[#AEDEEC] sm:rounded-b-[5em] rounded-b-[3em] sm:rounded-t-[8em] rounded-t-[5em] shadow-[inset_0_0_150px_rgba(174,222,236,0.3),_0_0_80px_0px_#AEDEEC] sm:shadow-[inset_0_0_150px_rgba(174,222,236,0.4),_0_0_300px_0px_rgba(174,222,236,0.8)]">
        <div className="sm:w-100 w-full sm:px-0 px-5 h-30 gap-5 sm:gap-10 grid grid-cols-2">
          <div
            onClick={() => {
              setInputState(false);
            }}
            style={{
              color: inputState ? "white" : "#AEDEEC",
              background: inputState
                ? "linear-gradient(to bottom, rgba(255,255,255,0.1), transparent)"
                : "linear-gradient(to bottom, rgba(174,222,236,0.2), transparent)",
              boxShadow: inputState
                ? "inset 0px 1px 1px 1px rgba(255,255,255,0.1), 0px 1px 1px 1px rgba(0,0,0,0.1)"
                : "inset 0px 1px 1px 1px rgba(255,255,255,0.1), 0px 1px 1px 1px rgba(0,0,0,0.1), inset 0px 0px 40px 2px rgba(174,222,236,0.2), inset 0px 0px 2px 2px rgba(174,222,236,0.8)",
            }}
            className="cursor-pointer flex flex-col justify-center items-center rounded-[4em] transition-all duration-300"
          >
            <Feather size={40} />
            <p>Hide</p>
          </div>
          <div
            onClick={() => {
              setInputState(true);
            }}
            style={{
              color: !inputState ? "white" : "#AEDEEC",
              background: !inputState
                ? "linear-gradient(to bottom, rgba(255,255,255,0.1), transparent)"
                : "linear-gradient(to bottom, rgba(174,222,236,0.2), transparent)",
              boxShadow: !inputState
                ? "inset 0px 1px 1px 1px rgba(255,255,255,0.1), 0px 1px 1px 1px rgba(0,0,0,0.1)"
                : "inset 0px 1px 1px 1px rgba(255,255,255,0.1), 0px 1px 1px 1px rgba(0,0,0,0.1), inset 0px 0px 40px 2px rgba(174,222,236,0.2), inset 0px 0px 2px 2px rgba(174,222,236,0.8)",
            }}
            className="cursor-pointer flex flex-col justify-center items-center rounded-[4em] transition-all duration-300"
          >
            <Eye size={40} />
            <p>Reveal</p>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {!inputState ? (
            <motion.div
              key={"jdk"}
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 1 }}
              exit={{ scaleY: 0, opacity: 0 }}
              transition={{ duration: 0.3, type: "spring" }}
              className="gap-8 flex flex-col origin-top"
            >
              <div className="h-fit w-full px-3 sm:w-100">
                <TextBox />
              </div>
              <div className="h-fit w-full px-3 sm:w-100 flex justify-center">
                <PasswordBox />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={"jd"}
              initial={{ scaleY: 1.1, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 1 }}
              exit={{ scaleY: 1.1, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="text-2xl text-white/50 origin-top"
            >
              Click the orb to
              <br />
              paste the copied text.
            </motion.div>
          )}
        </AnimatePresence>

        <div
          style={{
            bottom: !inputState ? "-3.75em" : "calc(100% / 4)",
            width: !inputState ? "7.5em" : "10em",
          }}
          className="shadow-[0_0_50px_#AEDEEC,_inset_0_0_50px_rgba(255,255,255,0.3)] sm:hover:shadow-[0_0_100px_#AEDEEC] bg-[url(/orb.webp)] bg-contain rounded-full aspect-square absolute animate-spin sm:hover:scale-110 active:scale-90 transition-all duration-400 cursor-pointer bg-no-repeat active:brightness-200 sm:hover:brightness-110"
        ></div>
      </div>
    </div>
  );
}

export default App;
