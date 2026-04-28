import { useState } from "react";
import SubmitModalCard from "../SubmitModalCard";

const SubmitBtn = () => {
  const [submitModal, setSubmitModal] = useState(false);
  return (
    <>
      <button
        onClick={() => setSubmitModal(true)}
        className="bg-[#5461b0] rounded-[5px] px-2 py-1 cursor-pointer text-amber-50 font-bold hover:bg-[#4a5299] active:bg-[#454d85] transition-colors"
        aria-label="Open submit project modal"
      >
        Submit Work
      </button>
      <SubmitModalCard isOpen={submitModal} onClose={() => setSubmitModal(false)} />
    </>
  );
};

export default SubmitBtn;
