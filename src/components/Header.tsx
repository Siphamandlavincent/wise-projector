
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-sm border-b">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar className="h-10 w-10">
            <AvatarFallback>U</AvatarFallback>
            <AvatarImage src="https://i.postimg.cc/3NrMbdj9/Spha-Apps-Logo.png" alt="Spha Apps Logo" />
          </Avatar>
          <h1 className="text-2xl font-bold text-wisdom-dark">UHLAKANIPHO</h1>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <Button variant="link" className="text-wisdom-dark font-medium" onClick={() => window.location.hash = 'chat'}>Chat</Button>
          <Button variant="link" className="text-wisdom-dark font-medium" onClick={() => window.location.hash = 'generate'}>Generate Projects</Button>
          <Button variant="link" className="text-wisdom-dark font-medium">Documentation</Button>
          <Link to="/">
            <Button variant="default" className="bg-wisdom-primary hover:bg-wisdom-primary/90 text-wisdom-dark">Get Started</Button>
          </Link>
        </nav>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </Button>
      </div>
      
      {isMenuOpen && (
        <div className="container md:hidden pb-4">
          <nav className="flex flex-col gap-2">
            <Button variant="ghost" className="justify-start" onClick={() => window.location.hash = 'chat'}>Chat</Button>
            <Button variant="ghost" className="justify-start" onClick={() => window.location.hash = 'generate'}>Generate Projects</Button>
            <Button variant="ghost" className="justify-start">Documentation</Button>
            <Link to="/">
              <Button variant="default" className="bg-wisdom-primary hover:bg-wisdom-primary/90 text-wisdom-dark mt-2 w-full">Get Started</Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
