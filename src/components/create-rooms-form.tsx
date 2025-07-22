import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { useForm } from "react-hook-form"
import { z } from "zod/v4"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Button } from "./ui/button"
import { useCreateRooms } from "@/http/utils/create-rooms-request"


// Validation form
const createFormSchema = z.object({
    name: z.string().min(1, { message: "Inclua no minímo 3 caracteres ou mais." }),
    description: z.string(),
})

//transform the js object in typesript object
type CreateRoomFormData = z.infer<typeof createFormSchema>

export function CreateRoomForm () {
    const { mutateAsync: createRoom } = useCreateRooms()

    const createRoomForm = useForm<CreateRoomFormData>({
        // Validações do formulário virão de zod
        resolver: zodResolver(createFormSchema),
        defaultValues: {
            name: "",
            description: "",
        }
    })

    async function handleCreateRoom({ name, description }: CreateRoomFormData) {
        await createRoom({ name, description })
        createRoomForm.reset()
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    Criar sala
                </CardTitle>
                <CardDescription>
                    Crie uma nova sala para começar a fazer perguntas e receber respostas da I.A
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...createRoomForm}>
                    <form onSubmit={createRoomForm.handleSubmit(handleCreateRoom)} className="flex flex-col gap-4">
                        <FormField
                          control={createRoomForm.control}
                          name="name"
                          render={({ field }) => {
                            return (
                                <FormItem>
                                    <FormLabel>
                                        Nome da sala
                                    </FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="Digite o nome da sala" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )
                          }}
                        />
                        <FormField
                          control={createRoomForm.control}
                          name="description"
                          render={({ field }) => {
                            return (
                                <FormItem>
                                    <FormLabel>
                                        Descrição
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )
                          }}
                        />
                        <Button type="submit" className="w-full">Criar Sala</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}