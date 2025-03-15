
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Github, Twitter, Globe } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-wisdom-dark text-white py-8">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold">UHLAKANIPHO</h3>
            <p className="text-sm text-gray-300">
              An AI-powered application that combines chat capabilities with project generation features.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="text-white hover:text-wisdom-primary">
                <Github className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white hover:text-wisdom-primary">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white hover:text-wisdom-primary">
                <Globe className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Button variant="link" className="p-0 h-auto text-gray-300 hover:text-white">Documentation</Button>
              </li>
              <li>
                <Button variant="link" className="p-0 h-auto text-gray-300 hover:text-white">API Reference</Button>
              </li>
              <li>
                <Button variant="link" className="p-0 h-auto text-gray-300 hover:text-white">Tutorials</Button>
              </li>
              <li>
                <Button variant="link" className="p-0 h-auto text-gray-300 hover:text-white">Examples</Button>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium">Features</h4>
            <ul className="space-y-2">
              <li>
                <Button variant="link" className="p-0 h-auto text-gray-300 hover:text-white">AI Chat</Button>
              </li>
              <li>
                <Button variant="link" className="p-0 h-auto text-gray-300 hover:text-white">Code Generation</Button>
              </li>
              <li>
                <Button variant="link" className="p-0 h-auto text-gray-300 hover:text-white">Image Analysis</Button>
              </li>
              <li>
                <Button variant="link" className="p-0 h-auto text-gray-300 hover:text-white">Project Export</Button>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Button variant="link" className="p-0 h-auto text-gray-300 hover:text-white">Privacy Policy</Button>
              </li>
              <li>
                <Button variant="link" className="p-0 h-auto text-gray-300 hover:text-white">Terms of Service</Button>
              </li>
              <li>
                <Button variant="link" className="p-0 h-auto text-gray-300 hover:text-white">License</Button>
              </li>
            </ul>
          </div>
        </div>
        
        <Separator className="my-6 bg-gray-700" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} UHLAKANIPHO. All rights reserved.
          </p>
          <p className="text-sm text-gray-400 mt-2 md:mt-0">
            Powered by OpenRouter API
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
