import { useState, useEffect } from "react";
import useAssessmentStore from "../assessmentState";

export function QuestionHighlight() {
  const highlightedQuestion = useAssessmentStore((state) => state.highlightedQuestion);
  const setHighlightedQuestion = useAssessmentStore((state) => state.setHighlightedQuestion);
  const updateQuestion = useAssessmentStore((state) => state.updateQuestion);
  const updateSection = useAssessmentStore((state) => state.updateSection);

  const [questionText, setQuestionText] = useState("")

  useEffect(() => {
    setQuestionText(highlightedQuestion?.text ?? "")
  }, [highlightedQuestion])

  useEffect(() => {
    if (highlightedQuestion) {
      updateQuestion(highlightedQuestion?.sectionId,
        highlightedQuestion?.questionId,
        { text: questionText })
    }
  }, [questionText, highlightedQuestion])

  function deleteQuestion() {
    if (highlightedQuestion) {
      const { sectionId, questionId } = highlightedQuestion;
      const section = useAssessmentStore.getState().getSection(sectionId);
      if (section) {
        const newQuestions = section.questions.filter((_, index) => index !== questionId);
        updateSection(sectionId, { ...section, questions: newQuestions });
      }
      setHighlightedQuestion(0, 0)
    }
  }

  return <div className="w-full h-min-[300px] rounded-lg border bg-white px-6 py-6 flex flex-col justify-between">
    <div className="flex flex-col gap-5">
      <p className="text-lg font-bold">Question {(highlightedQuestion?.questionId ?? 0) + 1} </p>
      <textarea
        className="text-[#0C151D] font-light w-full h-min-[40px] h-[200px] p-4 border"
        value={questionText}
        onChange={(e) => setQuestionText(e.target.value)}
      />    </div>
    <div className="w-full border-t h-[1px] flex justify-end py-2">
      <button onClick={deleteQuestion}>
        <p className="text-[#475467] font-bold">Delete</p>
      </button>
    </div>
  </div>
}