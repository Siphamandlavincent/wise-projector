
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
      
      // Generate appropriate code template based on framework
      let codeTemplate = '';
      const primaryColor = import.meta.env.VITE_PRIMARY_COLOR || '#FFE900';
      const darkColor = import.meta.env.VITE_DARK_COLOR || '#332421';
      
      switch(selectedFramework) {
        case 'react':
          codeTemplate = `// ${projectName} - Generated with ${import.meta.env.VITE_SITE_NAME || 'UHLAKANIPHO'} AI
// Framework: ${framework}
// Features: ${featuresText || 'None'}

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
${selectedFeatures.includes('theme') ? "import { ThemeProvider } from './theme';" : ''}
${selectedFeatures.includes('auth') ? "import { AuthProvider } from './auth';" : ''}
${selectedFeatures.includes('db') ? "import { DatabaseProvider } from './database';" : ''}

// Primary color: ${primaryColor}
// Dark color: ${darkColor}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    ${selectedFeatures.includes('theme') ? '<ThemeProvider>' : ''}
    ${selectedFeatures.includes('auth') ? '<AuthProvider>' : ''}
    ${selectedFeatures.includes('db') ? '<DatabaseProvider>' : ''}
    <App />
    ${selectedFeatures.includes('db') ? '</DatabaseProvider>' : ''}
    ${selectedFeatures.includes('auth') ? '</AuthProvider>' : ''}
    ${selectedFeatures.includes('theme') ? '</ThemeProvider>' : ''}
  </React.StrictMode>
);`;
          break;
        case 'vue':
          codeTemplate = `// ${projectName} - Generated with ${import.meta.env.VITE_SITE_NAME || 'UHLAKANIPHO'} AI
// Framework: ${framework}
// Features: ${featuresText || 'None'}

import { createApp } from 'vue';
import App from './App.vue';
${selectedFeatures.includes('theme') ? "import { createTheme } from './theme';" : ''}
${selectedFeatures.includes('auth') ? "import { createAuth } from './auth';" : ''}
${selectedFeatures.includes('db') ? "import { createDatabase } from './database';" : ''}

// Primary color: ${primaryColor}
// Dark color: ${darkColor}

const app = createApp(App);

${selectedFeatures.includes('theme') ? 'app.use(createTheme());' : ''}
${selectedFeatures.includes('auth') ? 'app.use(createAuth());' : ''}
${selectedFeatures.includes('db') ? 'app.use(createDatabase());' : ''}

app.mount('#app');`;
          break;
        case 'next':
          codeTemplate = `// ${projectName} - Generated with ${import.meta.env.VITE_SITE_NAME || 'UHLAKANIPHO'} AI
// Framework: ${framework}
// Features: ${featuresText || 'None'}

// pages/_app.js
import '../styles/globals.css';
${selectedFeatures.includes('theme') ? "import { ThemeProvider } from '../theme';" : ''}
${selectedFeatures.includes('auth') ? "import { AuthProvider } from '../auth';" : ''}
${selectedFeatures.includes('db') ? "import { DatabaseProvider } from '../database';" : ''}

// Primary color: ${primaryColor}
// Dark color: ${darkColor}

function MyApp({ Component, pageProps }) {
  return (
    ${selectedFeatures.includes('theme') ? '<ThemeProvider>' : ''}
    ${selectedFeatures.includes('auth') ? '<AuthProvider>' : ''}
    ${selectedFeatures.includes('db') ? '<DatabaseProvider>' : ''}
    <Component {...pageProps} />
    ${selectedFeatures.includes('db') ? '</DatabaseProvider>' : ''}
    ${selectedFeatures.includes('auth') ? '</AuthProvider>' : ''}
    ${selectedFeatures.includes('theme') ? '</ThemeProvider>' : ''}
  )
}

export default MyApp;`;
          break;
        case 'flutter':
          codeTemplate = `// ${projectName} - Generated with ${import.meta.env.VITE_SITE_NAME || 'UHLAKANIPHO'} AI
// Framework: ${framework}
// Features: ${featuresText || 'None'}

import 'package:flutter/material.dart';

// Primary color: ${primaryColor}
// Dark color: ${darkColor}

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: '${projectName}',
      theme: ThemeData(
        primaryColor: Color(0x${primaryColor.replace('#', 'FF')}),
        scaffoldBackgroundColor: Colors.white,
        useMaterial3: true,
      ),
      darkTheme: ${selectedFeatures.includes('theme') ? `ThemeData(
        primaryColor: Color(0x${primaryColor.replace('#', 'FF')}),
        scaffoldBackgroundColor: Color(0x${darkColor.replace('#', 'FF')}),
        useMaterial3: true,
      )` : 'null'},
      themeMode: ${selectedFeatures.includes('theme') ? 'ThemeMode.system' : 'ThemeMode.light'},
      home: const MyHomePage(title: '${projectName} Home Page'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({Key? key, required this.title}) : super(key: key);

  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
        backgroundColor: Theme.of(context).primaryColor,
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            const Text(
              'Welcome to your new Flutter app!',
            ),
          ],
        ),
      ),
    );
  }
}`;
          break;
        case 'react-native':
          codeTemplate = `// ${projectName} - Generated with ${import.meta.env.VITE_SITE_NAME || 'UHLAKANIPHO'} AI
// Framework: ${framework}
// Features: ${featuresText || 'None'}

import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

// Primary color: ${primaryColor}
// Dark color: ${darkColor}

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>${projectName}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.welcomeText}>Welcome to your new React Native app!</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: '${primaryColor}',
    padding: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '${darkColor}',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  welcomeText: {
    fontSize: 18,
    textAlign: 'center',
  },
});

export default App;`;
          break;
        case 'electron':
          codeTemplate = `// ${projectName} - Generated with ${import.meta.env.VITE_SITE_NAME || 'UHLAKANIPHO'} AI
// Framework: ${framework}
// Features: ${featuresText || 'None'}

// main.js
const { app, BrowserWindow } = require('electron')
const path = require('path')

// Primary color: ${primaryColor}
// Dark color: ${darkColor}

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  })

  // Load index.html
  mainWindow.loadFile('index.html')
  
  ${selectedFeatures.includes('db') ? "// Database setup\nconst db = require('./database.js');" : ''}
  ${selectedFeatures.includes('auth') ? "// Auth setup\nconst auth = require('./auth.js');" : ''}
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// preload.js
// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(\`\${type}-version\`, process.versions[type])
  }
})`;
          break;
        default:
          codeTemplate = `// ${projectName} - Generated with ${import.meta.env.VITE_SITE_NAME || 'UHLAKANIPHO'} AI
// Framework: ${framework}
// Features: ${featuresText || 'None'}

// This is a sample code template for demonstration purposes
// A real implementation would generate actual ${framework} project code

// Primary color: ${primaryColor}
// Dark color: ${darkColor}

${selectedFeatures.map(f => `// ${features.find(feat => feat.id === f)?.name} feature integration`).join('\n')}

// Main application entry point
function initializeApp() {
  console.log("Initializing ${projectName} with ${framework}");
  ${selectedFeatures.map(f => `setupFeature${features.find(feat => feat.id === f)?.name.replace(/\s/g, '')}`).join(';\n  ')};
}

initializeApp();`;
      }
      
      setGeneratedCode(codeTemplate);
      setIsGenerating(false);
      
      toast({
        title: "Project generated",
        description: `Successfully generated ${projectName} with ${framework}.`,
      });
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
    
    // Set appropriate file extension based on framework
    let fileExtension = 'js';
    if (selectedFramework === 'vue') fileExtension = 'vue';
    else if (selectedFramework === 'flutter') fileExtension = 'dart';
    else if (selectedFramework === 'react-native') fileExtension = 'jsx';
    else if (selectedFramework === 'next') fileExtension = 'jsx';
    else if (selectedFramework === 'react') fileExtension = 'jsx';
    
    a.download = `${projectName.replace(/\s+/g, '-').toLowerCase()}.${fileExtension}`;
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
                  <SelectTrigger id="framework" className="w-full">
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
                className="w-full bg-wisdom-primary hover:bg-wisdom-primary/90 text-wisdom-dark font-medium"
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
                  className="flex-1 bg-wisdom-primary hover:bg-wisdom-primary/90 text-wisdom-dark font-medium"
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
