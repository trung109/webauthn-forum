import { commentSchema } from '@/helper/lib/validations';
import { useForm } from 'react-hook-form';
import { Input } from '@/helper/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Editor } from '@tinymce/tinymce-react';
import Image from 'next/image';
import React, { useRef, useState } from 'react';
import { z } from 'zod';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { MdEditor } from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';
import { revalidatePath } from 'next/cache';
import { usePathname, useRouter } from 'next/navigation';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage
} from '../ui/form';
import { User } from '@/helper/models/models';
interface Props {
  post: string;
  postId: string;
  author: User;
}

const Comment = ({ post, postId, author }: Props) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [content, setContent] = useState('');
  const form = useForm<z.infer<typeof commentSchema>>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      content: ''
    }
  });

  async function onSubmit(values: z.infer<typeof commentSchema>) {
    setIsSubmitting(true);
    try {
      const requestBody = {
        content: values.content,
        author: author.username,
        postId: postId
      };
      const response = await fetch('/api/comment/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });
      console.log(response);
      form.reset();
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
      router.refresh();
    }
  }

  return (
    <div>
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
        <h4 className="paragraph-semibold text-dark-400_light800">
          Write your comment here
        </h4>
        <Button
          className="btn light-border-2 gap-1.5 rounded-md px-4 py-2.5 text-primary-500 shadow-none"
          onClick={() => {}}
        >
          <Image
            src="/assets/icons/stars.svg"
            alt="staricon"
            width={12}
            height={12}
            className="object-contain"
          />
          Generate an AI comment
        </Button>
      </div>
      <Form {...form}>
        <form
          className="mt-6 flex w-full flex-col gap-10"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-3">
                <FormControl className="mt-3.5">
                  <>
                    <MdEditor
                      modelValue={content}
                      onChange={(value) => {
                        setContent(value);
                        field.onChange(value);
                      }}
                      toolbarsExclude={[
                        'image',
                        'task',
                        'pageFullscreen',
                        'fullscreen',
                        'catalog',
                        'htmlPreview',
                        'github',
                        'mermaid'
                      ]}
                      language="en-US"
                    />
                  </>
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <div className="flex justify-end text-white">
            <Button
              type="submit"
              className="primary-gradient w-fit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Comment;
