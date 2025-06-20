
import { AppHeader } from '@/components/common/AppHeader';
import { AppFooter } from '@/components/common/AppFooter';
import { HeroSection } from '@/components/landing/HeroSection';
import { FeatureCard } from '@/components/landing/FeatureCard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Zap, MessageCircle, Settings, Brain, CheckCircle, ArrowRight, ShieldCheck, BarChart3, Users } from 'lucide-react';
import Image from 'next/image';

const features = [
  {
    icon: <Zap className="h-8 w-8 text-primary" />,
    title: 'Real-Time Interaction',
    description: 'Engage in dynamic conversations with instant AI responses, making interactions feel natural and fluid. Powered by our advanced streaming technology.',
    dataAiHint: 'speed abstract',
    imageFirst: false,
  },
  {
    icon: <Brain className="h-8 w-8 text-primary" />,
    title: 'Context-Aware AI',
    description: 'Our AI understands the context of your conversation, providing more relevant and insightful answers by remembering previous turns.',
    dataAiHint: 'intelligence network',
    imageFirst: true,
  },
  {
    icon: <MessageCircle className="h-8 w-8 text-primary" />,
    title: 'Dynamic Chat Interface',
    description: 'A sleek, modern, and intuitive chat interface designed for an exceptional user experience on any device. Fully customizable to match your brand.',
    dataAiHint: 'chat interface',
    imageFirst: false,
  },
  {
    icon: <Settings className="h-8 w-8 text-primary" />,
    title: 'Personalized Dashboard',
    description: 'Manage your settings, view detailed chat history, and customize your AI experience with our powerful user dashboard.',
    dataAiHint: 'dashboard user',
    imageFirst: true,
  },
];

const pricingTiers = [
  {
    name: "Starter",
    price: "Free",
    priceDetail: "forever",
    description: "Perfect for individuals and small projects getting started with AI chat.",
    features: ["Basic AI model access", "Limited chat history (30 days)", "Community support", "100 messages/month"],
    cta: "Get Started Free",
    href: "/chat",
    dataAiHint: "startup office",
    icon: <Zap size={28} className="text-primary mb-4" />
  },
  {
    name: "Pro",
    price: "$20",
    priceDetail: "/month",
    description: "For professionals and growing teams needing more power and features.",
    features: ["Advanced AI model access", "Unlimited chat history", "Priority email support", "Early access to new features", "10,000 messages/month", "Enhanced context understanding"],
    cta: "Choose Pro Plan",
    href: "/chat", 
    isFeatured: true,
    dataAiHint: "business team",
    icon: <Brain size={28} className="text-background mb-4" />
  },
  {
    name: "Enterprise",
    price: "Custom",
    priceDetail: "tailored for you",
    description: "Scalable solutions for large organizations with specific requirements.",
    features: ["Dedicated AI models & fine-tuning", "Custom integrations & API access", "24/7 dedicated support & SLA", "On-premise option available", "Unlimited messages", "Volume discounts"],
    cta: "Contact Sales",
    href: "/contact", // Assuming a /contact page might exist or be added
    dataAiHint: "corporate building",
    icon: <ShieldCheck size={28} className="text-primary mb-4" />
  }
];

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <AppHeader variant="landing" />
      <main className="flex-grow">
        <HeroSection />
        
        <section id="features" className="py-20 sm:py-28 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 sm:mb-20">
              <span className="text-primary font-semibold tracking-wider uppercase text-sm">Our Features</span>
              <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
                Unlock the Power of Conversational AI
              </h2>
              <p className="mt-4 sm:mt-6 text-lg text-muted-foreground max-w-3xl mx-auto">
                SynapseChat is packed with innovative features designed to elevate your AI interactions and streamline your workflows.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-12 md:gap-16">
              {features.map((feature, index) => (
                <FeatureCard
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  dataAiHint={feature.dataAiHint}
                  imageFirst={feature.imageFirst}
                  className="animate-slide-up-fade"
                  style={{ animationDelay: `${index * 0.15}s` }}
                />
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="py-20 sm:py-28 bg-secondary/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 sm:mb-20">
              <span className="text-primary font-semibold tracking-wider uppercase text-sm">Flexible Pricing</span>
              <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
                Plans for Every Need
              </h2>
              <p className="mt-4 sm:mt-6 text-lg text-muted-foreground max-w-3xl mx-auto">
                Choose a plan that fits your requirements. Start for free or unlock powerful features with our Pro and Enterprise plans. No hidden fees, transparent pricing.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
              {pricingTiers.map((tier, index) => (
                <div 
                  key={tier.name} 
                  className={`rounded-2xl p-8 flex flex-col transition-all duration-300 hover:shadow-primary-glow animate-slide-up-fade
                    ${tier.isFeatured 
                      ? 'bg-primary text-primary-foreground shadow-2xl scale-100 hover:scale-[1.03]' 
                      : 'bg-card border border-border hover:border-primary/50 shadow-xl hover:scale-[1.02]'
                  }`}
                  style={{ animationDelay: `${0.5 + index * 0.15}s` }}
                >
                  <div className="flex-shrink-0 mb-6 text-center">
                    {tier.icon}
                    <h3 className={`text-2xl font-semibold ${tier.isFeatured ? 'text-background' : 'text-foreground'}`}>{tier.name}</h3>
                    <p className={`mt-1 text-sm ${tier.isFeatured ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>{tier.description}</p>
                  </div>
                  
                  <div className="mb-8 text-center">
                    <span className={`text-5xl font-extrabold ${tier.isFeatured ? 'text-background' : 'text-foreground'}`}>{tier.price}</span>
                    <span className={`ml-1 text-base ${tier.isFeatured ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>{tier.priceDetail}</span>
                  </div>
                  
                  <ul className="space-y-3 mb-10 flex-grow">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle size={20} className={`mr-3 flex-shrink-0 mt-0.5 ${tier.isFeatured ? 'text-background/90' : 'text-accent'}`} />
                        <span className={`${tier.isFeatured ? 'text-primary-foreground/90' : 'text-muted-foreground'}`}>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    asChild 
                    size="lg" 
                    className={`w-full font-semibold text-lg py-3.5 rounded-lg group
                      ${tier.isFeatured 
                        ? "bg-background text-primary hover:bg-background/90" 
                        : "bg-primary hover:bg-primary/90 text-primary-foreground"
                    }`}
                  >
                    <Link href={tier.href}>
                      {tier.cta}
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 sm:py-28 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-primary via-accent to-purple-600 p-8 sm:p-12 md:p-16 rounded-2xl shadow-2xl text-center text-primary-foreground animate-fade-in">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Transform Your Interactions?</h2>
              <p className="text-lg sm:text-xl mb-8 max-w-2xl mx-auto opacity-90">
                Join thousands of users leveraging SynapseChat to build smarter, faster, and more engaging AI experiences.
              </p>
              <Button 
                asChild 
                size="lg" 
                className="bg-background text-primary hover:bg-white/90 shadow-lg transform transition-all duration-300 hover:scale-105 px-10 py-3.5 text-lg font-semibold rounded-xl group"
              >
                <Link href="/chat">
                  Get Started for Free
                  <ArrowRight className="ml-2.5 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

      </main>
      <AppFooter />
    </div>
  );
}
