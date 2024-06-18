import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { issueSchema } from "../../ValidationSchema";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
    const body = await req.json();
    const validation = issueSchema.safeParse(body);

    if (!validation.success)
        return NextResponse.json(validation.error.format(), { status: 400 });

    const issue = await prisma.issue.findUnique({ where: { id: parseInt(params.id) } });
    if (!issue) return NextResponse.json({ error: 'Issue not found' }, { status: 404 });

    const updatedIssue = await prisma.issue.update({ where: { id: parseInt(params.id) }, data: { title: body.title, description: body.description } });

    return NextResponse.json(updatedIssue);
}

export async function DELETE({ params }: { params: { id: string } }) {
    const issue = await prisma.issue.findUnique({ where: { id: parseInt(params.id) } });
    if (!issue) return NextResponse.json({ error: 'Issue not found' }, { status: 404 });

    await prisma.issue.delete({ where: { id: parseInt(params.id) } });

    return NextResponse.json({ message: 'Issue deleted' });
}