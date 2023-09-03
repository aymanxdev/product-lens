import { ReactNode } from "react";

interface PageProps {
  children: ReactNode | ReactNode[];
}

const Page = ({ children }: PageProps) => {
  return <>{children}</>;
};

export default Page;
