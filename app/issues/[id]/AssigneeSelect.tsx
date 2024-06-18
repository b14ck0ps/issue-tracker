import prisma from '@/prisma/client'
import { Select } from '@radix-ui/themes'
import React from 'react'

const AssigneeSelect = async () => {

    const users = await prisma.user.findMany()

    return (
        <Select.Root>
            <Select.Trigger placeholder='Assing...' />
            <Select.Content>
                <Select.Group>
                    <Select.Label>Assignee</Select.Label>
                    {users.map(user => (
                        <Select.Item key={user.id} value={user.id}>{user.name}</Select.Item>
                    ))}
                </Select.Group>
            </Select.Content>
        </Select.Root>
    )
}

export default AssigneeSelect