import { motion } from "framer-motion";
import { Disc3, Sparkles } from "lucide-react";

const Header = () => {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl"
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Disc3 className="h-8 w-8 text-primary animate-spin" style={{ animationDuration: '3s' }} />
            <Sparkles className="h-4 w-4 text-neon-blue absolute -top-1 -right-1" />
          </div>
          <span className="font-display text-xl font-bold text-gradient">Intelligent Mix</span>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Features
          </a>
          <a href="#instructions" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Get Started
          </a>
          <a href="#connect" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Connect
          </a>
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;
