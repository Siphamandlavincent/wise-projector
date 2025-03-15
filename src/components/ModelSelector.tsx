import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Check, ChevronsUpDown, Search, Sparkles, Code, MessageSquare } from "lucide-react";
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
}

const models: Model[] = [
  {
    id: "gemini",
    name: "Gemini",
    description: "The most capable Gemini model.",
    icon: <Sparkles className="h-5 w-5" />,
  },
  {
    id: "llama2",
    name: "Llama 2",
    description: "A powerful open-source language model.",
    icon: <MessageSquare className="h-5 w-5" />,
  },
  {
    id: "deepseek-coder",
    name: "DeepSeek Coder",
    description: "An AI coding assistant.",
    icon: <Code className="h-5 w-5" />,
  },
];

interface ModelSelectorProps {
  onSelect: (modelId: string) => void;
  selectedModel: string;
}

const ModelSelector: React.FC<ModelSelectorProps> = ({ onSelect, selectedModel }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(selectedModel);

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
                    {model.icon}
                    <span>{model.name}</span>
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
      </TabsContent>
    </Tabs>
  );
};

export default ModelSelector;
