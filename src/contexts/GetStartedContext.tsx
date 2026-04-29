import { createContext, useContext, useState } from "react";

export type Package = "KS2" | "KS3" | "GCSE" | "";

interface GetStartedContextType {
  open: boolean;
  preselectedPackage: Package;
  openModal: (pkg?: Package) => void;
  closeModal: () => void;
}

const GetStartedContext = createContext<GetStartedContextType>({
  open: false,
  preselectedPackage: "",
  openModal: () => {},
  closeModal: () => {},
});

export const GetStartedProvider = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [preselectedPackage, setPreselectedPackage] = useState<Package>("");

  const openModal = (pkg: Package = "") => {
    setPreselectedPackage(pkg);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <GetStartedContext.Provider value={{ open, preselectedPackage, openModal, closeModal }}>
      {children}
    </GetStartedContext.Provider>
  );
};

export const useGetStarted = () => useContext(GetStartedContext);
