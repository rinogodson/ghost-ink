import { useRef, useEffect } from "react";

export const useWithSound = (audioSource: any) => {
  const soundRef = useRef(new Audio(audioSource));
  useEffect(() => {
    soundRef.current = new Audio(audioSource);
  }, []);

  const playSound = () => {
    soundRef.current.play();
  };

  const pauseSound = () => {
    soundRef.current.pause();
  };

  return {
    playSound,
    pauseSound,
  };
};
