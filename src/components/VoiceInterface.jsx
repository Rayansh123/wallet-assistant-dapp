// src/components/VoiceInterface.jsx
import React, { useState, useEffect, useRef } from 'react';
import useWalletStore from '../store/walletStore';
import { processUserInput } from '../ai/agent';

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

export default function VoiceInterface() {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef(null);
  const addChatMessage = useWalletStore((state) => state.addChatMessage);

  useEffect(() => {
    if (!SpeechRecognition) {
      alert('Speech Recognition API not supported in this browser.');
      return;
    }
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = false;
    recognitionRef.current.lang = 'en-US';

    recognitionRef.current.onresult = (event) => {
      const speechToText = event.results[0][0].transcript;
      setTranscript(speechToText);
      addChatMessage({ sender: 'user', text: speechToText });
      processUserInput(speechToText).then((response) => {
        addChatMessage({ sender: 'agent', text: response.message || '' });
        speakText(response.message);
      });
      setListening(false);
    };

    recognitionRef.current.onend = () => {
      setListening(false);
    };

    recognitionRef.current.onerror = (event) => {
      console.error('Speech recognition error', event.error);
      setListening(false);
    };
  }, [addChatMessage]);

  const speakText = (text) => {
    if (!window.speechSynthesis) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
  };

  const toggleListening = () => {
    if (listening) {
      recognitionRef.current.stop();
      setListening(false);
    } else {
      setTranscript('');
      recognitionRef.current.start();
      setListening(true);
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow max-w-md mx-auto text-center">
      <button
        onClick={toggleListening}
        className={`px-6 py-3 rounded text-white ${
          listening ? 'bg-red-600' : 'bg-green-600'
        } hover:opacity-90`}
      >
        {listening ? 'Stop Listening' : 'Start Voice Command'}
      </button>
      <p className="mt-4 text-gray-700 italic">{transcript || 'Say something...'}</p>
    </div>
  );
}
