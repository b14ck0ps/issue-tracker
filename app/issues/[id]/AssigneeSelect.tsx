'use client'
import { User } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import axios from 'axios'
import { useEffect, useState } from 'react'

const AssigneeSelect = async () => {

    const [users, setusers] = useState<User[]>([])

    useEffect(() => {
        const fetchUsers = async () => {
            await axios.get('/api/users').then(res => {
                setusers(res.data)
            })
        }
        fetchUsers()
    }, [])

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