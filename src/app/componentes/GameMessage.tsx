import { Image } from '@/components/ai-elements/image'
import { Message, MessageContent } from '@/components/ai-elements/message'
import { type GameMessage as GameMessageType } from '@/lib/types'

const GameMessage = ({ message }: { message: GameMessageType }) => {
    const { content, image, role } = message;
    return (
        <Message from={role}>
            <MessageContent>{content}</MessageContent>
            {image && (
                <Image
                    base64={image.base64Data}
                    alt="Imagen generada"
                    className="w-full h-auto"
                    mediaType={image.mediaType}
                    uint8Array={new Uint8Array()}
                />
            )}
        </Message>
    )
}

export default GameMessage