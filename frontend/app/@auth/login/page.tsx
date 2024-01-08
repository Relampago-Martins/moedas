'use client';
import LoginForm from "@/components/LoginForm";
import RegisterForm from "@/components/RegisterForm";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useState } from "react";
 
export default function Login() {
  const [open, setOpen] = useState(true);
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  return (
  <Dialog modal open={open} onOpenChange={setOpen}>
    <DialogContent
      className="px-10"
      onCloseAutoFocus={(e) => router.back()}
      onInteractOutside={(e) => e.preventDefault  ()}>
        <DialogHeader>
          <DialogTitle className="flex justify-center text-2xl">
            Moedas
          </DialogTitle>
        </DialogHeader>
        {
          isLogin ? (<LoginForm/>) : (<RegisterForm/>)
        }
        <DialogDescription>
            {
              isLogin ? ' Não possui cadastro?' : ''
            }
          <Link href="#" onClick={() => setIsLogin(!isLogin)}><em className="text-blue-600">
            {
              isLogin ? ' Cadastre-se' : ' Voltar'
            }
          </em></Link>
        </DialogDescription>
    </DialogContent>
  </Dialog>
  )
}


