
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Check, ChevronsUpDown, Sparkles, Code, MessageSquare, Terminal, Laptop, Bot } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface Model {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  supportsImages?: boolean;
}

const models: Model[] = [
  {
    id: "gemini",
    name: "Gemini",
    description: "Google's most capable multimodal model.",
    icon: <Sparkles className="h-5 w-5" />,
    supportsImages: true
  },
  {
    id: "llama2",
    name: "Llama 2",
    description: "Meta's powerful open-source language model.",
    icon: <MessageSquare className="h-5 w-5" />,
    supportsImages: false
  },
  {
    id: "mistral",
    name: "Mistral",
    description: "Fast and efficient language model.",
    icon: <Bot className="h-5 w-5" />,
    supportsImages: false
  },
  {
    id: "gemma",
    name: "Gemma",
    description: "Google's lightweight and efficient model.",
    icon: <Terminal className="h-5 w-5" />,
    supportsImages: false
  },
  {
    id: "deepseek",
    name: "DeepSeek Chat",
    description: "Advanced conversation model.",
    icon: <MessageSquare className="h-5 w-5" />,
    supportsImages: false
  },
  {
    id: "deepseek-coder",
    name: "DeepSeek Coder",
    description: "Specialized in code generation and analysis.",
    icon: <Code className="h-5 w-5" />,
    supportsImages: false
  },
  {
    id: "codellama",
    name: "CodeLlama",
    description: "Meta's code-specialized language model.",
    icon: <Laptop className="h-5 w-5" />,
    supportsImages: false
  },
];

interface ModelSelectorProps {
  onSelect: (modelId: string) => void;
  selectedModel: string;
}

const ModelSelector: React.FC<ModelSelectorProps> = ({ onSelect, selectedModel }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(selectedModel);
  const selectedModelData = models.find((model) => model.id === value);

  return (
    <Tabs defaultValue="models" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="models">Models</TabsTrigger>
        <TabsTrigger value="settings" disabled>Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="models" className="space-y-4">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between"
            >
              {value
                ? models.find((model) => model.id === value)?.name
                : "Select model..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[400px] p-0">
            <Command>
              <CommandInput placeholder="Search model..." />
              <CommandEmpty>No model found.</CommandEmpty>
              <CommandGroup>
                {models.map((model) => (
                  <CommandItem
                    key={model.id}
                    value={model.name}
                    onSelect={() => {
                      onSelect(model.id);
                      setValue(model.id);
                      setOpen(false);
                    }}
                  >
                    <div className="flex items-center gap-2 mr-2">
                      {model.icon}
                      <div>
                        <p>{model.name}</p>
                        <p className="text-xs text-muted-foreground">{model.description}</p>
                      </div>
                    </div>
                    {model.supportsImages && (
                      <span className="text-xs bg-wisdom-primary/20 text-wisdom-dark px-2 py-0.5 rounded-full ml-auto mr-2">
                        Images
                      </span>
                    )}
                    <Check
                      className={cn(
                        "ml-auto h-4 w-4",
                        value === model.id ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>

        {selectedModelData && (
          <div className="text-sm">
            <p className="font-medium flex items-center gap-2">
              {selectedModelData.icon} {selectedModelData.name}
            </p>
            <p className="text-muted-foreground mt-1">{selectedModelData.description}</p>
            {selectedModelData.supportsImages && (
              <p className="text-xs mt-2 bg-wisdom-primary/20 text-wisdom-dark px-2 py-1 rounded-full inline-block">
                Supports image analysis
              </p>
            )}
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
};

export default ModelSelector;
