import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const users = await prisma.user.findMany()
    if (!users) return NextResponse.json({ error: 'No users found' }, { status: 404 })

    return NextResponse.json(users)
}