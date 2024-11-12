import { create } from 'zustand';
import { Section, Question } from './types';

type AssessmentState = {
    blob: {
        sections: Section[]
    }
    highlightedQuestion: { sectionIndex: number, questionIndex: number, text: string } | undefined;
    setHighlightedQuestion: (sectionIndex: number, questionIndex: number) => void;
    setBlob: (newBlob: { sections: Section[] }) => void;
    setSection: (index: number, section: Section) => void;
    getSection: (index: number) => Section | undefined;
    getQuestion: (sectionIndex: number, questionIndex: number) => Question | undefined;
    setQuestion: (sectionIndex: number, questionIndex: number, question: Question) => void;
};

const useAssessmentStore = create<AssessmentState>((set, get) => ({
    highlightedQuestion: undefined,
    setHighlightedQuestion: (sectionIndex: number, questionIndex: number) => {
        const section = get().getSection(sectionIndex);
        const question = section?.questions[questionIndex];
        set({ highlightedQuestion: { sectionIndex, questionIndex, text: question?.text ?? "" } })
    },
    blob: { sections: [] },
    setBlob: (newBlob) => set({ blob: newBlob }),
    setSection: (index, section) => {
        const { sections } = get().blob;
        const newSections = [...sections];
        newSections[index] = section;
        set({ blob: { sections: newSections } });
    },
    getSection: (index) => {
        const { sections } = get().blob;
        return sections[index];
    },
    getQuestion: (sectionIndex, questionIndex) => {
        const section = get().getSection(sectionIndex);
        return section?.questions[questionIndex];
    },
    setQuestion: (sectionIndex, questionIndex, question) => {
        const section = get().getSection(sectionIndex);
        if (section) {
            const newQuestions = [...section.questions];
            newQuestions[questionIndex] = question;
            get().setSection(sectionIndex, { ...section, questions: newQuestions });
        }
    }
}));

export default useAssessmentStore;
