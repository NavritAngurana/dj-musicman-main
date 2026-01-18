import { motion } from "framer-motion";
import { Disc3, Github, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 border-t border-border">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2"
          >
            <Disc3 className="h-6 w-6 text-primary" />
            <span className="font-display text-lg font-bold text-gradient">AI DJ</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-sm text-muted-foreground"
          >
            © 2024 AI DJ. All rights reserved.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-4"
          >
            <a href="#" className="p-2 rounded-lg hover:bg-muted transition-colors">
              <Twitter className="h-5 w-5 text-muted-foreground hover:text-foreground" />
            </a>
            <a href="#" className="p-2 rounded-lg hover:bg-muted transition-colors">
              <Github className="h-5 w-5 text-muted-foreground hover:text-foreground" />
            </a>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
