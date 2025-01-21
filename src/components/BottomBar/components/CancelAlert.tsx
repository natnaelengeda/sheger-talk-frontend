import React, { Dispatch, SetStateAction } from 'react'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


interface AlertProps {
  open: boolean;
  setCancelOpened: Dispatch<SetStateAction<boolean>>;
  cancelChat: () => void;
}

export default function CancelAlert({ open, setCancelOpened, cancelChat }: AlertProps) {
  return (
    <AlertDialog
      open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to disconnect?
          </AlertDialogTitle>
          <AlertDialogDescription>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => setCancelOpened(false)}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={cancelChat}>
            Disconnect
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
