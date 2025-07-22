import { useMutation } from "@tanstack/react-query"
import { type CreateRoomRequest } from "../types/CreateRoomRequest"
import { useQueryClient } from "@tanstack/react-query"

export function useCreateRooms () {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (data: CreateRoomRequest) => {
            const response = await fetch("http://localhost:3333/rooms", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })

            const result: CreateRoomRequest = await response.json()

            return result
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["get-rooms"]}) // atualiza todas as chamadas que tem esse identificador 
        }
    })
}