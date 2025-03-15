
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Key, AlertCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface ApiKeyFormProps {
  onApiKeySet: (key: string) => void;
}

const ApiKeyForm = ({ onApiKeySet }: ApiKeyFormProps) => {
  const [apiKey, setApiKey] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  
  const handleSaveApiKey = () => {
    if (!apiKey.trim()) {
      toast({
        title: "Missing API Key",
        description: "Please enter your OpenRouter API key.",
        variant: "destructive"
      });
      return;
    }
    
    // In a real application, you would validate the API key here
    
    // Save to localStorage for demo purposes
    localStorage.setItem('openrouter_api_key', apiKey);
    onApiKeySet(apiKey);
    setIsOpen(false);
    
    toast({
      title: "API Key Saved",
      description: "Your OpenRouter API key has been saved.",
    });
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Key className="h-4 w-4" />
          Set API Key
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>OpenRouter API Key</DialogTitle>
          <DialogDescription>
            Enter your OpenRouter API key to enable chat and code generation.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="flex p-3 bg-amber-50 text-amber-800 rounded-md items-start gap-3">
            <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium">Important Note</p>
              <p>Your API key is stored locally on your device and is not sent to our servers.</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="api-key">API Key</Label>
            <Input 
              id="api-key" 
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="sk-or-..."
              type="password"
            />
            <p className="text-sm text-muted-foreground">
              Don't have an API key? <a href="https://openrouter.ai/" target="_blank" rel="noopener noreferrer" className="text-wisdom-primary hover:underline">Get one from OpenRouter</a>
            </p>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
          <Button onClick={handleSaveApiKey}>Save API Key</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ApiKeyForm;
