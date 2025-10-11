import TextBox from "./Components/TextBox/TextBox";

function App() {
  return (
    <div className="font-[Roboto_slab] overflow-hidden w-screen h-screen p-5 sm:p-0 flex flex-col justify-start items-center sm:items-center">
      <div className="jacquard-24-regular text-[#AEDEEC] text-4xl sm:text-6xl sm:h-25 flex justify-center items-center">
        Ghost Ink
      </div>
      <div className="relative h-[calc(100%_-_10em)] sm:h-200 w-full mt-10 sm:mt-0 sm:w-150 flex justify-center items-center bg-white/5 border-3 border-[#AEDEEC] rounded-[3em] corner-scoop shadow-[inset_0_0_150px_rgba(174,222,236,0.3),_0_0_50px_#AEDEEC] sm:shadow-[inset_0_0_150px_rgba(174,222,236,0.4),_0_0_50px_#AEDEEC]">
        <div className="h-fit w-fit sm:w-100">
          <TextBox />
        </div>
        <div className="shadow-[0_0_50px_#AEDEEC] bg-[url(/orb.webp)] bg-contain w-30 rounded-full aspect-square absolute bottom-0 translate-y-15 animate-spin hover:scale-110 active:scale-90 transition-all duration-400 cursor-pointer bg-no-repeat"></div>
      </div>
    </div>
  );
}

export default App;
