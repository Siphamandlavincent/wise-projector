
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { Download, Code, Copy, Check, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

type ProjectType = 'website' | 'mobile' | 'desktop';
type Framework = {
  id: string;
  name: string;
  type: ProjectType[];
};
type Feature = {
  id: string;
  name: string;
  description: string;
  compatibleWith: string[];
};

const frameworks: Framework[] = [
  { id: 'react', name: 'React', type: ['website'] },
  { id: 'vue', name: 'Vue.js', type: ['website'] },
  { id: 'angular', name: 'Angular', type: ['website'] },
  { id: 'svelte', name: 'Svelte', type: ['website'] },
  { id: 'next', name: 'Next.js', type: ['website'] },
  { id: 'flutter', name: 'Flutter', type: ['mobile'] },
  { id: 'react-native', name: 'React Native', type: ['mobile'] },
  { id: 'ionic', name: 'Ionic', type: ['mobile'] },
  { id: 'electron', name: 'Electron', type: ['desktop'] },
  { id: 'tauri', name: 'Tauri', type: ['desktop'] },
];

const features: Feature[] = [
  { id: 'auth', name: 'Authentication', description: 'User login and registration', compatibleWith: ['react', 'vue', 'angular', 'next', 'flutter', 'react-native', 'ionic', 'electron', 'tauri'] },
  { id: 'db', name: 'Database Integration', description: 'Connect to a database', compatibleWith: ['react', 'vue', 'angular', 'next', 'flutter', 'react-native', 'ionic', 'electron', 'tauri'] },
  { id: 'api', name: 'API Integration', description: 'Connect to external APIs', compatibleWith: ['react', 'vue', 'angular', 'next', 'flutter', 'react-native', 'ionic', 'electron', 'tauri'] },
  { id: 'theme', name: 'Theming System', description: 'Light and dark mode support', compatibleWith: ['react', 'vue', 'angular', 'next', 'flutter', 'react-native', 'ionic', 'electron', 'tauri'] },
  { id: 'pwa', name: 'PWA Support', description: 'Progressive Web App capabilities', compatibleWith: ['react', 'vue', 'angular', 'next'] },
  { id: 'offline', name: 'Offline Support', description: 'Work without internet connection', compatibleWith: ['react', 'vue', 'angular', 'next', 'flutter', 'react-native', 'ionic', 'electron', 'tauri'] },
  { id: 'i18n', name: 'Internationalization', description: 'Multi-language support', compatibleWith: ['react', 'vue', 'angular', 'next', 'flutter', 'react-native', 'ionic', 'electron', 'tauri'] },
  { id: 'analytics', name: 'Analytics', description: 'Track user behavior', compatibleWith: ['react', 'vue', 'angular', 'next', 'flutter', 'react-native', 'ionic'] },
  { id: 'notifications', name: 'Notifications', description: 'Push notifications', compatibleWith: ['react', 'vue', 'angular', 'next', 'flutter', 'react-native', 'ionic', 'electron', 'tauri'] },
  { id: 'payment', name: 'Payment Processing', description: 'Process payments', compatibleWith: ['react', 'vue', 'angular', 'next', 'flutter', 'react-native', 'ionic', 'electron', 'tauri'] },
];

const ProjectGenerator = () => {
  const [projectType, setProjectType] = useState<ProjectType>('website');
  const [selectedFramework, setSelectedFramework] = useState('');
  const [projectName, setProjectName] = useState('');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [generatedCode, setGeneratedCode] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isCopied, setIsCopied] = useState(false);
  const { toast } = useToast();
  
  const compatibleFrameworks = frameworks.filter(fw => fw.type.includes(projectType));
  const compatibleFeatures = features.filter(f => 
    !selectedFramework || f.compatibleWith.includes(selectedFramework)
  );
  
  const handleFeatureToggle = (featureId: string) => {
    setSelectedFeatures(prev => 
      prev.includes(featureId)
        ? prev.filter(id => id !== featureId)
        : [...prev, featureId]
    );
  };
  
  const generateProject = () => {
    if (!selectedFramework || !projectName.trim()) {
      toast({
        title: "Missing information",
        description: "Please select a framework and provide a project name.",
        variant: "destructive"
      });
      return;
    }
    
    setIsGenerating(true);
    setProgress(0);
    
    // Simulate generation progress
    const interval = setInterval(() => {
      setProgress(prev => {
        const next = prev + Math.random() * 10;
        return next >= 100 ? 100 : next;
      });
    }, 200);
    
    // Generate mock code after 2.5 seconds
    setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      
      const framework = frameworks.find(f => f.id === selectedFramework)?.name;
      const featuresText = selectedFeatures
        .map(fId => features.find(f => f.id === fId)?.name)
        .filter(Boolean)
        .join(', ');
      
      const codeTemplate = `// ${projectName} - Generated with UHLAKANIPHO AI
// Framework: ${framework}
// Features: ${featuresText || 'None'}

// This is a sample code template for demonstration.
// A real implementation would generate actual project code based on the selected options.

import { createApp } from '${framework?.toLowerCase()}';
import App from './App';

${selectedFeatures.includes('auth') ? `
// Authentication Setup
import Auth from './auth';
const authPlugin = new Auth({
  // Auth configuration
});
` : ''}

${selectedFeatures.includes('db') ? `
// Database Integration
import Database from './database';
const db = new Database({
  // DB configuration
});
` : ''}

${selectedFeatures.includes('theme') ? `
// Theming System
import ThemeManager from './theme';
const themeManager = new ThemeManager();
` : ''}

const app = createApp(App);

${selectedFeatures.map(f => `// Initialize ${features.find(feat => feat.id === f)?.name} feature`).join('\n')}

app.mount('#app');
`;
      
      setGeneratedCode(codeTemplate);
      setIsGenerating(false);
    }, 2500);
  };
  
  const copyCode = () => {
    navigator.clipboard.writeText(generatedCode);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
    
    toast({
      title: "Code copied",
      description: "The generated code has been copied to your clipboard.",
    });
  };
  
  const downloadCode = () => {
    const blob = new Blob([generatedCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${projectName.replace(/\s+/g, '-').toLowerCase()}.js`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Code downloaded",
      description: "The generated code has been downloaded.",
    });
  };
  
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Project Code Generator</h2>
      
      <Tabs defaultValue="website" onValueChange={(value) => setProjectType(value as ProjectType)}>
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="website">Website</TabsTrigger>
          <TabsTrigger value="mobile">Mobile App</TabsTrigger>
          <TabsTrigger value="desktop">Desktop App</TabsTrigger>
        </TabsList>
        
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Project Configuration</CardTitle>
              <CardDescription>
                Configure your project settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="project-name">Project Name</Label>
                <Input 
                  id="project-name" 
                  placeholder="Enter project name" 
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="framework">Framework</Label>
                <Select value={selectedFramework} onValueChange={setSelectedFramework}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select framework" />
                  </SelectTrigger>
                  <SelectContent>
                    {compatibleFrameworks.map(framework => (
                      <SelectItem key={framework.id} value={framework.id}>
                        {framework.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Features</Label>
                <ScrollArea className="h-[200px] border rounded-md p-4">
                  <div className="space-y-2">
                    {compatibleFeatures.map(feature => (
                      <div key={feature.id} className="flex items-start space-x-2">
                        <Checkbox 
                          id={feature.id} 
                          checked={selectedFeatures.includes(feature.id)}
                          onCheckedChange={() => handleFeatureToggle(feature.id)}
                        />
                        <div className="grid gap-1.5 leading-none">
                          <label
                            htmlFor={feature.id}
                            className="text-sm font-medium leading-none cursor-pointer"
                          >
                            {feature.name}
                          </label>
                          <p className="text-sm text-muted-foreground">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={generateProject} 
                disabled={isGenerating || !selectedFramework || !projectName.trim()}
                className="w-full bg-wisdom-primary hover:bg-wisdom-primary/90"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Code className="mr-2 h-4 w-4" />
                    Generate Project
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Generated Code</CardTitle>
              <CardDescription>
                Preview and download your project
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isGenerating ? (
                <div className="space-y-4">
                  <p className="text-center text-sm text-muted-foreground">
                    Generating your project...
                  </p>
                  <Progress value={progress} className="h-2" />
                </div>
              ) : generatedCode ? (
                <pre className="bg-muted p-4 rounded-md text-sm overflow-auto h-[300px]">
                  <code>{generatedCode}</code>
                </pre>
              ) : (
                <div className="flex flex-col items-center justify-center h-[300px] text-center space-y-2">
                  <Code className="h-8 w-8 text-muted-foreground" />
                  <p className="text-muted-foreground">
                    Configure your project and click "Generate Project" to see the code here
                  </p>
                </div>
              )}
            </CardContent>
            {generatedCode && (
              <CardFooter className="flex justify-between gap-2">
                <Button variant="outline" onClick={copyCode} className="flex-1">
                  {isCopied ? (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="mr-2 h-4 w-4" />
                      Copy Code
                    </>
                  )}
                </Button>
                <Button 
                  onClick={downloadCode}
                  className="flex-1 bg-wisdom-secondary hover:bg-wisdom-secondary/90"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </CardFooter>
            )}
          </Card>
        </div>
      </Tabs>
    </div>
  );
};

export default ProjectGenerator;
