import { X } from "lucide-react";
import { motion } from "framer-motion";

function Modal({ children }: { children: any }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-black/70 z-1000 w-screen h-screen absolute top-0  flex justify-center items-center"
    >
      <div className="bg-gray-300 sm:w-100 w-[80%] h-fit pb-5 gap-3 flex flex-col rounded-3xl [corner-shape:_squircle] overflow-hidden shadow-[inset_0_0px_1px_0.5px_rgba(0,0,0,0.5),_0_1px_1px_0px_rgba(0,0,0,0.2)]">
        <div className="h-12 bg-linear-to-b from-gray-800 to-gray-900 text-gray-200 border-b-1 border-gray-950 w-full flex justify-between items-center p-2">
          <p className="pl-2 font-bold">Magic Text Copied to clipboard!</p>
          <button className="h-full aspect-square bg-linear-to-b from-red-500 to-red-600  rounded-[1.25rem] [corner-shape:_squircle] text-white flex justify-center items-center sm:hover:scale-105 sm:active:scale-100 sm:active:to-red-500 cursor-pointer transition-all duration-200 shadow-[inset_0_0.5px_1px_0.5px_rgba(255,255,255,0.2),_0_1px_1px_0px_rgba(0,0,0,0.2)]">
            <X size={20} />
          </button>
        </div>
        <div className="mx-5">{children}</div>
      </div>
    </motion.div>
  );
}

export default Modal;
