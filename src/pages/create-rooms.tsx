import { Link } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"

type GetRoomsAPIResponse = Array<{
    id: string,
    name: string,
}>

export function CreateRoom() {
    const { data, isLoading } = useQuery({
        queryKey: ['get-rooms'],
        queryFn: async () => {
            const response = await fetch("http://localhost:3333/rooms")
            const dataQuery: GetRoomsAPIResponse = await response.json()

            return dataQuery
        }
    })
    return (
        <div>
            <div>
                Create Room
            </div>

            {isLoading && <p>Carregando...</p>}
            <div className="flex flex-col gap-1">
                {data?.map((room) => {
                    return (
                        <Link key={room.id} to={`/room/${room.id}`}>
                            {room.name}
                        </Link>
                    )
                })}
            </div>

            <Link to={"/room"}>
                Link
            </Link>
        </div>
    )
}