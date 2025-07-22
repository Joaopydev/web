import { RoomsList } from "@/components/rooms-list"
import { CreateRoomForm } from "@/components/create-rooms-form"

export function CreateRoom() {
    return (
        <div className="min-h-screen py-8 px-4">
            <div className="mx-auto max-w-4xl">
                <div className="grid gap-8 grid-cols-2 items-start">
                    <CreateRoomForm />

                    <RoomsList />
                </div>
            </div>
        </div>
    )
}