import LoansClient from './LoansClient';
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Loan Options | NeedALoanToday",
  description: "Browse personal loans by amount, purpose, credit score, type, or location to find the option that fits you.",
  alternates: {
    canonical: "/loans",
  },
};

export default function Page() {
  return <LoansClient />;
}
