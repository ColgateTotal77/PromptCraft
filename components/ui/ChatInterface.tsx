'use client';

import { useState } from 'react';
import { Textarea } from '@/components/Textarea';
import { MessageContainer } from '@/components/MessageContainer';
import { Dropdown } from '@/components/Dropdown';
import { optimizePrompt } from '@/features/dashboard/actions';
import { Settings } from 'lucide-react';

type PromptFramework =
  | 'STANDARD'
  | 'CO-STAR'
  | 'RTF'
  | 'TAG';

type MissingInfoStrategy =
  | 'USE_PLACEHOLDERS'
  | 'INFER_CREATIVELY';

interface OptimizationSettings {
  framework?: PromptFramework;
  missingInfo?: MissingInfoStrategy;
  language?: 'MATCH_USER' | 'ENGLISH';
}

const DEFAULT_SETTINGS: OptimizationSettings = {
  framework: 'STANDARD',
  missingInfo: 'USE_PLACEHOLDERS',
  language: 'MATCH_USER',
};

type OptimizationFrameworkValue = NonNullable<OptimizationSettings['framework']>;
type MissingInfoStrategyValue = NonNullable<OptimizationSettings['missingInfo']>;
type OptimizationLanguageValue = NonNullable<OptimizationSettings['language']>;

const FRAMEWORK_OPTIONS: { value: OptimizationFrameworkValue; label: string }[] = [
  { value: 'STANDARD', label: 'Standard (Clarity + Structure)' },
  { value: 'CO-STAR', label: 'CO-STAR (Context, Objective, Style, Tone...)' },
  { value: 'RTF', label: 'RTF (Role, Task, Format)' },
  { value: 'TAG', label: 'TAG (Task, Action, Goal)' },
];

const MISSING_INFO_OPTIONS: { value: MissingInfoStrategyValue; label: string }[] = [
  {
    value: 'USE_PLACEHOLDERS',
    label: 'Use Placeholders (e.g., [INSERT DATA]) - Recommended for SaaS',
  },
  {
    value: 'INFER_CREATIVELY',
    label: 'Infer Creatively (Try to guess) - For beginners',
  },
];

const LANGUAGE_OPTIONS: {
  value: OptimizationLanguageValue;
  label: string;
}[] = [
  { value: 'MATCH_USER', label: 'Match User Language (Default)' },
  { value: 'ENGLISH', label: 'Always English' },
];


export default function ChatInterface() {
  const [ prompt, setPrompt ] = useState('');
  const [ messages, setMessages ] = useState<
    { role: 'user' | 'ai'; content: string }[]
  >([]);

  const [ settings, setSettings ] =
    useState<OptimizationSettings>(DEFAULT_SETTINGS);
  const [ isSettingsOpen, setIsSettingsOpen ] = useState(false);

  const updateSetting = <K extends keyof OptimizationSettings>(
    key: K,
    value: OptimizationSettings[K],
  ) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  async function handleImprove() {
    if (!prompt.trim()) return;

    setMessages(prev => [ ...prev, { role: 'user', content: prompt } ]);

    try {
      const data = await optimizePrompt(prompt, settings);

      setMessages(prev => [
        ...prev,
        { role: 'ai', content: data.optimized_prompt },
      ]);
    } catch (error) {
      console.error('Prompt optimization failed:', error);
      setMessages(prev => [
        ...prev,
        { role: 'ai', content: 'Optimization failed. Please check the server logs.' },
      ]);
    }


    setPrompt('');
  }

  const SettingsToggle = () => (
    <button
      className="p-2 text-gray-400 hover:text-gray-100 transition-colors rounded-full hover:bg-gray-700"
      onClick={ () => setIsSettingsOpen(!isSettingsOpen) }
      aria-expanded={ isSettingsOpen }
      aria-label="Toggle Prompt Optimization Settings"
    >
      <Settings className="w-5 h-5"/>
    </button>
  );

  const ImprovePrompt = () => (
    <button
      className="bg-gray-800 h-10 w-10 leading-10 rounded-xl text-white flex items-center justify-center text-xl font-semibold hover:bg-gray-700 transition-colors shadow-md"
      onClick={ handleImprove }
      aria-label="Improve Prompt"
    >
      +
    </button>
  );

  return (
    <div
      className="flex flex-col h-screen max-w-xl mx-auto border border-gray-600 rounded-2xl shadow-2xl overflow-hidden font-sans bg-gray-800 text-gray-300"
    >
      <div className="bg-gray-800 p-5 border-b border-gray-700">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-extrabold text-gray-100 tracking-tight">Prompt Improver</h2>
          <SettingsToggle/>
        </div>

        { isSettingsOpen && (
          <div
            className="space-y-5 p-4 mt-4 rounded-xl bg-gray-700 border border-gray-600 shadow-inner transition-all duration-300"
          >
            <h3 className="text-lg font-bold text-gray-200 border-b border-gray-600 pb-3">
              Optimization Settings
            </h3>

            <Dropdown
              label="Optimization Framework"
              value={ settings.framework || 'STANDARD' }
              options={ FRAMEWORK_OPTIONS }
              onChange={ value =>
                updateSetting('framework', value as OptimizationFrameworkValue)
              }
              placeholder="Select a framework"
            />

            <Dropdown
              label="Missing Information Strategy"
              value={ settings.missingInfo || 'USE_PLACEHOLDERS' }
              options={ MISSING_INFO_OPTIONS }
              onChange={ value =>
                updateSetting('missingInfo', value as MissingInfoStrategyValue)
              }
              placeholder="Select a strategy"
            />

            <Dropdown
              label="Output Language"
              value={ settings.language || 'MATCH_USER' }
              options={ LANGUAGE_OPTIONS }
              onChange={ value =>
                updateSetting('language', value as OptimizationLanguageValue)
              }
              placeholder="Select language"
            />
          </div>
        ) }
      </div>

      <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4 bg-gray-900">
        { messages.map((msg, i) => (
          <MessageContainer
            key={ i }
            direction={ msg.role === 'user' ? 'right' : 'left' }
          >
            { msg.content }
          </MessageContainer>
        )) }
      </div>

      <Textarea
        placeholder="Input prompt"
        value={ prompt }
        onChange={ e => setPrompt(e.target.value) }
        endBtns={ [ <ImprovePrompt key="improve"/> ] }
      />
    </div>
  );
}
