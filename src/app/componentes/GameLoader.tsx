import { Message, MessageContent } from '@/components/ai-elements/message'
import { Loader } from '@/components/ai-elements/loader';

const GameLoader = () => {
    return (
        <Message from='assistant'>
            <MessageContent>
                <div className='flex items-center gap-2'>
                    <Loader />
                    Cargando historia...
                </div>

            </MessageContent>
        </Message>
    )
}

export default GameLoader;