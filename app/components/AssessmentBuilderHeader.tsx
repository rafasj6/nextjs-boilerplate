import { useSaveAssessment } from "../hooks/assessmentHooks";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function AssessmentBuilderHeader() {
  const saveAssessment = useSaveAssessment().mutate;
  const handleSave = () => {
    saveAssessment();
    toast.success("Assessment saved successfully!");
  };
  return <div className="w-full flex justify-between">
    <p className="text-xl font-bold">Python Developer</p>
    <button
      className="bg-[#217BBB] text-white rounded-md px-2 py-1"
      onClick={handleSave} >
      <p>Save</p>
    </button>
  </div>
}
