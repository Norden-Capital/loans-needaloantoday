import LoansByCreditScoreClient from './LoansByCreditScoreClient';
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Loans by Credit Score | NeedALoanToday",
  description: "Find loans that match your credit profile. Canadian lenders offer options for every credit range, from excellent to poor.",
  alternates: {
    canonical: "/loans/by-credit-score",
  },
};

export default function Page() {
  return <LoansByCreditScoreClient />;
}
