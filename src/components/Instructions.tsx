import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Connect Your Accounts",
    description: "Link your Spotify, Apple Music, or YouTube Music account to give AI DJ access to your music library.",
    details: ["OAuth secure authentication", "Read-only access to playlists", "No password sharing required"],
  },
  {
    number: "02",
    title: "Enable Camera Access",
    description: "Allow camera access so our AI can analyze your environment and crowd energy in real-time.",
    details: ["Secure video streaming", "Privacy-focused processing", "Can be disabled anytime"],
  },
  {
    number: "03",
    title: "Set Your Preferences",
    description: "Choose your music genres, energy levels, and let AI DJ know your preferred style.",
    details: ["Genre preferences", "BPM range settings", "Transition style options"],
  },
  {
    number: "04",
    title: "Launch & Enjoy",
    description: "Hit play and watch as AI DJ creates the perfect mix tailored to your environment.",
    details: ["Real-time beat matching", "Smooth transitions", "Adaptive playlist updates"],
  },
];

const Instructions = () => {
  return (
    <section id="instructions" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Getting <span className="text-gradient">Started</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Follow these simple steps to activate your personal AI DJ experience
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative mb-8 last:mb-0"
            >
              {index < steps.length - 1 && (
                <div className="absolute left-8 top-24 bottom-0 w-px bg-gradient-to-b from-primary/50 to-transparent hidden md:block" />
              )}
              
              <div className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-neon">
                  <span className="font-display text-xl font-bold text-primary-foreground">{step.number}</span>
                </div>
                
                <div className="flex-1 rounded-2xl border border-border bg-card p-6 shadow-card hover:border-primary/30 transition-colors">
                  <h3 className="font-display text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground mb-4">{step.description}</p>
                  
                  <ul className="space-y-2">
                    {step.details.map((detail, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Check className="h-4 w-4 text-primary" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <a 
            href="#features" 
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
          >
            Explore all features
            <ArrowRight className="h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Instructions;
