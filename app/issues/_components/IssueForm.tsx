'use client'
import { ErrorMessage } from '@/app/Components';
import { issueSchema } from '@/app/api/ValidationSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Issue } from '@prisma/client';
import { Button, Callout, Spinner, TextField } from '@radix-ui/themes';
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import SimpleMDE from "react-simplemde-editor";
import { z } from 'zod';


type IssueFormData = z.infer<typeof issueSchema>;

const IssueForm = ({ issue }: { issue?: Issue }) => {
    const { register, control, handleSubmit, formState: { errors } } = useForm<IssueFormData>({
        resolver: zodResolver(issueSchema)
    });
    const router = useRouter();
    const [error, seterror] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = async (data: any) => {
        try {
            setIsSubmitting(true)
            if (issue)
                await axios.patch(`/api/issues/${issue.id}`, data)
            else
                await axios.post('/api/issues', data)
            router.push('/issues');
            router.refresh()
        } catch (error) {
            setIsSubmitting(false)
            seterror('An error occurred while creating the issue')
        }
    }

    return (
        <div className='max-w-xl'>
            {error && <Callout.Root className='mb-5' color='red'>
                <Callout.Text>{error}</Callout.Text>
            </Callout.Root>}
            <form className='space-y-3' onSubmit={handleSubmit(onSubmit)}>
                <TextField.Root defaultValue={issue?.title} placeholder='Title' {...register('title')} />
                <ErrorMessage>{errors.title?.message}</ErrorMessage>

                <Controller
                    name="description"
                    control={control}
                    defaultValue={issue?.description}
                    render={({ field }) => <SimpleMDE placeholder='Description' {...field} />}
                />
                <ErrorMessage>{errors.description?.message}</ErrorMessage>

                <Button disabled={isSubmitting} >{issue ? 'Update Issue' : 'Submit New Issue'} {isSubmitting && <Spinner />} </Button>
            </form>
        </div >
    )
}

export default IssueForm