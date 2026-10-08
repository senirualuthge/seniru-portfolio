import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseStudyView from "@/components/case-study/CaseStudyView";
import { caseStudies } from "@/data/case-studies";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return Object.keys(caseStudies).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudies[slug];
  if (!study) return {};

  return {
    title: `${study.title} — Case Study | Seniru Aluthge`,
    description: study.summary,
    openGraph: {
      title: `${study.title} — Seniru Aluthge`,
      description: study.summary,
      type: "article",
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const study = caseStudies[slug];
  if (!study) notFound();

  return <CaseStudyView study={study} />;
}
