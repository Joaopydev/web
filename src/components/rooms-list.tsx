import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import dayjs from "@/lib/dayjs"
import { Link } from "react-router-dom"
import { useRooms } from "@/http/utils/get-rooms-response"

export function RoomsList () {
    const { data, isLoading } = useRooms()
    return (
        <Card>
            <CardHeader>
                <CardTitle>Salas Recentes</CardTitle>
                <CardDescription>
                    Acesso rápido para as salas criadas recentemente
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
                {isLoading && (
                    <p className="text-muted-foreground text-sm">
                        Carregando salas...
                    </p>
                )}
                {data?.map((room) => {
                    return (
                        <Link 
                            className="flex justify-between p-3 rounded-lg border hover:bg-accent/50"
                            key={room.id}
                            to={`/room/${room.id}`}
                        >
                            <div className="flex flex-col flex-1 gap-1">
                                <h3 className="font-medium">
                                    {room.name}
                                </h3>
                                <div className="flex items-center gap-2">
                                    <Badge variant="secondary" className="text-xs"> 
                                        {dayjs(room.createdAt).toNow()}
                                    </Badge>
                                    <Badge variant="secondary" className="text-xs"> 
                                        {room.questionsCount} - pergunta(s)
                                    </Badge>
                                </div>
                            </div>
                            <span className="flex items-center gap-1 text-sm">
                                Entrar
                                <ArrowRight className="size-3"/>
                            </span>
                        </Link>
                    )
                })}
            </CardContent>
        </Card>
    )
}