import { PromptInput, PromptInputTextarea, PromptInputSubmit } from "@/components/ai-elements/prompt-input"
import { UI_MESSAGES } from "@/lib/constants"

interface GameInputProps {
    onSubmit: (e: React.FormEvent) => Promise<void>
    onInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
    input: string
    isLoading: boolean
}


const GameInput = ({ input, onInputChange, onSubmit, isLoading }: GameInputProps) => {
    return (
        <PromptInput onSubmit={onSubmit} className="relative pr-8 mt-4">
            <PromptInputTextarea placeholder={UI_MESSAGES.PLACEHOLDERS.INPUT} value={input} onChange={onInputChange} disabled={isLoading} />
            <PromptInputSubmit className="absolute bottom-2 right-2" disabled={isLoading || input.trim() === ""} />
        </PromptInput>
    )
}

export default GameInput