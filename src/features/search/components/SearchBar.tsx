import { Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchSelector } from "../store/slice/searchSelector";
import { v4 as uuidv4 } from "uuid";
import { motion, useAnimation } from "framer-motion";
import TextInput from "@/components/custom/TextInput";
import { twMerge } from "tailwind-merge";
import useIsDesktop from "@/hooks/use-is-desktop";

export default function SearchBar({ className }: { className?: string }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { query } = useSearchSelector();
  const [input, setInput] = useState("");
  const controls = useAnimation();
  const isDesktop = useIsDesktop();

  const classes = twMerge("w-full", className);

  useEffect(() => {
    if (isDesktop) {
      controls.start("collapsed");
    }
  }, [controls, isDesktop]);

  // put focus on input when landing on search page
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  useEffect(() => {
    if (query.length > 0) {
      setInput(query);
    }
  }, [query]);

  const handleFocus = () => {
    if (isDesktop) return;
    controls.start("expanded");
  };

  const handleBlur = () => {
    if (isDesktop) return;
    controls.start("collapsed");
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = input.trim();
    if (!value || value.length < 1) return;
    // Remove focus from the input
    if (inputRef.current) {
      inputRef.current.blur();
    }
    navigate("/search?" + new URLSearchParams({ q: value }), { state: uuidv4() });
  };

  const resetQuery = () => {
    setInput("");
  };

  return (
    <form onSubmit={onSubmit} className={classes}>
      <div className="flex justify-end">
        <motion.div
          className="relative"
          initial="expanded"
          animate={controls}
          variants={inputVariants}
        >
          <TextInput
            onFocus={handleFocus}
            onBlur={handleBlur}
            type="text"
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoComplete="off"
            placeholder="Cerca album..."
            className="pl-12 pr-12"
          />
          <div className="absolute h-full top-0 items-center flex left-4">
            <Search size={20} strokeWidth={2.25} />
          </div>
          <div className="absolute h-full top-0 items-center flex right-4 cursor-pointer">
            {input.length > 0 && (
              <X
                className="cursor-pointer"
                size={20}
                strokeWidth={3}
                onClick={() => resetQuery()}
              />
            )}
          </div>
        </motion.div>
      </div>
    </form>
  );
}

const inputVariants = {
  expanded: {
    width: "100%",
    opacity: 1,
    transform: "scale(1)",
    height: "3rem",
  },
  collapsed: {
    width: "220px",
    opacity: 0.9,
    transform: "scale(1)",
    height: "2.5rem",
  },
};
