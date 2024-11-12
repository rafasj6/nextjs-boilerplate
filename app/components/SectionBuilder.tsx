import useAssessmentStore from "../assessmentState";
import { Section } from "../types";
import { SectionComponent } from "./SectionComponent";
import Image from "next/image";

export function SectionBuilder() {
    const blob = useAssessmentStore((state) => state.blob);
    const setBlob = useAssessmentStore((state) => state.setBlob);
  
    function addSection() {
      const newSection = ({ questions: [] } as Section)
      const newSections = [...blob.sections, newSection]
      setBlob({ sections: newSections })
    }
  
    function deleteSection(index: number) {
      setBlob({ sections: blob.sections.filter((_, i) => i !== index) });
    }
  
    return <div className="flex flex-col">
      <div className="border h-min-[416px] w-[416px] shadow-sm rounded-sm  p-4 bg-white">
        {blob.sections.map((section, i) =>
          <div className="flex flex-col gap-4" key={i}>
            <SectionComponent
              index={i}
              deleteSection={() => deleteSection(i)}
              questions={section.questions}
              setQuestions={(questions) => blob.sections[i]}
            />
            <div className="w-full border h-[1px]" />
          </div>
        )}
        {blob.sections.length == 0 && <p>No sections yet</p>}
      </div>
      <button className="p-1 h-[50px] rounded-xl flex items-center" onClick={addSection}>
        <Image className="saturate-0" src="/Plus.png" alt="Add" width={20} height={20} />
        <span className="ml-2 ">Add Section</span>
      </button>
    </div>
  }
  