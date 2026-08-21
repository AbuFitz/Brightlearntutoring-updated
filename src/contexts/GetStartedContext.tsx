import { createContext, useContext, useState } from "react";
import type { SessionType } from "@/data/pricing";

export type Package = "KS2" | "KS3" | "GCSE" | "";

interface GetStartedContextType {
  open: boolean;
  preselectedPackage: Package;
  preselectedSessionType: SessionType;
  openModal: (pkg?: Package, sessionType?: SessionType) => void;
  closeModal: () => void;
}

const GetStartedContext = createContext<GetStartedContextType>({
  open: false,
  preselectedPackage: "",
  preselectedSessionType: "group",
  openModal: () => {},
  closeModal: () => {},
});

export const GetStartedProvider = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [preselectedPackage, setPreselectedPackage] = useState<Package>("");
  const [preselectedSessionType, setPreselectedSessionType] = useState<SessionType>("group");

  const openModal = (pkg: Package = "", sessionType: SessionType = "group") => {
    setPreselectedPackage(pkg);
    setPreselectedSessionType(sessionType);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <GetStartedContext.Provider
      value={{ open, preselectedPackage, preselectedSessionType, openModal, closeModal }}
    >
      {children}
    </GetStartedContext.Provider>
  );
};

export const useGetStarted = () => useContext(GetStartedContext);
