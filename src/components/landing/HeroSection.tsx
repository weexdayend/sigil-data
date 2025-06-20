'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronRight, PlayCircle } from 'lucide-react';
import { DynamicBackground } from './DynamicBackground';

export function HeroSection() {
  return (
    <section className="relative py-20 md:py-32 bg-gradient-to-br from-background to-secondary/20 overflow-hidden">
      <DynamicBackground />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-headline font-extrabold tracking-tight">
            <span className="block">Welcome to</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent py-2">
              Sigil AI
            </span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-muted-foreground">
            Experience the next generation of AI-powered conversations. SynapseChat offers a dynamic, sleek, and intelligent platform for all your chat needs.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg transform transition-transform hover:scale-105">
              <Link href="/chat">
                Get Started Free
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="text-foreground border-primary hover:bg-primary/10 hover:text-primary shadow-lg transform transition-transform hover:scale-105">
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
