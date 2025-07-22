export type GetQuestionsAPIResponse = Array<{
    id: string,
    question: string,
    answer: string | null,
    createdAt: string,
    isGeneratingAnswer?: boolean,
}>