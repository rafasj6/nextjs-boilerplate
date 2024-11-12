import { useEffect } from "react";
import useAssessmentStore from "../assessmentState";
import { useFetchAssessment } from "../hooks/assessmentHooks";
import { AssessmentBuilder } from "./AssessmentBuilder";
import { AssessmentBuilderHeader } from "./AssessmentBuilderHeader";

export function AsssementComponent() {
  const setSections = useAssessmentStore((state) => state.setSections);
  const setHighlightedQuestion = useAssessmentStore((state) => state.setHighlightedQuestion);
  const { data: sections } = useFetchAssessment();
  
  useEffect(() => {
    if (sections) {
      console.log({sections})
      setSections(sections);
      setHighlightedQuestion(0,0)
    }
  }, [sections])

  return <div className="flex flex-col gap-10 bg-gray-50 w-screen min-h-screen">
    <div className="w-full h-10 bg-[#123A68]" />
    <div className="text-black  px-20 flex flex-col gap-10">
      <AssessmentBuilderHeader />
      <AssessmentBuilder />
    </div>
  </div>
}
