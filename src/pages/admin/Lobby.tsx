import { useParams } from 'react-router';

export const AdminLobby = () => {
  const { id } = useParams<{ id: string }>();
  // TODO: 自身がオーナーでない場合はリダイレクトする
  return <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">Admin</div>;
};
