import { QuestionItem } from "./question-item"
import { useQuestionsRoom } from "@/http/utils/get-questions-room"

interface QuestionsProps {
    roomId: string
}

export function QuestionsList (props: QuestionsProps) {
    const { data } = useQuestionsRoom(props.roomId)
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
            <h2 className="font-semibold text-2xl text-foreground">
                Perguntas & Respostas
            </h2>
            </div>
            {data?.map(question => {
                return (
                    <QuestionItem
                        key={question.id}
                        question={question}
                    />
                )
            })}
        </div>
    )
}