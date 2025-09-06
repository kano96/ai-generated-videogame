import { useState, useEffect } from "react";
import type { GameMessage, ConversationMessage } from "@/lib/types";

export function useZombieGame() {
    const [messages, setMessages] = useState<GameMessage[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [input, setInput] = useState("");

    useEffect(() => {
        startGame();
    }, []);

    const startGame = async () => {
        setIsLoading(true);

        try {
            const response = await fetch('/api/generate-story', {
                method: 'POST',
                body: JSON.stringify({
                    isStart: true
                })
            });

            if (!response.ok) {
                throw new Error("Failed to start game");
            }

            const data = await response.json();
            const messageId = crypto.randomUUID();
            const newMessage: GameMessage = {
                id: messageId,
                role: "assistant",
                content: data.narrative,
                imageLoading: true
            };

            setMessages([newMessage]);

            generateImage(data.imagePrompt, messageId);

        } catch (error) {
            console.error("Error starting game:", error);
        } finally {
            setIsLoading(false);
        }
    }

    const generateImage = async (imagePrompt: string, messageId: string) => {
        try {
            const response = await fetch('/api/generate-image', {
                method: 'POST',
                body: JSON.stringify({ imagePrompt })
            });

            if (!response.ok) {
                throw new Error("Failed to generate image");
            }

            const data = await response.json();
            setMessages(prevMessages => prevMessages.map(msg => 
                msg.id === messageId ? { ...msg, image: data.image, imageLoading: false } : msg));
        } catch (error) {
            setMessages(prevMessages => prevMessages.map(msg =>
                msg.id === messageId ? { ...msg, imageLoading: false } : msg));
            console.error("Error generating image:", error);
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage: GameMessage = {
            id: crypto.randomUUID(),
            role: "user",
            content: input.trim()
        };

        const updatedMessages = [...messages, userMessage];
        setMessages(updatedMessages);
        setInput("");
        setIsLoading(true);

        try {

            const response = await fetch('/api/generate-story', {
                method: 'POST',
                body: JSON.stringify({
                    userMessage: userMessage.content,
                    conversationHistory: messages,
                    isStart: false
                })
            });

            if (!response.ok) {
                throw new Error("Failed to generate story");
            }

            const data = await response.json();
            const messageId = crypto.randomUUID();
            const assistantMessage: GameMessage = {
                id: messageId,
                role: "assistant",
                content: data.narrative,
                imageLoading: true
            };

            setMessages(prevMessages => [...prevMessages, assistantMessage]);

            generateImage(data.imagePrompt, messageId);

        } catch (error) {
            console.error("Error generating story:", error);
        } finally {
            setIsLoading(false);
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    }

    return {
        messages,
        isLoading,
        input,
        setInput,
        handleSubmit,
        startGame,
        handleInputChange
    };
}