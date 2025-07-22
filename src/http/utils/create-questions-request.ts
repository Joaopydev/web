import { useMutation } from "@tanstack/react-query"
import { type CreateQuestionRequest } from "../types/CreateQuestionRequest"
import { type CreateQuestionResponse } from "../types/CreateQuestionResponse"
import { useQueryClient } from "@tanstack/react-query"
import { type GetQuestionsAPIResponse } from "../types/GetQuestionsAPIResponse"

export function useCreateQuestions (roomId: string) {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (data: CreateQuestionRequest) => {
            const response = await fetch(`http://localhost:3333/rooms/${roomId}/questions`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })

            const result: CreateQuestionResponse = await response.json()

            return result
        },
        //Executa no momento que for feita a chamada para a API.
        onMutate({ question }) {
            const newQuestion = {
                id: crypto.randomUUID(),
                question,
                answer: null,
                createdAt: new Date().toISOString(),
                isGeneratingAnswer: true
            }
            const questions = queryClient.getQueryData<GetQuestionsAPIResponse>(["get-questions", roomId])
            const questionArray = questions ?? []
            //Permite atualizar o valor de outra query com outro valor
            queryClient.setQueryData<GetQuestionsAPIResponse>(["get-questions", roomId],[
                newQuestion,
                ...questionArray
            ])

            return { newQuestion, questions }
        },

        onSuccess(data, _variables, context) {
            queryClient.setQueryData<GetQuestionsAPIResponse>(
                ["get-questions", roomId],
                questions => {
                    if (!questions || !context.newQuestion) {
                        return questions
                    }

                    return questions.map(question => {
                        if (question.id === context.newQuestion.id) {
                            return { 
                                ...context.newQuestion, 
                                id: data.questionId, 
                                answer: data.answer,
                                isGeneratingAnswe: false,
                            }
                        }
                        
                        return question
                    })
                }
            )
        },

        onError(_error, _variables, context) {
            if (context?.questions) {
            queryClient.setQueryData<GetQuestionsAPIResponse>(["get-questions", roomId], context.questions)
            }
        },
        // onSuccess: () => {
        //     queryClient.invalidateQueries({ queryKey: ["get-questions", roomId]}) // atualiza todas as chamadas que tem esse identificador 
        // }
    })
}