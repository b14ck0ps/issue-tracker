'use client'
import { AlertDialog, Button, Flex } from '@radix-ui/themes'
import axios from 'axios'
import { useRouter } from 'next/navigation'

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
    const router = useRouter()
    return (
        <AlertDialog.Root>
            <AlertDialog.Trigger>
                <Button color='red'>Delete Issue</Button>
            </AlertDialog.Trigger>
            <AlertDialog.Content>
                <AlertDialog.Title>Are you sure?</AlertDialog.Title>
                <AlertDialog.Description>
                    This will permanently delete the issue.
                </AlertDialog.Description>
                <Flex mt="4" gap="3">
                    <AlertDialog.Cancel>
                        <Button value="soft" color='gray'>Cancel</Button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action>
                        <Button value="hard" color='red' onClick={async () => {
                            await axios.delete(`/api/issues/${issueId}`)
                            router.push('/issues')
                            router.refresh()
                        }} >Delete</Button>
                    </AlertDialog.Action>
                </Flex>
            </AlertDialog.Content>
        </AlertDialog.Root>
    )
}

export default DeleteIssueButton