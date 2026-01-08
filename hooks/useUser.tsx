import { useContext } from "react";
import { UserContext } from "@/contexts/UserContext";

export function useUser() {
  const contex = useContext(UserContext);
  if (!contex) {
    throw new Error("useUser must be used in side UserProvider");
  }
  return contex;
}
