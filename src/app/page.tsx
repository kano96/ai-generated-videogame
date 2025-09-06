'use client';

import { useZombieGame } from "./hooks/use-zombie-game";
import GameLoader from "./componentes/GameLoader";
import GameMessage from "./componentes/GameMessage";
import GameInput from "./componentes/GameInput";
import { Conversation, ConversationContent, ConversationScrollButton } from "@/components/ai-elements/conversation";

export default function Home() {

  const { handleInputChange, handleSubmit, messages, isLoading, input } = useZombieGame();


  return (
    <div className="font-sans min-h-screen p-8 max-w-xl mx-auto">
      <div className="flex flex-col h-full">
        <Conversation>
          <ConversationContent className="max-w-xl mx-auto">
            {messages.map((msg) => (
              <GameMessage key={msg.id} message={msg} />
            ))}
            {isLoading && <GameLoader />}
          </ConversationContent>
          <ConversationScrollButton />
        </Conversation>

        <div className="max-w-2xl mx-auto pb-4">
          <GameInput
            input={input}
            onInputChange={handleInputChange}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </div>

      </div>
    </div>
  );
}
