import { Outlet } from '@tanstack/react-router';

export default function App() {
  return (
    <div className="p-4">
      <Outlet />
    </div>
  );
}
