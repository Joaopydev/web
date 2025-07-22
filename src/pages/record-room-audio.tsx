import { Button } from "@/components/ui/button";
import { useState, useRef } from "react";
import { Navigate, useParams } from 'react-router-dom'

const isRecordingSupported = 
    !!navigator.mediaDevices && 
    typeof navigator.mediaDevices.getUserMedia === "function" &&
    typeof window.MediaRecorder === "function"

type RoomParams = {
  roomId: string
}

export function RecordRoomAudio () {
    const params = useParams<RoomParams>()
    const [ isRecording, setIsRecording ] = useState(false)
    const recorder = useRef<MediaRecorder | null>(null)
    const mediaStream = useRef<MediaStream | null>(null)
    const intervalRef = useRef<NodeJS.Timeout>(null)

    function stopRecording () {
        setIsRecording(false)

        if (recorder.current && recorder.current.state !== "inactive") {
            recorder.current.stop()
        }

        mediaStream.current?.getTracks().forEach(track => track.stop())

        if (intervalRef.current) {
            clearInterval(intervalRef.current)
        }
    }

    function createRecorder (audio: MediaStream) {
        recorder.current = new MediaRecorder(audio, {
            mimeType: "audio/webm",
            audioBitsPerSecond: 64_000,
        })

        recorder.current.ondataavailable = event => {
            if (event.data.size > 0) {
                uploadAudio(event.data)
            }
        }

        recorder.current.onstart = () => {
            console.log("Gravação iniciada")
        }

        recorder.current.onstop = () => {
            console.log("Gravação encerrada")
        }

        recorder.current.start( )
    }

    async function uploadAudio (audio: Blob) {
        const formData = new FormData()

        formData.append("file", audio, "audio.webm")

        await fetch(`http://localhost:3333/rooms/${params.roomId}/audio`, {
            method: "POST",
            body: formData,
        })
    }

    async function startRecording () {
        if (!isRecordingSupported) {
            alert("Seu navegador não tem suporte a gravação de áudio.")
            return 
        }
        setIsRecording(true)

        const audio = await navigator.mediaDevices.getUserMedia({
            audio: {
                echoCancellation: true,
                noiseSuppression: true,
                sampleRate: 44_100,

            }
        })

        mediaStream.current = audio

        createRecorder(audio)

        intervalRef.current = setInterval(() => {
            recorder.current?.stop()
            
            createRecorder(audio)
        }, 5000)
    }

    if (!params.roomId) {
        return <Navigate replace to="/" />
    }
    return (
        
        <div className="flex h-screen flex-col items-center justify-center gap-3">
            {isRecording ? (
            <Button className="w-5xl" onClick={stopRecording}>
                Parar gravação
            </Button>
            ) : (
            <Button className="w-5xl" onClick={startRecording}>
                Gravar áudio
            </Button>
            )}
            {isRecording && <p>Gravando...</p>}
        </div>
    )
}