import React from 'react'

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogTrigger
} from "@/components/ui/dialog";
import reminderService from "@/api/remindersService";
import AlertContainer from "./AlertContainer";
import { AlertProps } from "./AlertContainer";
import LoaderScreen from './LoaderScreen';

export interface IDialog {
  reminderId: string | undefined;
  description: string;
  title?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void
  onReminderDeleted: () => void
}

export default function ConfirmationDialog({
  reminderId,
  description,
  title,
  open,
  onOpenChange,
  onReminderDeleted,
}: IDialog) {
  const [alertSettings, setAlertSettings] = React.useState<AlertProps>({
    visible: false,
    type: 'success',
    title: '',
    description: ''
  })

  const [loaderOpen, setLoaderOpen] = React.useState<boolean>(false)

  function deleteReminder(id: string) {
    setLoaderOpen(true)

    setTimeout(async () => {

      const result = await reminderService.deleteReminder(id)

      if (result.status == 200) {
        setLoaderOpen(false)
        setAlertSettings({
          visible: true,
          type: 'success',
          title: 'Lembrete removido',
          description: 'O lembrete foi removido com sucesso!'
        })

        setTimeout(() => {
          setAlertSettings({
            visible: false,
            type: 'success',
            title: '',
            description: ''
          })
        }, 3000)

        onReminderDeleted()
      } else {
        setLoaderOpen(false)
        setAlertSettings({
          visible: true,
          type: 'destructive',
          title: 'Erro',
          description: 'Não foi possível remover o lembrete, tente novamente.'
        })

        setTimeout(() => {
          setAlertSettings({
            visible: false,
            type: 'success',
            title: '',
            description: ''
          })
        }, 1500)

        onReminderDeleted()
      }
    }, 4000)
  }

  return (
    <>
      <LoaderScreen
        show={loaderOpen}
        label='Deletando lembrete'
      />
      <AlertContainer
        visible={alertSettings.visible}
        description={alertSettings.description}
        title={alertSettings.title}
        type={alertSettings.type}
      />
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogTrigger></DialogTrigger>
        <DialogContent className="max-w-[90%]">
          <DialogHeader>
            <div className='flex flex-col text-start gap-2'>
              {title && <DialogTitle>{title}</DialogTitle>}
              <DialogDescription>{description}</DialogDescription>
            </div>

          </DialogHeader>
          <DialogFooter className="flex flex-row gap-3 justify-start">
            <DialogClose asChild>
              <Button
                className="bg-primay"
                variant={"outline"}
                size={"sm"}
              >
                Cancelar
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button onClick={() => {
                if (reminderId) {
                  deleteReminder(reminderId)
                }
              }} className="bg-destructive" size={"sm"} type="submit">
                Confirmar
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
