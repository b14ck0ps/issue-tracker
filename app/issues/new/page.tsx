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
import ErrorMessage from '@/app/Components/ErrorMessage';
import Spinner from '@/app/Components/Spinner';


type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
    const { register, control, handleSubmit, formState: { errors } } = useForm<IssueForm>({
        resolver: zodResolver(createIssueSchema)
    });
    const router = useRouter();
    const [error, seterror] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false);

    return (
        <div className='max-w-xl'>
            {error && <Callout.Root className='mb-5' color='red'>
                <Callout.Text>{error}</Callout.Text>
            </Callout.Root>}
            <form className='space-y-3' onSubmit={handleSubmit(async (data) => {
                try {
                    setIsSubmitting(true)
                    await axios.post('/api/issues', data).then(() => {
                        router.push('/issues');
                    });
                } catch (error) {
                    setIsSubmitting(false)
                    seterror('An error occurred while creating the issue')
                }
            })}>
                <TextField.Root placeholder='Title' {...register('title')} />
                <ErrorMessage>{errors.title?.message}</ErrorMessage>

                <Controller
                    name="description"
                    control={control}
                    render={({ field }) => <SimpleMDE placeholder='Description' {...field} />}
                />
                <ErrorMessage>{errors.description?.message}</ErrorMessage>

                <Button disabled={isSubmitting} >Submit New Issue {isSubmitting && <Spinner />} </Button>
            </form>
        </div >
    )
}

export default NewIssuePage