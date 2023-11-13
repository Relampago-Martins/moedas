'use client';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormField } from "@/components/ui/form";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
 
const formSchema = z.object({
  username: z.string().min(2).max(50),
  password: z.string().min(6).max(50),
})

export default function Login() {
  const [open, setOpen] = useState(true);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    // resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  return (
    <Dialog modal open={open} onOpenChange={setOpen}>
    <DialogContent
      onCloseAutoFocus={(e) => router.back()}
      onInteractOutside={(e) => e.preventDefault()}>
      <DialogHeader>
        <DialogTitle className="flex justify-center">
          Login
        </DialogTitle>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(getLogin)} className="m-6">
            <FormField 
              control={form.control} name="username"
              render={({ field }) => (
                <label>
                  <span>Username</span>
                  <input {...field} />
                </label>
              )}
              />
          </form>
        </Form>

        <DialogDescription>Não possui cadastro? 
          <Link href="/cadastro"><em className="text-blue-600"> cadastre-se</em></Link>
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  </Dialog>
  )
}

async function getLogin(values: z.infer<typeof formSchema>){
  const response = await fetch('/api/login', {
    method: 'POST',
    body: JSON.stringify({ values }),
  })
  const data = await response.json()
  console.log(data)
}
