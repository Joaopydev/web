import { useQuery } from "@tanstack/react-query"
import { type GetQuestionsAPIResponse } from "../types/GetQuestionsAPIResponse"

export function useQuestionsRoom(roomId: string) {
    return useQuery({
        //unique identifier to http call
        queryKey: ['get-questions', roomId],
        //function to executed to call API
        queryFn: async () => {
            const response = await fetch(`http://localhost:3333/rooms/${roomId}/questions`)
            const dataQuery: GetQuestionsAPIResponse = await response.json()

            return dataQuery
        }
    })
}