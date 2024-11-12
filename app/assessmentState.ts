import { create } from 'zustand';
import { Section, Question } from './types';

type AssessmentState = {
    sections: Record<number, Section>;
    highlightedQuestion: { sectionId: number, questionId: number, text: string } | undefined;
    setHighlightedQuestion: (sectionId: number, questionId: number) => void;
    setSections: (sections: Record<number, Section>) => void;
    updateSection: (id: number, section: Section) => void;
    getSection: (id: number) => Section | undefined;
    getQuestion: (sectionId: number, questionId: number) => Question | undefined;
    updateQuestion: (sectionId: number, questionId: number, question: Question) => void;
    addQuestion: (sectionId: number, question: Question) => void;
    deleteQuestion: (sectionId: number, questionId: number) => void;
    addSection: (section?: Section) => void;
    deleteSection: (sectionId: number) => void;
};

const useAssessmentStore = create<AssessmentState>((set, get) => ({
    sections: {},
    highlightedQuestion: undefined,
    setHighlightedQuestion: (sectionId, questionId) => {
        const question = get().getQuestion(sectionId, questionId);
        set({ highlightedQuestion: { sectionId, questionId, text: question?.text ?? "" } });
    },
    setSections: (sections) => set({ sections }),
    updateSection: (id, section) => {
        set((state) => ({
            sections: { ...state.sections, [id]: section }
        }));
    },
    getSection: (id) => get().sections?.[id],
    getQuestion: (sectionId, questionId) => {
        const section = get().getSection(sectionId);
        return section?.questions[questionId];
    },
    updateQuestion: (sectionId, questionId, question) => {
        const section = get().getSection(sectionId);
        if (section) {
            const newQuestions = [...section.questions];
            newQuestions[questionId] = question;
            get().updateSection(sectionId, { ...section, questions: newQuestions });
        }
    },
    addQuestion: (sectionId, question) => {
        const section = get().getSection(sectionId);
        if (section) {
            const newQuestions = [...section.questions, question];
            get().updateSection(sectionId, { ...section, questions: newQuestions });
        }
    },
    deleteQuestion: (sectionId, questionId) => {
        const section = get().getSection(sectionId);
        if (section) {
            const newQuestions = section.questions.filter((_, index) => index !== questionId);
            get().updateSection(sectionId, { ...section, questions: newQuestions });
        }
    },
    addSection: (section) => {
        set((state) => {
            const newId = Object.keys(state.sections).length;
            return { sections: { ...state.sections, [newId]: section } };
        });
    },
    deleteSection: (sectionId) => {
        set((state) => {
            const remainingSections = Object.fromEntries(
                Object.entries(state.sections).filter(([id]) => id !== sectionId.toString())
            );
            return { sections: remainingSections };
        });
    }
}));

export default useAssessmentStore;