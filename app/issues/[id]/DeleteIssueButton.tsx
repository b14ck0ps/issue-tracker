'use client'
import { Spinner } from '@/app/Components'
import { AlertDialog, Button, Flex } from '@radix-ui/themes'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
    const router = useRouter()
    const [error, seterror] = useState(false)
    const [isDeleting, setisDeleting] = useState(false)
    const deleteIssue = async () => {
        try {
            setisDeleting(true)
            await axios.delete(`/api/issues/${issueId}`)
            router.push('/issues')
            router.refresh()
        } catch (error) {
            setisDeleting(false)
            seterror(true)
        }
    }
    return (
        <>
            <AlertDialog.Root>
                <AlertDialog.Trigger>
                    <Button color='red' disabled={isDeleting}>
                        Delete Issue
                        {isDeleting && <Spinner />}
                    </Button>
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
                            <Button value="hard" color='red' onClick={deleteIssue}>
                                Delete
                            </Button>
                        </AlertDialog.Action>
                    </Flex>
                </AlertDialog.Content>
            </AlertDialog.Root>

            <AlertDialog.Root open={error}>
                <AlertDialog.Content>
                    <AlertDialog.Title>ERROR</AlertDialog.Title>
                    <AlertDialog.Description>
                        There was an error deleting the issue.
                    </AlertDialog.Description>
                    <Flex mt="4" gap="3">
                        <AlertDialog.Action>
                            <Button color='gray' onClick={() => seterror(false)}>Close</Button>
                        </AlertDialog.Action>
                    </Flex>
                </AlertDialog.Content>
            </AlertDialog.Root>
        </>
    )
}

export default DeleteIssueButton