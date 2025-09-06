'use client';

import { useEffect } from "react";

export default function Home() {

  useEffect(() => {
    fetch('/api/generate-story', {
      method: 'POST',
      body: JSON.stringify({
        userMessage: "Look around",
        conversationHistory: [],
        isStart: true
      })
    })
      .then(res => res.json())
      .then(data => {
        fetch('/api/generate-image', {
          method: 'POST',
          body: JSON.stringify({
            imagePrompt: data.imagePrompt
          })
        })
          .then(res => res.json())
          .then(imageData => {
            console.log("Story data:", data);
            console.log("Image data:", imageData);
          }
          );
      });
  }, [])


  return (
    <div className="font-sans min-h-screen p-8">
      Zombie apocalypse game
    </div>
  );
}
