import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import authOptions from "../auth/AuthOptions";
import { issueSchema } from "../ValidationSchema";

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const validation = issueSchema.safeParse(body);

    if (!validation.success)
        return NextResponse.json(validation.error.format(), { status: 400 });
    const newIssue = await prisma.issue.create({ data: { title: body.title, description: body.description } });
    return NextResponse.json(newIssue, { status: 201 });
}