
import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, ImagePlus, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

type MessageType = {
  sender: 'user' | 'ai';
  content: string;
  timestamp: Date;
  images?: string[];
};

const models = [
  { id: 'deepseek', name: 'DeepSeek Chat', supportsImages: false },
  { id: 'llama2', name: 'Llama 2', supportsImages: false },
  { id: 'mistral', name: 'Mistral', supportsImages: false },
  { id: 'gemini', name: 'Gemini', supportsImages: true },
  { id: 'gemma', name: 'Gemma', supportsImages: false },
  { id: 'deepseek-coder', name: 'DeepSeek Coder', supportsImages: false },
  { id: 'codellama', name: 'CodeLlama', supportsImages: false },
];

const ChatInterface = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [selectedModel, setSelectedModel] = useState('gemini');
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  
  const supportsImages = models.find(model => model.id === selectedModel)?.supportsImages || false;
  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY || localStorage.getItem('openrouter_api_key');
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSendMessage = () => {
    if (inputMessage.trim() === '' && selectedImages.length === 0) return;
    
    // Convert images to data URLs (simulating image upload)
    const imagePromises = selectedImages.map(file => {
      return new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = e => resolve(e.target?.result as string);
        reader.readAsDataURL(file);
      });
    });
    
    Promise.all(imagePromises).then(imageUrls => {
      // Add user message
      const userMessage: MessageType = {
        sender: 'user',
        content: inputMessage,
        timestamp: new Date(),
        images: imageUrls.length > 0 ? imageUrls : undefined
      };
      
      setMessages(prev => [...prev, userMessage]);
      setInputMessage('');
      setSelectedImages([]);
      setIsLoading(true);
      
      // Simulate AI response after a delay
      setTimeout(() => {
        const aiMessage: MessageType = {
          sender: 'ai',
          content: generateAIResponse(inputMessage, selectedModel),
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, aiMessage]);
        setIsLoading(false);
      }, 1500);
    });
  };
  
  const generateAIResponse = (message: string, model: string): string => {
    // This is a mock function - in a real app, this would call the OpenRouter API
    const responses = [
      "I've analyzed your question and here's what I found...",
      "Based on my knowledge, I can tell you that...",
      "That's an interesting query. Let me explain...",
      "Here's what you need to know about that topic:",
      "I can help you understand this concept better."
    ];
    
    return `${responses[Math.floor(Math.random() * responses.length)]} This is a simulated response from the ${models.find(m => m.id === model)?.name} model. In a real implementation, this would be powered by the OpenRouter API with actual AI responses.`;
  };
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    
    if (!supportsImages) {
      toast({
        title: "Image upload not supported",
        description: `The selected model doesn't support image analysis.`,
        variant: "destructive"
      });
      return;
    }
    
    const newImages = Array.from(files);
    setSelectedImages(prev => [...prev, ...newImages]);
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] max-w-4xl mx-auto">
      <div className="p-4 border-b">
        <Select value={selectedModel} onValueChange={setSelectedModel}>
          <SelectTrigger className="w-full md:w-[250px]">
            <SelectValue placeholder="Select AI Model" />
          </SelectTrigger>
          <SelectContent>
            {models.map(model => (
              <SelectItem key={model.id} value={model.id}>
                {model.name} {model.supportsImages && "(Image Support)"}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center space-y-2">
              <h3 className="text-xl font-semibold text-wisdom-dark">Welcome to UHLAKANIPHO</h3>
              <p className="text-muted-foreground max-w-md">
                Select an AI model and start chatting to get wisdom and insights, or generate project code.
              </p>
            </div>
          </div>
        ) : (
          messages.map((message, index) => (
            <div key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <Card className={`max-w-[80%] ${message.sender === 'user' ? 'bg-wisdom-primary text-white' : 'bg-muted'}`}>
                <CardContent className="p-4">
                  {message.sender === 'ai' && (
                    <div className="flex items-center gap-2 mb-2">
                      <Avatar className="h-6 w-6 bg-wisdom-accent">
                        <AvatarFallback>AI</AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">
                        {models.find(model => model.id === selectedModel)?.name || 'AI Assistant'}
                      </span>
                    </div>
                  )}
                  
                  {message.images && message.images.length > 0 && (
                    <div className="grid grid-cols-2 gap-2 mb-2">
                      {message.images.map((img, imgIndex) => (
                        <img 
                          key={imgIndex} 
                          src={img} 
                          alt={`Uploaded ${imgIndex}`} 
                          className="rounded-md max-h-40 object-cover"
                        />
                      ))}
                    </div>
                  )}
                  
                  <p className="whitespace-pre-wrap">{message.content}</p>
                  <div className="text-xs opacity-70 mt-1 text-right">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))
        )}
        {isLoading && (
          <div className="flex justify-start">
            <Card className="max-w-[80%] bg-muted">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <p className="text-sm">Generating response...</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      {selectedImages.length > 0 && (
        <div className="px-4 py-2 border-t flex gap-2 overflow-x-auto">
          {selectedImages.map((file, index) => (
            <div key={index} className="relative">
              <img 
                src={URL.createObjectURL(file)} 
                alt={`Preview ${index}`} 
                className="h-16 w-16 object-cover rounded-md border"
              />
              <button 
                className="absolute -top-2 -right-2 bg-destructive text-white rounded-full h-5 w-5 flex items-center justify-center text-xs"
                onClick={() => removeImage(index)}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
      
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="resize-none min-h-[80px]"
          />
          <div className="flex flex-col gap-2">
            <Button
              type="button"
              size="icon"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              disabled={!supportsImages}
              title={supportsImages ? "Upload image" : "Current model doesn't support images"}
            >
              <ImagePlus className="h-5 w-5" />
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                ref={fileInputRef}
                onChange={handleImageUpload}
              />
            </Button>
            <Button
              type="button"
              size="icon"
              onClick={handleSendMessage}
              disabled={inputMessage.trim() === '' && selectedImages.length === 0}
              className="bg-wisdom-primary hover:bg-wisdom-primary/90"
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
