'use client'
import { Box, Button, TextArea, TextField } from '@radix-ui/themes'
import React from 'react'

const NewIssuePage = () => {
    return (
        <div className='max-w-xl space-y-3'>
            <TextField.Root placeholder='Title' />
            <Box>
                <TextArea size="3" placeholder="Description" />
            </Box>
            <Button>Submit New Issue</Button>
        </div>
    )
}

export default NewIssuePage