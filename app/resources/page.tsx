import ResourcesClient from './ResourcesClient';
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resources | NeedALoanToday",
  description: "Tools, guides, and answers to help you make an informed borrowing decision.",
  alternates: {
    canonical: "/resources",
  },
};

export default function Page() {
  return <ResourcesClient />;
}
