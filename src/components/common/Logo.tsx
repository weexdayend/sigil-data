import Link from 'next/link';
import { MessageSquareText } from 'lucide-react';

type LogoProps = {
  className?: string;
  iconSize?: number;
  textSize?: string;
};

export function Logo({ className, iconSize = 24, textSize = "text-2xl" }: LogoProps) {
  return (
    <Link href="/" className={`flex items-center space-x-2 ${className}`}>
      <MessageSquareText className="text-primary" size={iconSize} />
      <span className={`font-headline font-bold ${textSize} text-foreground`}>
        Synapse<span className="text-primary">Chat</span>
      </span>
    </Link>
  );
}
