'use client';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useRouter } from 'next/navigation';
import { useState } from "react";
 
export default function Login() {
  const [open, setOpen] = useState(true);
  const router = useRouter();

  return (
    <Dialog modal open={open} onOpenChange={setOpen}>
    <DialogContent
      onCloseAutoFocus={(e) => router.back()}
      onInteractOutside={(e) => e.preventDefault()}>
      <DialogHeader>
        <DialogTitle className="flex justify-center">
          Login
        </DialogTitle>
      </DialogHeader>
    </DialogContent>
  </Dialog>
  )
}