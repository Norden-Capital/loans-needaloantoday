import ComparisonsClient from './ComparisonsClient';
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Loan Comparisons — Canada | NeedALoanToday",
  description: "Side-by-side comparisons to help you choose the right borrowing option in Canada.",
  alternates: {
    canonical: "/resources/comparisons",
  },
};

export default function Page() {
  return <ComparisonsClient />;
}
