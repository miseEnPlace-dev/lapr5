import { useEffect } from "react";
import { motion } from "framer-motion";

interface ModalProps {
  isVisible?: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  children?: React.ReactNode;
}
const Modal: React.FC<ModalProps> = ({
  isVisible,
  setIsVisible,
  title,
  children,
}) => {
  if (!isVisible) return;

  useEffect(() => {
    const closeWithEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsVisible(false);
    };
    window.addEventListener("keydown", closeWithEsc);

    return () => window.removeEventListener("keydown", closeWithEsc);
  }, [setIsVisible]);

  return (
    <>
      <section
        onClick={() => setIsVisible((cur) => !cur)}
        className="fixed left-0 top-0 h-screen w-screen bg-slate-300 p-6 opacity-70 shadow-lg"
      ></section>
      <motion.div
        initial={{ bottom: 0, x: "-50%", opacity: 0 }}
        animate={{ bottom: 150, x: "-50%", opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="absolute left-1/2 flex h-3/4 w-3/4 -translate-x-1/2 flex-col rounded-xl bg-slate-300 p-8"
      >
        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-8 top-6 text-2xl font-black text-red-500 hover:text-red-600"
        >
          X
        </button>
        <span className="mb-4 w-full text-center text-4xl font-black">
          {title}
        </span>
        {children}
      </motion.div>
    </>
  );
};

export default Modal;
