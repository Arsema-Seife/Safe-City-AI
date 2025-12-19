import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Shield, MapPin, Bell, ArrowRight, Sparkles } from "lucide-react";

const AnimatedWord = ({ children, delay }: { children: string; delay: number }) => (
  <motion.span
    initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
    transition={{ duration: 0.6, delay, ease: [0.25, 0.4, 0.25, 1] }}
    className="inline-block"
  >
    {children}
  </motion.span>
);

export default function Landing() {
  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section - Full viewport, centered */}
      <section className="min-h-screen flex items-center justify-center px-4 relative">
        {/* Subtle gradient orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-safe/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto max-w-5xl text-center relative z-10">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8"
          >
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">AI-Powered Safety</span>
          </motion.div>

          {/* Main headline with staggered animation */}
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1.1] mb-8">
            <div className="mb-2">
              <AnimatedWord delay={0.2}>Stay</AnimatedWord>{" "}
              <AnimatedWord delay={0.3}>Safe</AnimatedWord>
            </div>
            <div>
              <AnimatedWord delay={0.4}>in</AnimatedWord>{" "}
              <motion.span
                initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.6, delay: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
                className="inline-block text-gradient"
              >
                Addis Ababa
              </motion.span>
            </div>
          </h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 font-light"
          >
            Real-time safety alerts and risk predictions powered by artificial intelligence.
            <br className="hidden md:block" />
            Navigate your city with confidence.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/map">
              <motion.button
                whileHover={{ scale: 1.03, boxShadow: "0 20px 40px -15px hsl(var(--primary) / 0.4)" }}
                whileTap={{ scale: 0.98 }}
                className="group relative px-8 py-4 rounded-2xl bg-primary text-primary-foreground font-semibold text-lg overflow-hidden transition-all duration-300"
              >
                <span className="relative z-10 flex items-center gap-3">
                  View Safety Map
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.button>
            </Link>
            
            <Link to="/dashboard">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 rounded-2xl border border-border hover:border-primary/50 hover:bg-primary/5 font-medium text-lg transition-all duration-300"
              >
                Explore Dashboard
              </motion.button>
            </Link>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2"
            >
              <div className="w-1 h-2 rounded-full bg-muted-foreground/50" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features - Clean cards */}
      <section className="py-32 px-4 bg-secondary/30">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              SafeCity AI combines real-time data with machine learning to keep you informed.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: MapPin,
                title: "Live Risk Map",
                description: "Interactive map showing real-time safety levels across neighborhoods with color-coded zones.",
              },
              {
                icon: Bell,
                title: "Smart Alerts",
                description: "Instant notifications when safety conditions change in areas you care about.",
              },
              {
                icon: Shield,
                title: "AI Predictions",
                description: "24-48 hour risk forecasts using historical data and environmental factors.",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                whileHover={{ y: -5 }}
                className="group p-8 rounded-3xl bg-card border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300"
              >
                <div className="inline-flex p-4 rounded-2xl bg-primary/10 mb-6 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-display font-bold text-xl mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative p-12 md:p-16 rounded-3xl bg-gradient-to-br from-primary/10 via-card to-safe/5 border border-border text-center overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.15),transparent_50%)]" />
            <div className="relative z-10">
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                Ready to explore safely?
              </h2>
              <p className="text-muted-foreground mb-10 text-lg">
                Join the community using SafeCity AI to navigate Addis Ababa with confidence.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/register">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-4 rounded-2xl bg-primary text-primary-foreground font-semibold"
                  >
                    Get Started Free
                  </motion.button>
                </Link>
                <Link to="/alerts">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-4 rounded-2xl border border-border hover:bg-secondary font-medium transition-colors"
                  >
                    View Recent Alerts
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-4 border-t border-border">
        <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Shield className="h-6 w-6 text-primary" />
            <span className="font-display font-bold text-lg">SafeCity AI</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2024 SafeCity AI. Keeping Addis Ababa safe.</p>
        </div>
      </footer>
    </div>
  );
}
