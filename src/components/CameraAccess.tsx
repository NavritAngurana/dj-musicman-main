import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Camera, Shield, Eye } from "lucide-react";
import { useState } from "react";

const CameraAccess = () => {
  const [cameraStatus, setCameraStatus] = useState<'idle' | 'requesting' | 'granted' | 'denied'>('idle');

  const requestCameraAccess = async () => {
    setCameraStatus('requesting');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach(track => track.stop());
      setCameraStatus('granted');
    } catch (error) {
      setCameraStatus('denied');
    }
  };

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent" />
      
      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-secondary/30 bg-secondary/5 mb-6">
              <Eye className="h-4 w-4 text-secondary" />
              <span className="text-sm text-muted-foreground">AI Vision Powered</span>
            </div>
            
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
              Enable <span className="text-gradient">Camera</span> for
              <br />Smart Detection
            </h2>
            
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Our AI uses your camera to analyze the environment, detect crowd energy, 
              lighting conditions, and mood to automatically adjust the music in real-time. 
              All processing happens securely on our backend.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Camera className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Real-time Analysis</h4>
                  <p className="text-sm text-muted-foreground">Camera feed is analyzed to understand the vibe</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-secondary/10">
                  <Shield className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Privacy First</h4>
                  <p className="text-sm text-muted-foreground">Video is processed securely and never stored</p>
                </div>
              </div>
            </div>

            <Button 
              variant={cameraStatus === 'granted' ? 'glow' : 'hero'} 
              size="lg"
              onClick={requestCameraAccess}
              disabled={cameraStatus === 'requesting'}
            >
              <Camera className="h-5 w-5" />
              {cameraStatus === 'idle' && 'Enable Camera Access'}
              {cameraStatus === 'requesting' && 'Requesting...'}
              {cameraStatus === 'granted' && 'Camera Enabled ✓'}
              {cameraStatus === 'denied' && 'Access Denied - Try Again'}
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-3xl border border-border bg-card p-8 shadow-card overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5" />
              
              <div className="relative aspect-video rounded-2xl bg-muted border border-border flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-grid-pattern opacity-20" />
                <div className="text-center">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="inline-flex p-6 rounded-full bg-primary/10 mb-4"
                  >
                    <Camera className="h-12 w-12 text-primary" />
                  </motion.div>
                  <p className="text-muted-foreground text-sm">Camera preview will appear here</p>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Status</span>
                <span className={`font-medium ${
                  cameraStatus === 'granted' ? 'text-green-500' : 
                  cameraStatus === 'denied' ? 'text-red-500' : 
                  'text-muted-foreground'
                }`}>
                  {cameraStatus === 'idle' && 'Not Connected'}
                  {cameraStatus === 'requesting' && 'Connecting...'}
                  {cameraStatus === 'granted' && 'Connected'}
                  {cameraStatus === 'denied' && 'Permission Denied'}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CameraAccess;
