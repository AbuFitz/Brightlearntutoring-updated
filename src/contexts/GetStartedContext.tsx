import { createContext, useContext, useState } from "react";
import type { SessionType } from "@/data/pricing";

export type Package = "KS2" | "KS3" | "GCSE" | "";

interface GetStartedContextType {
  open: boolean;
  preselectedPackage: Package;
  preselectedSessionType: SessionType;
  preselectedSupportType: string;
  openModal: (pkg?: Package, sessionType?: SessionType, supportType?: string) => void;
  closeModal: () => void;
}

const GetStartedContext = createContext<GetStartedContextType>({
  open: false,
  preselectedPackage: "",
  preselectedSessionType: "group",
  preselectedSupportType: "",
  openModal: () => {},
  closeModal: () => {},
});

export const GetStartedProvider = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [preselectedPackage, setPreselectedPackage] = useState<Package>("");
  const [preselectedSessionType, setPreselectedSessionType] = useState<SessionType>("group");
  const [preselectedSupportType, setPreselectedSupportType] = useState<string>("");

  const openModal = (pkg: Package = "", sessionType: SessionType = "group", supportType: string = "") => {
    setPreselectedPackage(pkg);
    setPreselectedSessionType(sessionType);
    setPreselectedSupportType(supportType);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <GetStartedContext.Provider
      value={{ open, preselectedPackage, preselectedSessionType, preselectedSupportType, openModal, closeModal }}
    >
      {children}
    </GetStartedContext.Provider>
  );
};

export const useGetStarted = () => useContext(GetStartedContext);
