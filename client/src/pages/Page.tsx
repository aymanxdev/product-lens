import { ReactNode } from "react";

interface PageProps {
  children: ReactNode | ReactNode[];
}

const Page = ({ children }: PageProps) => {
  return <div>{children}</div>;
};

export default Page;
