import HistoryItem, { OptimizedPromptHistoryProps } from '@/features/library/components/History/HistoryItem';

export default function History() {
  const testItem: OptimizedPromptHistoryProps = {
    prompt: "Напиши емейл клиенту о задержке проекта на 2 дня из-за багов",
    optimizedPrompt: "# Role: Professional Project Manager\n# Task: Communicate project delay\n\nDear Client,\n\nI am writing to provide a brief update regarding our current sprint. Due to unforeseen technical challenges during the final QA phase, we require an additional 48 hours to ensure the stability of the release...",
    type: 'optimized',
    createdAt: new Date(),
    scores: {
      clarity: 9,
      context: 7,
    },
    settings: {
      framework: 'RTF',
      missingInfo: 'INFER_CREATIVELY',
      language: 'MATCH_USER',
    }
  };

  return <div className="flex flex-col gap-4">
    <HistoryItem item={testItem}/>
    <HistoryItem item={testItem}/>
  </div>;
}
