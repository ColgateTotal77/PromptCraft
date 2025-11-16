import { cn } from '@/lib/utils';
import React from 'react';
import { UserAvatar } from './UserAvatar';
import { MessageContainer, MessageContainerProps } from '@/components/ui/MessageContainer';

interface CommentContainerProps extends MessageContainerProps {
  avatarUrl?: string;
  username?: string;
  timestamp?: string;
  isSystem?: boolean;
  className?: string;
}

export function CommentContainer(props: CommentContainerProps) {
  const {
    avatarUrl,
    username,
    timestamp,
    actions,
    children,
    direction,
    isSystem = false,
    className
  } = props;

  return (
    <div
      className={ cn(
        'w-full flex gap-3 py-4 px-3 border-b border-gray-700/40',
        isSystem && 'bg-gray-100/70',
        className
      ) }
    >
      { !isSystem && (
        <UserAvatar avatar_url={ avatarUrl || '/default-avatar.png' }/>
      ) }

      <div className="flex-1 flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            { username && (
              <span className="text-sm font-semibold text-gray-500">
                { username }
              </span>
            ) }
            { timestamp && (
              <span className="text-xs text-gray-500">
                { timestamp }
              </span>
            ) }
          </div>
        </div>

        <MessageContainer actions={ actions } direction={ direction }>
          { children }
        </MessageContainer>
      </div>
    </div>
  );
}
