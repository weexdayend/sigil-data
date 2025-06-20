
import type { ReactNode } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

type FeatureCardProps = {
  icon: ReactNode;
  title: string;
  description: string;
  dataAiHint?: string;
  className?: string;
  imageFirst?: boolean;
};

export function FeatureCard({ icon, title, description, dataAiHint, className, imageFirst = false }: FeatureCardProps) {
  return (
    <div 
      className={cn(
        "bg-card/50 backdrop-blur-sm p-6 sm:p-8 rounded-xl shadow-lg hover:shadow-primary/20 transition-all duration-300 border border-border/50 hover:border-primary/40 transform hover:-translate-y-1.5 flex flex-col md:flex-row items-center gap-6 md:gap-8",
        imageFirst ? "md:flex-row-reverse" : "",
        className
      )}
      style={{ animationDelay: 'inherit' }} // For staggered animations from parent
    >
      <div className="flex-shrink-0 w-full md:w-2/5">
        <Image 
          src={`https://placehold.co/400x300.png`} 
          alt={title} 
          width={400} 
          height={300} 
          className="rounded-lg shadow-md object-cover w-full h-auto md:max-h-60" 
          data-ai-hint={dataAiHint} 
        />
      </div>
      <div className="flex-grow text-center md:text-left">
        <div className="flex justify-center md:justify-start items-center mb-4">
          <div className="p-3 bg-primary/10 rounded-full inline-block mr-3 transition-transform duration-300 group-hover:scale-110">
            {icon}
          </div>
          <h3 className="font-bold text-xl sm:text-2xl text-foreground">{title}</h3>
        </div>
        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
