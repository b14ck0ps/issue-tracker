'use client'
import { Button, Callout, Text, TextField } from '@radix-ui/themes';
import "easymde/dist/easymde.min.css";
import { Controller, useForm } from 'react-hook-form';
import SimpleMDE from "react-simplemde-editor";
import axios from "axios";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod'
import { createIssueSchema } from '@/app/api/ValidationSchema';
import { z } from 'zod'


type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
    const { register, control, handleSubmit, formState: { errors } } = useForm<IssueForm>({
        resolver: zodResolver(createIssueSchema)
    });
    const router = useRouter();
    const [error, seterror] = useState('')
    return (
        <div className='max-w-xl'>
            {error && <Callout.Root className='mb-5' color='red'>
                <Callout.Text>{error}</Callout.Text>
            </Callout.Root>}
            <form className='space-y-3' onSubmit={handleSubmit(async (data) => {
                try {
                    await axios.post('/api/issues', data).then(() => {
                        router.push('/issues');
                    });
                } catch (error) {
                    seterror('An error occurred while creating the issue')
                }
            })}>
                <TextField.Root placeholder='Title' {...register('title')} />
                {errors.title && <Text as='p' color='red'>{errors.title.message}</Text>}
                <Controller
                    name="description"
                    control={control}
                    render={({ field }) => <SimpleMDE placeholder='Description' {...field} />}
                />
                {errors.description && <Text as='p' color='red'>{errors.description.message}</Text>}
                <Button>Submit New Issue</Button>
            </form>
        </div>
    )
}

export default NewIssuePage