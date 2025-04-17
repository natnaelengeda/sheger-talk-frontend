import React, { Dispatch, SetStateAction } from 'react'

// Shadcn
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  // AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

// Components
import LoadingSpinner from '@/components/LoadingSpinner';


interface AlertProps {
  open: boolean;
  setCancelOpened: Dispatch<SetStateAction<boolean>>;
  cancelChat: () => void;
  cancelLoading: boolean;
}

export default function CancelAlert({ open, setCancelOpened, cancelChat, cancelLoading }: AlertProps) {
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
            onClick={cancelChat}
            disabled={cancelLoading}
            className='flex flex-row items-center justify-center gap-2'>
            {
              cancelLoading && <LoadingSpinner />
            }
            {
              cancelLoading ? "Disconnecting..." : "Disconnect"
            }

          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
