
import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ChatInterface from '@/components/ChatInterface';
import ProjectGenerator from '@/components/ProjectGenerator';
import ApiKeyForm from '@/components/ApiKeyForm';
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { Brain, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const Index = () => {
  const [activeTab, setActiveTab] = useState("chat");
  const [apiKey, setApiKey] = useState<string | null>(null);
  
  // Check for stored API key on mount
  useEffect(() => {
    const storedKey = localStorage.getItem('openrouter_api_key');
    if (storedKey) {
      setApiKey(storedKey);
    }
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="container py-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-2">
                <Brain className="h-8 w-8 text-wisdom-primary" />
                UHLAKANIPHO 
                <Badge variant="outline" className="text-xs font-normal ml-2">Beta</Badge>
              </h1>
              <p className="text-muted-foreground mt-2">
                AI-powered wisdom and project generation assistant
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <ApiKeyForm onApiKeySet={setApiKey} />
            </div>
          </div>
          
          {!apiKey && (
            <Alert className="mb-6 border-wisdom-primary/50">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>API Key Required</AlertTitle>
              <AlertDescription>
                To use UHLAKANIPHO's features, please set your OpenRouter API key. 
                For demonstration purposes, you can continue exploring the interface without an active API key.
              </AlertDescription>
            </Alert>
          )}
          
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="chat" className="data-[state=active]:bg-wisdom-primary data-[state=active]:text-wisdom-dark">AI Chat</TabsTrigger>
              <TabsTrigger value="generate" className="data-[state=active]:bg-wisdom-primary data-[state=active]:text-wisdom-dark">Project Generation</TabsTrigger>
            </TabsList>
            
            <TabsContent value="chat" className="mt-0">
              <ChatInterface />
            </TabsContent>
            
            <TabsContent value="generate" className="mt-0">
              <ProjectGenerator />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
