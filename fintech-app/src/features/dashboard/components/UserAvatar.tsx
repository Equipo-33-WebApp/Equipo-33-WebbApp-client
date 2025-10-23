
interface UserAvatarProps {
  user: User
}
export const UserAvatar: React.FC<UserAvatarProps> = ({ user }) => {
  return (
    <div
      className="w-16 h-16 rounded-full flex items-center justify-center cursor-default 
      border border-gray-200 ring-2 ring-accent/20 
      bg-gradient-to-br from-accent/40 to-accent/10 text-xl font-semibold text-accent"
    >
      {user?.firstName?.[0]}
      {user?.lastName?.[0]}
    </div>
  )
}