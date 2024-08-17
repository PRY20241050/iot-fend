import { createContext, useContext } from "react";

interface UserTypeContextValue {
  brickyardId?: string;
  institution: boolean;
}

export const UserTypeContext = createContext<UserTypeContextValue | undefined>(
  undefined
);

export const useUserTypeContext = () => {
  const context = useContext(UserTypeContext);
  if (!context) {
    throw new Error(
      "useUserTypeContext must be used within a UserTypeProvider"
    );
  }
  return context;
};
