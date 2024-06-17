import IssueStatusBadge from '@/app/Components/IssueStatusBadge'
import prisma from '@/prisma/client'
import { Card, Flex, Heading, Text } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import React from 'react'

interface IssueDetailPageProps {
    params: { id: string }
}


const IssueDetailPage = async ({ params }: IssueDetailPageProps) => {

    const issue = await prisma.issue.findUnique({ where: { id: parseInt(params.id) } })
    if (!issue) return notFound();

    return (
        <div>
            <Heading>{issue.title}</Heading>
            <Flex gap='2' my='2'>
                <IssueStatusBadge status={issue.status} />
                <Text>{issue.createdAt.toDateString()}</Text>
            </Flex>
            <Card>{issue.description}</Card>
        </div>
    )
}

export default IssueDetailPage