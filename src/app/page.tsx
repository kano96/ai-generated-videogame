'use client';

import { useZombieGame } from "./hooks/use-zombie-game";
import GameLoader from "./componentes/GameLoader";
import GameMessage from "./componentes/GameMessage";

export default function Home() {

  const { handleInputChange, handleSubmit, messages, isLoading, input } = useZombieGame();


  return (
    <div className="font-sans min-h-screen p-8 max-w-xl mx-auto">
      {isLoading && <GameLoader />}
      {messages.map((msg, index) => (
        <GameMessage key={index} message={msg} />
      ))}
    </div>
  );
}
