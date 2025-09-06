export interface GameMessage {
    id: string;
    role: "user" | "assistant"
    content: string;
    image?: string;
    imageLoading?: string;
    }

export interface GeneratedImage {
    base64Data: string;
    mediaType: string;
    uint8Array?: Uint8Array;
}

export interface ConversationMessage {
    role: "user" | "assistant";
    content: string;
}

export interface GenerateStoryResponse {
    narrative: string;
    imagePrompt: GeneratedImage;
}

export interface GenerateStoryRequest {
    userMessage: string;
    conversationHistory: ConversationMessage[];
    isStart: boolean;
}

export interface GenerateImageRequest {
    imagePrompt: string;
}