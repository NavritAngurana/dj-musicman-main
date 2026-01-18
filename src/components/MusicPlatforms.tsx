import { motion } from "framer-motion";
import { Music, Play, Tv } from "lucide-react";

const platforms = [
  {
    name: "Spotify",
    icon: Music,
    color: "from-green-500 to-green-600",
    description: "Connect your Spotify account to access millions of tracks and personalized playlists.",
  },
  {
    name: "Apple Music",
    icon: Play,
    color: "from-pink-500 to-red-500",
    description: "Integrate with Apple Music for seamless playback across all your Apple devices.",
  },
  {
    name: "YouTube Music",
    icon: Tv,
    color: "from-red-500 to-red-600",
    description: "Access YouTube Music's vast library including music videos and exclusive content.",
  },
];

const MusicPlatforms = () => {
  return (
    <section id="connect" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-glow" />
      
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Connect Your <span className="text-gradient">Music</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Link your favorite streaming platforms and let AI DJ create the perfect mix
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {platforms.map((platform, index) => (
            <motion.div
              key={platform.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="group relative rounded-2xl border border-border bg-card p-8 shadow-card hover:border-primary/50 transition-all duration-300"
            >
              <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${platform.color} mb-6 shadow-lg`}>
                <platform.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-3">{platform.name}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{platform.description}</p>
              
              <button className="mt-6 text-sm font-medium text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-2 group-hover:gap-3">
                Connect Account
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MusicPlatforms;
