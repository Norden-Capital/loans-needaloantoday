import FAQClient from './FAQClient';
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | NeedALoanToday",
  description: "Find answers to common questions about personal loans in Canada, eligibility, rates, applications, and repayment.",
  alternates: {
    canonical: "/resources/faq",
  },
};

export default function Page() {
  return <FAQClient />;
}
