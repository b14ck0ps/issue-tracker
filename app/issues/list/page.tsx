import { IssueStatusBadge, Link } from "@/app/Components";
import prisma from "@/prisma/client";
import { Issue, Status } from "@prisma/client";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import { Table } from "@radix-ui/themes";
import NextLink from "next/link";
import IssueActions from "./IssueActions";

const IssuesPage = async ({
  searchParams,
}: {
  searchParams: { status: Status; sortBy: keyof Issue };
}) => {
  const statuses = Object.values(Status);
  const columns: { label: string; value: keyof Issue; className?: string }[] = [
    { label: "Issue", value: "title" },
    { label: "Status", value: "status", className: "hidden md:table-cell" },
    { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
  ];

  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const sortBy = columns
    .map((columns) => columns.value)
    .includes(searchParams.sortBy)
    ? { [searchParams.sortBy]: "asc" }
    : undefined;

  const issues = await prisma.issue.findMany({
    where: {
      status,
    },
    orderBy: sortBy,
  });

  return (
    <>
      <IssueActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell key={column.value}>
                <NextLink
                  href={{
                    query: { ...searchParams, sortBy: column.value },
                  }}
                >
                  {column.label}
                </NextLink>
                {column.value === searchParams.sortBy && (
                  <ArrowUpIcon className="inline" />
                )}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>
                  {issue.title}
                  <div className="block md:hidden">
                    {" "}
                    <IssueStatusBadge status={issue.status} />{" "}
                  </div>
                </Link>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  );
};
export const dynamic = "force-dynamic";
export default IssuesPage;
