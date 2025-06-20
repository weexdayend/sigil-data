
"use client"; 
import { AppHeader } from '@/components/common/AppHeader';
import { AppFooter } from '@/components/common/AppFooter';
import { usePathname } from 'next/navigation';

export default function MainAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  if (pathname === '/chat') {
    // For the chat page, render children directly to allow full viewport control
    return <div className="h-screen flex flex-col">{children}</div>;
  }

  // Standard layout for other pages
  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader variant="app" />
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {children}
      </main>
      <AppFooter />
    </div>
  );
}
