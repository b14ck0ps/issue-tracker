import prisma from "@/prisma/client";
import IssueSummary from "./IssueSummary";
import { IssueCharts } from "./IssueCharts";
import { Flex, Grid } from "@radix-ui/themes";
import LatestIssues from "./LatestIssues";
import { Metadata } from "next";

export default async function Home() {
  const issueCounts = {
    open: await prisma.issue.count({ where: { status: "OPEN" } }),
    inProgress: await prisma.issue.count({ where: { status: "IN_PROGRESS" } }),
    closed: await prisma.issue.count({ where: { status: "CLOSED" } }),
  };

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Flex direction="column" gap="5">
        <IssueSummary {...issueCounts} />
        <IssueCharts {...issueCounts} />
      </Flex>
      <LatestIssues />
    </Grid>
  );
}
export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Issue Tracker",
  description: "Track issues and bugs in your project",
};
