import { Logo } from '@/components/common/Logo';
import { Github, Twitter, Linkedin } from 'lucide-react';

export function AppFooter() {
  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8 max-w-screen-xl">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="text-center sm:text-left">
            <Logo iconSize={20} textSize="text-xl" />
            <p className="mt-2 text-sm text-muted-foreground">
              Empowering intelligent conversations.
            </p>
          </div>
          <div className="flex space-x-5">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="GitHub">
              <Github size={22} />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Twitter">
              <Twitter size={22} />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="LinkedIn">
              <Linkedin size={22} />
            </a>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-border/40 text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} SynapseChat Technologies. All rights reserved. Built with passion.
        </div>
      </div>
    </footer>
  );
}
