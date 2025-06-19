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
    <Card className="bg-card shadow-xl hover:shadow-2xl transition-shadow duration-300 flex flex-col h-full">
      <CardHeader className="items-center text-center">
        <div className="p-4 bg-primary/10 rounded-full mb-4">
          {icon}
        </div>
        <CardTitle className="font-headline text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-center flex-grow">
        <Image src="https://placehold.co/300x200.png" alt={title} width={300} height={200} className="rounded-md mb-4 mx-auto" data-ai-hint={dataAiHint} />
        <p className="text-muted-foreground text-sm">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
