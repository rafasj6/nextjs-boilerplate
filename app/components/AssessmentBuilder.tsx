import { QuestionHighlight } from "./QuestionHighlight";
import { SectionBuilder } from "./SectionBuilder";

export function AssessmentBuilder() {
    return <div className="flex gap-10 gray-100">
        <SectionBuilder />
        <QuestionHighlight />
    </div>
}