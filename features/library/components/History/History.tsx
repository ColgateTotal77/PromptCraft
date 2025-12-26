import { trpc } from '@/lib/trpc';
import HistoryItem from '@/features/library/components/History/HistoryItem';
import { Loading } from '@/components/ui/loading';

export default function History() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading
  } = trpc.getHistory.useInfiniteQuery(
    { limit: 10 },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );

  const allItems = data?.pages.flatMap((page) => page.items) ?? [];

  if (isLoading) return <Loading/>;

  return (
    <div className="flex flex-col gap-4">
      {allItems.map((item) => (
        <HistoryItem key={`${item.type}-${item.id}`} item={item} />
      ))}

      {hasNextPage && (
        <button
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
          className="mt-4 p-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
        >
          {isFetchingNextPage ? 'Loading more...' : 'Load More'}
        </button>
      )}

      {!hasNextPage && allItems.length > 0 && (
        <p className="text-center text-gray-500 text-sm">No more history to show.</p>
      )}
    </div>
  );
}
