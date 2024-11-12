import { useSaveAssessment } from "../hooks/assessmentHooks";

export function AssessmentBuilderHeader() {
    const saveAssessment = useSaveAssessment().mutate;
  
    return <div className="w-full flex justify-between">
      <p className="text-xl font-bold">Python Developer</p>
      <button
        className="bg-[#217BBB] text-white rounded-md px-2 py-1"
        onClick={() => saveAssessment()} >
        <p>Save</p>
      </button>
    </div>
  }
  