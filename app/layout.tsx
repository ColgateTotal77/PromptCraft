import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Sidebar } from '@/components/common/Sidebar';

const inter = Inter({ subsets: [ 'latin' ] });

export const metadata: Metadata = {
  title: 'PromptCraft - Prompt Optimizer',
  description: 'AI Prompt Engineering Workspace',
};

export default function RootLayout({ children }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body className={ `${ inter.className } min-h-screen bg-gray-50 text-gray-900` }>
    <Sidebar/>
    <div className="flex-1 md:ml-[250px] min-h-screen">
      <main>{ children }</main>
    </div>
    </body>
    </html>
  );
}
