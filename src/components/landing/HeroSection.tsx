'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronRight, PlayCircle } from 'lucide-react';
import { DynamicBackground } from './DynamicBackground';

export function HeroSection() {
  return (
    <section className="relative py-24 md:py-36 lg:py-48 bg-gradient-to-br from-background via-background to-secondary/10 overflow-hidden">
      <DynamicBackground />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter">
            <span className="block text-foreground leading-tight">Welcome to</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary-foreground/80 py-2 leading-tight">
              SynapseChat AI
            </span>
          </h1>
          <p className="mt-6 sm:mt-8 max-w-xl mx-auto text-lg sm:text-xl text-muted-foreground">
            Experience the next generation of AI-powered conversations. SynapseChat offers a dynamic, sleek, and intelligent platform for all your chat needs.
          </p>
          <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg transform transition-transform hover:scale-105 px-8 py-3 text-base font-semibold">
              <Link href="/chat">
                Get Started Free
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="text-foreground border-primary/40 hover:bg-primary/10 hover:text-primary shadow-lg transform transition-transform hover:scale-105 px-8 py-3 text-base font-semibold hover:border-primary">
              <Link href="#features">
                <PlayCircle className="mr-2 h-5 w-5" />
                Learn More
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
