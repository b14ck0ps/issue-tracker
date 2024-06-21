import prisma from "@/prisma/client";
import { Issue } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { patchIssueSchema } from "../../ValidationSchema";
import authOptions from "../../auth/AuthOptions";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body: Issue = await req.json();
  const validation = patchIssueSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const { assigneToUserId, title, description, status } = body;

  if (assigneToUserId) {
    const user = await prisma.user.findUnique({
      where: { id: assigneToUserId },
    });
    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue)
    return NextResponse.json({ error: "Issue not found" }, { status: 404 });

  const updatedIssue = await prisma.issue.update({
    where: { id: parseInt(params.id) },
    data: { title, description, assigneToUserId, status },
  });

  return NextResponse.json(updatedIssue);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue)
    return NextResponse.json({ error: "Issue not found" }, { status: 404 });

  await prisma.issue.delete({ where: { id: parseInt(params.id) } });

  return NextResponse.json({ message: "Issue deleted" });
}
