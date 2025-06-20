import type { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

type FeatureCardProps = {
  icon: ReactNode;
  title: string;
  description: string;
  dataAiHint?: string;
};

export function FeatureCard({ icon, title, description, dataAiHint }: FeatureCardProps) {
  return (
    <Card className="bg-card shadow-lg hover:shadow-primary/20 transition-all duration-300 flex flex-col h-full border border-border hover:border-primary/30 transform hover:-translate-y-1">
      <CardHeader className="items-center text-center pt-8 pb-4">
        <div className="p-4 bg-primary/10 rounded-full mb-4 inline-block">
          {icon}
        </div>
        <CardTitle className="font-bold text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-center flex-grow px-6 pb-8">
        <Image src={`https://placehold.co/300x200.png`} alt={title} width={300} height={200} className="rounded-md mb-6 mx-auto shadow-md" data-ai-hint={dataAiHint} />
        <p className="text-muted-foreground text-sm leading-relaxed">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
