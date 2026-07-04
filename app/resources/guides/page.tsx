import GuidesClient from './GuidesClient';
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Canadian Loan Guides | NeedALoanToday",
  description: "Comprehensive guides to help you navigate the personal loan process in Canada.",
  alternates: {
    canonical: "/resources/guides",
  },
};

export default function Page() {
  return <GuidesClient />;
}
