import { useQuery } from "@tanstack/react-query"
import { type GetRoomsAPIResponse } from "../types/GetRoomsAPIResponse"

export function useRooms () {
    return useQuery({
        //unique identifier to http call
        queryKey: ['get-rooms'],
        //function to executed to call API
        queryFn: async () => {
            const response = await fetch("http://localhost:3333/rooms")
            const dataQuery: GetRoomsAPIResponse = await response.json()

            return dataQuery
        }
    })
}