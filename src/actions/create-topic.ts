'use server'
import { auth } from '@/auth';
import { z } from 'zod'
import type { Topic } from '@prisma/client';
import { db } from '@/db';
import paths from '@/path';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';



const createTopicSchema = z.object({
    name: z
        .string()
        .min(3)
        .regex(/^[a-z-]+$/,
            { message: 'Must be lower case letters or dashes without spaces' }
        ),
    description: z.string().min(10)
});

interface CreateTopicFromState {
    errors: {
        name?: string[],
        description?: string[],
        _form?: string[]
    }
}


export async function createTopic(formState: CreateTopicFromState, formData: FormData): Promise<CreateTopicFromState> {
    await new Promise((resolve) => setTimeout(resolve, 2500));
    const result = createTopicSchema.safeParse({
        name: formData.get('name'),
        description: formData.get('description')
    })
    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors
        }
    }
    const session = await auth();
    if (!session || !session?.user) {
        return {
            errors: {
                _form: ['You mus be signed in to create a post']
            }
        }
    }
    let topic: Topic
    try {
        topic = await db.topic.create({
            data: {
                slug: result.data.name,
                description: result.data.description
            }
        })


    } catch (err: unknown) {
        if (err instanceof Error) {
            return {
                errors: {
                    _form: [err.message]
                }
            }
        } else {
            return {
                errors: {
                    _form: ['Something went wrong']
                }
            }
        }
    }

    revalidatePath("/");
    redirect(paths.topicShow(topic.slug))

}