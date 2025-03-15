
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

interface Model {
  id: string;
  name: string;
  type: string;
  description: string;
  supportsImages: boolean;
}

const models: Model[] = [
  { 
    id: 'deepseek-chat', 
    name: 'DeepSeek Chat', 
    type: 'chat', 
    description: 'Conversational AI with strong natural language capabilities',
    supportsImages: false
  },
  { 
    id: 'llama2', 
    name: 'Llama 2', 
    type: 'chat', 
    description: 'Open source large language model by Meta',
    supportsImages: false
  },
  { 
    id: 'mistral', 
    name: 'Mistral', 
    type: 'chat', 
    description: 'Efficient and powerful language model with strong reasoning',
    supportsImages: false
  },
  { 
    id: 'gemini', 
    name: 'Gemini', 
    type: 'chat', 
    description: 'Multimodal AI by Google with image analysis capabilities',
    supportsImages: true
  },
  { 
    id: 'gemma', 
    name: 'Gemma', 
    type: 'chat', 
    description: 'Lightweight language model by Google',
    supportsImages: false
  },
  { 
    id: 'deepseek-coder', 
    name: 'DeepSeek Coder', 
    type: 'code', 
    description: 'Specialized for code generation and technical tasks',
    supportsImages: false
  },
  { 
    id: 'codellama', 
    name: 'CodeLlama', 
    type: 'code', 
    description: 'Code-specialized version of Llama optimized for programming',
    supportsImages: false
  }
];

interface ModelSelectorProps {
  onSelect: (modelId: string) => void;
}

const ModelSelector = ({ onSelect }: ModelSelectorProps) => {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Choose an AI Model</h2>
      
      <Tabs defaultValue="chat">
        <TabsList className="grid grid-cols-2 mb-6">
          <TabsTrigger value="chat">Chat Models</TabsTrigger>
          <TabsTrigger value="code">Code Models</TabsTrigger>
        </TabsList>
        
        <TabsContent value="chat" className="mt-0">
          <ScrollArea className="h-[400px]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {models.filter(m => m.type === 'chat').map(model => (
                <Card key={model.id} className="cursor-pointer hover:border-wisdom-primary" onClick={() => onSelect(model.id)}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{model.name}</CardTitle>
                      {model.supportsImages && (
                        <Badge variant="outline" className="bg-wisdom-primary/10 text-wisdom-primary">
                          Image Support
                        </Badge>
                      )}
                    </div>
                    <CardDescription>{model.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
        
        <TabsContent value="code" className="mt-0">
          <ScrollArea className="h-[400px]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {models.filter(m => m.type === 'code').map(model => (
                <Card key={model.id} className="cursor-pointer hover:border-wisdom-primary" onClick={() => onSelect(model.id)}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{model.name}</CardTitle>
                    <CardDescription>{model.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ModelSelector;
