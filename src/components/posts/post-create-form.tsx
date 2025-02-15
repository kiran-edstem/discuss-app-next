'use client'

import { createPost } from "@/actions"
import { Button, Input, Popover, PopoverContent, PopoverTrigger, Textarea } from "@nextui-org/react"
import { useActionState } from "react"

interface PostCreateFormProps {
    slug: string;
}

export default function PostCreateForm({ slug }: PostCreateFormProps) {
    const [formState, action, isPending] = useActionState(
        createPost.bind(null, slug), {
        errors: {}
    })
    return <Popover placement="left">
        <PopoverTrigger>
            <Button color="primary">
                Create a Post
            </Button>
        </PopoverTrigger>
        <PopoverContent>
            <form action={action}>
                <div className="flex flex-col gap-4 p-4 w-80">
                    <h3 className="text-lg">
                        Create a Post
                    </h3>
                    <Input
                        name="title"
                        label="Title"
                        labelPlacement="outside"
                        placeholder="Title"
                        isInvalid={!!formState.errors.title}
                        errorMessage={formState.errors.title?.join(', ')}
                    />
                    <Textarea
                        name="content"
                        label="Content"
                        labelPlacement="outside"
                        placeholder="Content"
                        isInvalid={!!formState.errors.title}
                        errorMessage={formState.errors.title?.join(', ')}
                    />
                    {
                        formState.errors._form ? <div className="rounded p-2 bg-red-200 border border-red-400">
                            {formState.errors._form?.join(', ')}
                        </div> : null
                    }
                    <Button type='submit' isLoading={isPending}>
                        Submit
                    </Button>
                </div>
            </form>
        </PopoverContent>
    </Popover>
}