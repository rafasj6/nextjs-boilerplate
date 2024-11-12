import useAssessmentStore from "../assessmentState";
import { Section } from "../types";
import { SectionComponent } from "./SectionComponent";
import Image from "next/image";

export function SectionBuilder() {
    const sections = useAssessmentStore((state) => state.sections);
    const deleteSection = useAssessmentStore((state) => state.deleteSection);
    const addSection = useAssessmentStore((state) => state.addSection);

    const sectionsAsList = Object.values(sections)

    return <div className="flex flex-col">
        <div className="border h-min-[416px] w-[416px] shadow-sm rounded-sm  p-4 bg-white">
            {sectionsAsList.map((section, i) => (
                <div className="flex flex-col gap-4" key={i}>
                    <SectionComponent
                        index={i}
                        deleteSection={() => deleteSection(i)}
                        questions={section?.questions}
                        setQuestions={(questions) => sections[i]}
                    />
                    <div className="w-full border h-[1px]" />
                </div>
            ))}
            {sectionsAsList.length === 0 && <p>No sections yet</p>}
        </div>
        <button className="p-1 h-[50px] rounded-xl flex items-center" onClick={() => addSection({ questions: [] })}>
            <Image className="saturate-0" src="/Plus.png" alt="Add" width={20} height={20} />
            <span className="ml-2 ">Add Section</span>
        </button>
    </div>
}
