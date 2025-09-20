import { PropsWithChildren } from "react";
import AuthContext from "../contexts/auth.context";
import { fetchProfile } from "../lib/services/auth";
import { useQuery } from "@tanstack/react-query";

export default function AuthProvider({ children }: PropsWithChildren) {
  const fetchProfileQuery = useQuery({
    initialData: undefined,
    queryKey: ["fetchProfile"],
    queryFn: fetchProfile,
    retry: 0,
  });

  return (
    <AuthContext.Provider
      value={{
        profile: fetchProfileQuery.data,
        refetchProfile: fetchProfileQuery.refetch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
