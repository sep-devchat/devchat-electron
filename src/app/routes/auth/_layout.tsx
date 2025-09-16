import { createFileRoute, Outlet } from "@tanstack/react-router";
import authBg from "@/app/assets/images/auth-bg.svg";

export const Route = createFileRoute("/auth/_layout")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center bg-gray-50"
      style={{ 
        backgroundImage: `url(${authBg})`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center' 
      }}
    >
      <div className="w-full max-w-md">
        <Outlet />
      </div>
    </div>
  );
}