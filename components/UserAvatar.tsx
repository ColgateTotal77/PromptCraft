interface UserAvatarProps {
  avatar_url: string
}

export function UserAvatar(props: UserAvatarProps) {
  const { avatar_url } = props;

  return (
    <img
      src={ avatar_url || '/default-avatar.png' }
      alt="Avatar"
      className="w-10 h-10 rounded-full object-cover"
    />
  );
}
