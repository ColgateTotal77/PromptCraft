import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { QueryProvider } from '@/components/providers/QueryProvider';
import { ClientProviders } from '@/components/providers/ClientProviders';
import { Sidebar } from '@/features/sidebar/components/Sidebar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'PromptCraft - Prompt Optimizer',
  description: 'AI Prompt Engineering Workspace',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          inter.className,
          'flex h-screen bg-gray-50 text-gray-900 overflow-hidden'
        )}
      >
        <QueryProvider>
          <ClientProviders>
            <Sidebar />
            <div className="flex-1 flex flex-col h-full overflow-hidden overflow-y-auto">
              <main className="flex-1 p-12 md:p-24 max-w-7xl mx-auto w-full">
                {children}
              </main>
            </div>
          </ClientProviders>
        </QueryProvider>
      </body>
    </html>
  );
}
