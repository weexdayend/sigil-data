import { AppHeader } from '@/components/common/AppHeader';
import { AppFooter } from '@/components/common/AppFooter';
import { HeroSection } from '@/components/landing/HeroSection';
import { FeatureCard } from '@/components/landing/FeatureCard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Zap, MessageCircle, Settings, Brain, CheckCircle } from 'lucide-react';
import Image from 'next/image';

const features = [
  {
    icon: <Zap className="h-10 w-10 text-primary" />,
    title: 'Real-Time Interaction',
    description: 'Engage in dynamic conversations with instant AI responses, making interactions feel natural and fluid.',
    dataAiHint: 'speed abstract'
  },
  {
    icon: <Brain className="h-10 w-10 text-primary" />,
    title: 'Context-Aware AI',
    description: 'Our AI understands the context of your conversation, providing more relevant and insightful answers.',
    dataAiHint: 'intelligence network'
  },
  {
    icon: <MessageCircle className="h-10 w-10 text-primary" />,
    title: 'Dynamic Chat Interface',
    description: 'A sleek, modern, and intuitive chat interface designed for an exceptional user experience.',
    dataAiHint: 'chat interface'
  },
  {
    icon: <Settings className="h-10 w-10 text-primary" />,
    title: 'User Dashboard',
    description: 'Manage your settings, view chat history, and customize your experience with ease.',
    dataAiHint: 'dashboard user'
  },
];

const pricingTiers = [
  {
    name: "Starter",
    price: "Free",
    priceDetail: "forever",
    features: ["Basic AI model access", "Limited chat history", "Community support"],
    cta: "Get Started",
    href: "/chat",
    dataAiHint: "startup office"
  },
  {
    name: "Pro",
    price: "$20",
    priceDetail: "/month",
    features: ["Advanced AI model access", "Unlimited chat history", "Priority email support", "Early access to new features", "Enhanced context understanding"],
    cta: "Choose Pro",
    href: "/chat", 
    isFeatured: true,
    dataAiHint: "business team"
  },
  {
    name: "Enterprise",
    price: "Custom",
    priceDetail: "tailored for you",
    features: ["Dedicated AI models", "Custom integrations & API", "24/7 dedicated support", "On-premise option available", "Volume discounts"],
    cta: "Contact Sales",
    href: "/contact",
    dataAiHint: "corporate building"
  }
];

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <AppHeader variant="landing" />
      <main className="flex-grow">
        <HeroSection />
        
        <section id="features" className="py-16 sm:py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
                Experience the Future of AI Chat
              </h2>
              <p className="mt-4 sm:mt-6 text-lg text-muted-foreground max-w-3xl mx-auto">
                SynapseChat offers cutting-edge features to make your AI interactions smarter, faster, and more intuitive than ever before.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <FeatureCard
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  dataAiHint={feature.dataAiHint}
                />
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="py-16 sm:py-24 bg-secondary/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
                Flexible Pricing for Everyone
              </h2>
              <p className="mt-4 sm:mt-6 text-lg text-muted-foreground max-w-3xl mx-auto">
                Choose a plan that fits your needs. Start for free or unlock powerful features with our Pro and Enterprise plans.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
              {pricingTiers.map((tier) => (
                <div 
                  key={tier.name} 
                  className={`rounded-xl shadow-2xl p-6 sm:p-8 flex flex-col transition-all duration-300 hover:scale-[1.02] ${
                    tier.isFeatured 
                      ? 'bg-primary/10 border-2 border-primary ring-4 ring-primary/20' 
                      : 'bg-card border border-border hover:border-primary/50'
                  }`}
                >
                  <Image src={`https://placehold.co/600x400.png`} alt={tier.name} width={600} height={400} className="rounded-lg mb-6 shadow-md" data-ai-hint={tier.dataAiHint} />
                  <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                  <div className="flex items-baseline mb-1">
                    <p className="text-4xl font-extrabold">{tier.price}</p>
                    {tier.priceDetail !== "forever" && <p className="text-muted-foreground ml-1">{tier.priceDetail}</p>}
                  </div>
                  {tier.priceDetail === "forever" && <p className="text-muted-foreground mb-6 h-6">No cost to start</p>}
                  {tier.priceDetail !== "forever" && <p className="text-muted-foreground mb-6 h-6">{tier.name === "Pro" || tier.name === "Starter" ? "Billed monthly" : "Custom pricing"}</p>}
                  
                  <ul className="space-y-3 text-muted-foreground mb-8 flex-grow">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle size={18} className={`${tier.isFeatured ? 'text-primary' : 'text-accent'} mr-2.5 flex-shrink-0 mt-0.5`} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    asChild 
                    size="lg" 
                    className={`w-full font-semibold text-lg py-3 ${
                      tier.isFeatured 
                        ? "bg-primary hover:bg-primary/90 text-primary-foreground" 
                        : "bg-accent hover:bg-accent/90 text-accent-foreground"
                    }`}
                  >
                    <Link href={tier.href}>{tier.cta}</Link>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
      <AppFooter />
    </div>
  );
}
