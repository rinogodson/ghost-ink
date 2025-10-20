import { X } from "lucide-react";
import { motion } from "framer-motion";

function Modal({
  setModalCtx,
  modalCtx,
  title,
  children,
}: {
  setModalCtx: any;
  modalCtx: any;
  title: string;
  children: any;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      className="bg-black/60 z-[1000] text-white w-screen h-screen fixed top-0 left-0 flex justify-center items-center backdrop-blur-sm will-change-transform will-change-opacity"
    >
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 30, opacity: 0 }}
        transition={{ duration: 0.15, ease: "easeOut" }}
        className="bg-gray-700 sm:w-100 w-[80%] h-fit pb-3 gap-3 flex flex-col rounded-3xl [corner-shape:_squircle] overflow-hidden shadow-[inset_0_0px_1px_0.5px_rgba(0,0,0,0.5),_0_1px_1px_0px_rgba(0,0,0,0.2)]"
      >
        <div className="h-12 bg-linear-to-b from-gray-800 to-gray-900 text-gray-200 border-b-1 border-gray-950 w-full flex justify-between items-center p-2">
          <p className="pl-2 font-bold">{title}</p>
          <button
            onClick={() =>
              setModalCtx((p: typeof modalCtx) => ({ ...p, visible: false }))
            }
            className="h-full aspect-square bg-linear-to-b from-red-500 to-red-600  rounded-[1.25rem] [corner-shape:_squircle] text-white flex justify-center items-center sm:hover:scale-105 sm:active:scale-100 sm:active:to-red-500 cursor-pointer transition-all duration-200 shadow-[inset_0_0.5px_1px_0.5px_rgba(255,255,255,0.2),_0_1px_1px_0px_rgba(0,0,0,0.2)]"
          >
            <X size={20} />
          </button>
        </div>
        <div className="mx-5">{children}</div>
      </motion.div>
    </motion.div>
  );
}

export default Modal;
