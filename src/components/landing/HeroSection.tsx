
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronRight, PlayCircle, Rocket } from 'lucide-react';
import { DynamicBackground } from './DynamicBackground';

export function HeroSection() {
  return (
    <section className="relative min-h-[85vh] md:min-h-screen flex items-center justify-center py-20 md:py-32 lg:py-40 bg-gradient-to-br from-background via-background to-secondary/5 overflow-hidden">
      <DynamicBackground />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
           <div className="inline-block px-4 py-1.5 mb-6 bg-primary/10 text-primary text-sm font-medium rounded-full border border-primary/30 animate-fade-in">
            Powered by Next-Gen AI
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter animate-slide-up-fade" style={{animationDelay: '0.2s'}}>
            <span className="block text-foreground leading-tight">Welcome to</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary-foreground/80 py-1 leading-tight">
              SynapseChat AI
            </span>
          </h1>
          <p className="mt-6 sm:mt-8 max-w-2xl mx-auto text-lg sm:text-xl text-muted-foreground animate-slide-up-fade" style={{animationDelay: '0.4s'}}>
            Experience the next generation of AI-powered conversations. SynapseChat offers a dynamic, sleek, and intelligent platform for all your chat needs, revolutionizing how you interact with AI.
          </p>
          <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 animate-slide-up-fade" style={{animationDelay: '0.6s'}}>
            <Button 
              asChild 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-primary-glow transform transition-all duration-300 hover:scale-105 px-8 py-3 text-base sm:text-lg font-semibold rounded-xl group"
            >
              <Link href="/chat">
                Start Chatting Now
                <Rocket className="ml-2.5 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              asChild 
              className="text-foreground border-border hover:bg-primary/10 hover:text-primary hover:border-primary shadow-md hover:shadow-soft transform transition-all duration-300 hover:scale-105 px-8 py-3 text-base sm:text-lg font-semibold rounded-xl group"
            >
              <Link href="#features">
                <PlayCircle className="mr-2.5 h-5 w-5 transition-transform duration-300 group-hover:rotate-[360deg] group-hover:scale-110" />
                Discover Features
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
