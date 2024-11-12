import Image from "next/image";
import { useState } from "react";
import useAssessmentStore from "../assessmentState";
import { Question } from "../types";


export function SectionComponent({ index, deleteSection, questions, setQuestions }: { index: number, deleteSection: () => void, questions: Question[], setQuestions: (questions: Question) => void }) {
    const [isOpen, setIsOpen] = useState(false)
    const setSection = useAssessmentStore((state) => state.setSection);
    const setHighlightedQuestion = useAssessmentStore((state) => state.setHighlightedQuestion);
  
    function addQuestion() {
      const newQuestion = ({ text: "" } as Question)
      const newQuestions = [...questions, newQuestion]
      setSection(index, { questions: newQuestions })
    }
  
    return <div className="flex flex-col py-2 gap-3">
      <div className="flex justify-between cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <div className="flex gap-4 items-center">
          <p> Section {index + 1}</p>
          <button onClick={deleteSection}>
            <Image src="/Trash.png" alt="Add" width={24} height={24} />
          </button>
        </div>
        <Image
          src="/Caret-up.png"
          alt="Add"
          width={24}
          height={24}
          className={`transition-transform duration-300 ${!isOpen ? 'rotate-180' : ''}`}
        />
      </div>
      {isOpen &&
        <>
          <div className="flex flex-col text-sm gap-2 text-[#565B61]">
            <p>{questions.length} Question(s)</p>
            <div className="cursor-pointer">
              {questions.map((question, i) => (
                <div style={{ background: i % 2 ? "#FFFFFF" : "#69A3CC29" }} className="w-full max-w-full flex items-center justify-center h-[50px] rounded-md" key={i} onClick={() => { setHighlightedQuestion(index, i) }}>
                  <p className="truncate items-center "> {question.text}</p>
                </div>))}
            </div>
          </div>
  
          <button onClick={addQuestion} className="w-full border-[#217BBB] text-[#217BBB] border  flex items-center justify-center rounded-md py-2">
            <Image src="/Plus.png" alt="Add" width={20} height={20} />
            <p>Add Question</p>
          </button>
        </>
      }
    </div>
  }
  