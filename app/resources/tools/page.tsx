import ToolsClient from './ToolsClient';
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Loan Calculator | NeedALoanToday",
  description: "Estimate your monthly payments and total loan cost with our easy-to-use Canadian loan calculator.",
  alternates: {
    canonical: "/resources/tools",
  },
};

export default function Page() {
  return <ToolsClient />;
}
