import { useAuth } from "features/authRouting";

export function PublicPage() {
  const { logout } = useAuth();

  return <button onClick={logout}>Выйти</button>;
}
