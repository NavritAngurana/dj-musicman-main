import { motion } from "framer-motion";
import { Sparkles, Zap, Brain, Wand2, Radio, Volume2 } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Mixing",
    description: "Advanced machine learning algorithms analyze tempo, key, and energy to create seamless transitions.",
  },
  {
    icon: Zap,
    title: "Real-time Adaptation",
    description: "Music dynamically adjusts based on crowd energy and environment detected through your camera.",
  },
  {
    icon: Radio,
    title: "Multi-Platform Sync",
    description: "Seamlessly switch between Spotify, Apple Music, and YouTube Music without interruption.",
  },
  {
    icon: Wand2,
    title: "Smart Beatmatching",
    description: "Automatic BPM detection and synchronization for professional-quality transitions.",
  },
  {
    icon: Volume2,
    title: "Mood Detection",
    description: "Visual AI analyzes lighting and movement to match the perfect soundtrack to your moment.",
  },
  {
    icon: Sparkles,
    title: "Personalized Learning",
    description: "The more you use AI DJ, the better it understands your unique music preferences.",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-24 relative">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Powered by <span className="text-gradient">Intelligence</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Cutting-edge AI technology that understands music like never before
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative rounded-2xl border border-border bg-card p-6 hover:border-primary/50 transition-all duration-300"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative">
                <div className="inline-flex p-3 rounded-xl bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
