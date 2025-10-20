import { ArrowUpRight, Copy, Eye, Feather, Lock, Share2 } from "lucide-react";
import PasswordBox from "./Components/PasswordBox/PasswordBox";
import TextBox from "./Components/TextBox/TextBox";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Modal from "./Components/Modal/Modal";
import {
  makeSecretText,
  extractSecretText,
  doesItHaveAPasswordBro,
} from "./Logic/services";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
}

function App() {
  const [inputState, setInputState] = useState<boolean>(false);
  // false for hide and true for reveal
  //

  const isMobile = useIsMobile();

  useEffect(() => {
    window.navigator.clipboard.readText();
  }, []);

  const [bucket, setBucket] = useState<string>("");
  const [decryptCtx, setDecryptCtx] = useState<{
    hasPass: boolean;
    resultText: string;
    passwordInput: string;
  }>({
    hasPass: false,
    resultText: "",
    passwordInput: "",
  });

  const [modalCtx, setModalCtx] = useState({
    type: "hide-state",
    visible: false,
  });

  const [textCtx, setTextCtx] = useState<{
    isPublic: boolean;
    text: { publicText: string; privateText: string };
    pass: string;
  }>({
    isPublic: true,
    text: {
      publicText: "",
      privateText: "",
    },
    pass: "",
  });

  useEffect(() => {
    if (!modalCtx.visible) {
      setDecryptCtx({
        hasPass: false,
        resultText: "",
        passwordInput: "",
      });
    }
  }, [modalCtx.visible]);

  const handleShare = async (text: string) => {
    try {
      await window.navigator.share({
        title: "Choose the platform.",
        text: text,
      });
      console.log("Content shared successfully");
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  return (
    <div className="font-[Roboto_slab] overflow-hidden w-screen h-screen p-0 pt-2 sm:p-0 flex flex-col justify-start items-center sm:items-center">
      <AnimatePresence>
        {modalCtx.visible && (
          <Modal
            setModalCtx={setModalCtx}
            modalCtx={modalCtx}
            title={
              !inputState
                ? "Magic text copied to clipboard"
                : "The Secret text inside:"
            }
          >
            {!(modalCtx.type === "hide-state") ? (
              <div>
                <textarea
                  placeholder={
                    !decryptCtx.resultText && decryptCtx.hasPass
                      ? "Enter the password."
                      : ""
                  }
                  style={{
                    height:
                      !decryptCtx.resultText && decryptCtx.hasPass
                        ? "4em"
                        : "10em",
                  }}
                  className="rounded-xl transition-all duration-75 resize-none bg-gray-400/50 w-full text-2xl p-3 mt-1 mb-2"
                  onChange={(e) => {
                    if (decryptCtx.resultText) {
                      return;
                    } else {
                      setDecryptCtx((p: typeof decryptCtx) => ({
                        ...p,
                        passwordInput: e.target.value.toLowerCase(),
                      }));
                    }
                  }}
                  value={
                    decryptCtx.resultText
                      ? decryptCtx.resultText
                      : decryptCtx.passwordInput
                  }
                />

                {!decryptCtx.resultText && (
                  <button
                    onClick={() => {
                      setDecryptCtx((p: typeof decryptCtx) => ({
                        ...p,
                        resultText: String(
                          extractSecretText(bucket, decryptCtx.passwordInput),
                        ),
                      }));
                    }}
                    className="px-3 py-2 mb-2 text-xl w-full gap-2 bg-linear-to-b from-blue-500 to-blue-600  rounded-[1.25rem] [corner-shape:_squircle] text-white flex justify-center items-center sm:hover:scale-105 sm:active:scale-100 active:scale-95 active:to-blue-500 sm:active:to-blue-500 cursor-pointer transition-all duration-200 shadow-[inset_0_0.5px_1px_0.5px_rgba(255,255,255,0.2),_0_1px_1px_0px_rgba(0,0,0,0.2)]"
                  >
                    <Lock />
                    Unlock
                  </button>
                )}
              </div>
            ) : (
              <div>
                {isMobile ? (
                  <button
                    onClick={() => handleShare(bucket)}
                    className="px-3 py-2 mb-2 text-xl gap-2 bg-linear-to-b from-green-500 to-green-600  rounded-[1.25rem] [corner-shape:_squircle] text-white flex justify-center items-center sm:hover:scale-105 sm:active:scale-100 active:scale-95 active:to-green-500 sm:active:to-green-500 cursor-pointer transition-all duration-200 shadow-[inset_0_0.5px_1px_0.5px_rgba(255,255,255,0.2),_0_1px_1px_0px_rgba(0,0,0,0.2)]"
                  >
                    <Share2 />
                    Share
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      window.navigator.clipboard.writeText(bucket);
                    }}
                    className="px-3 py-2 mb-2 text-xl gap-2 bg-linear-to-b from-green-500 to-green-600  rounded-[1.25rem] [corner-shape:_squircle] text-white flex justify-center items-center sm:hover:scale-105 sm:active:scale-100 active:scale-95 active:to-green-500 sm:active:to-green-500 cursor-pointer transition-all duration-200 shadow-[inset_0_0.5px_1px_0.5px_rgba(255,255,255,0.2),_0_1px_1px_0px_rgba(0,0,0,0.2)]"
                  >
                    <Copy />
                    Copy Again
                  </button>
                )}
                {isMobile ? (
                  <div>
                    Now, Share it with whoever you like.
                    <span className="text-green-400">Whatsapp</span> or{" "}
                    <span className="text-pink-400">Instagram</span>... It's
                    your choice. The Reciever should unwrap the secret message
                    using this app. <br />
                    <p className="w-full h-[1px] bg-black/10 my-4"></p>
                    <pre className="text-white/60 italic font-bold flex font-[Roboto_Slab]">
                      Created by{" "}
                      <a
                        href="https://github.com/rinogodson"
                        target="_blank"
                        className="underline"
                      >
                        Rino Godson
                      </a>
                      <ArrowUpRight className="text-[#A8AAB0]" />
                    </pre>
                  </div>
                ) : (
                  <div>
                    Now you can paste it anywhere you want...{" "}
                    <span className="text-green-400">Whatsapp</span> or{" "}
                    <span className="text-pink-400">Instagram</span>... It's
                    your choice. The Reciever should unwrap the secret message
                    using this app. Only use Desktop clients of these apps.
                    <br />
                    <p className="w-full h-[1px] bg-black/10 my-4"></p>
                    <pre className="text-white/60 italic font-bold flex font-[Roboto_Slab]">
                      Created by{" "}
                      <a
                        href="https://github.com/rinogodson"
                        target="_blank"
                        className="underline"
                      >
                        Rino Godson
                      </a>
                      <ArrowUpRight className="text-[#A8AAB0]" />
                    </pre>
                  </div>
                )}
              </div>
            )}
          </Modal>
        )}
      </AnimatePresence>
      <div className="jacquard-24-regular text-[#E8F1FD] text-4xl sm:text-6xl sm:h-25 flex justify-center items-center">
        Ghost Ink
      </div>
      <div className="gap-10 flex-col relative h-[85svh] sm:h-[calc(100%_-_14em)] w-full mt-2 sm:mt-0 sm:w-130 flex justify-start sm:pt-15 pt-5 items-center bg-black/20 sm:bg-white/5 sm:border-x-3 border-x-0 border-3 border-[#AEDEEC] sm:rounded-b-[5em] rounded-b-[0em] sm:rounded-t-[8em] rounded-t-[0em] shadow-[inset_0_0_150px_rgba(174,222,236,0.3),_0_0_80px_0px_#AEDEEC] sm:shadow-[inset_0_0_150px_rgba(174,222,236,0.4),_0_0_300px_0px_rgba(174,222,236,0.8)]">
        <div className="sm:w-100 w-full sm:px-0 px-5 sm:h-30 h-25 gap-3 sm:gap-10 grid grid-cols-2">
          <div
            onClick={() => {
              setInputState(false);
              setModalCtx((p: typeof modalCtx) => ({
                ...p,
                type: "hide-state",
              }));
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
              setModalCtx((p: typeof modalCtx) => ({
                ...p,
                type: "reveal-state",
              }));
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
                <TextBox textCtx={textCtx} setTextCtx={setTextCtx} />
              </div>
              <div className="h-fit w-full px-3 sm:w-100 flex justify-center">
                <PasswordBox textCtx={textCtx} setTextCtx={setTextCtx} />
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
              COPY THE MAGIC TEXT, and <br />
              Click the orb to
              <br />
              paste the copied text.
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          style={{
            bottom: !inputState ? "-3.75em" : "calc(100% / 4)",
            width: !inputState ? "7.5em" : "10em",
          }}
          onClick={() => {
            if (!inputState) {
              if (textCtx.pass.length < 4) {
                if (textCtx.pass != "") {
                  window.alert("Password must have 4 characters");
                  return;
                }
              }
              if (
                !(
                  textCtx.text.publicText === "" ||
                  textCtx.text.privateText === ""
                )
              ) {
                setModalCtx((p: typeof modalCtx) => ({ ...p, visible: true }));
                setBucket(
                  makeSecretText(
                    textCtx.text.publicText,
                    textCtx.text.privateText,
                    textCtx.pass,
                  ),
                );
                if (!isMobile) {
                  window.navigator.clipboard.writeText(
                    makeSecretText(
                      textCtx.text.publicText,
                      textCtx.text.privateText,
                      textCtx.pass,
                    ),
                  );
                } else {
                  handleShare(
                    makeSecretText(
                      textCtx.text.publicText,
                      textCtx.text.privateText,
                      textCtx.pass,
                    ),
                  );
                }
                setTextCtx({
                  isPublic: true,
                  text: {
                    publicText: "",
                    privateText: "",
                  },
                  pass: "",
                });
              }
            } else {
              setModalCtx((p: typeof modalCtx) => ({ ...p, visible: true }));
              const updateText = async () => {
                const newText = await window.navigator.clipboard.readText();
                setBucket(newText);
                if (doesItHaveAPasswordBro(newText)) {
                  setDecryptCtx((p: typeof decryptCtx) => ({
                    ...p,
                    hasPass: true,
                  }));
                } else {
                  setDecryptCtx((p: typeof decryptCtx) => ({
                    ...p,
                    hasPass: false,
                    resultText: String(extractSecretText(bucket, "")),
                  }));
                }
              };
              updateText();
            }
          }}
          className="shadow-[0_0_50px_#AEDEEC,_inset_0_0_50px_rgba(255,255,255,0.3)] sm:hover:shadow-[0_0_100px_#AEDEEC] bg-[url(/orb.webp)] bg-contain rounded-full aspect-square absolute animate-spin sm:hover:scale-110 sm:active:scale-90 active:scale-90 transition-all duration-200 cursor-pointer bg-no-repeat sm:active:brightness-200 active:brightness-200 sm:hover:brightness-110"
        ></motion.div>
      </div>
    </div>
  );
}

export default App;
