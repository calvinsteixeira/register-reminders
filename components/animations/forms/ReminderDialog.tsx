import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { IReminder } from "@/api/remindersService"


export interface IReminderDialog {
  reminderData?: IReminder
  open: boolean,
  onOpenChange: (open: boolean) => void
}

export default function ReminderDialog({ reminderData, open, onOpenChange }: IReminderDialog) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-start">{reminderData ? 'Editar lembrete' : 'Criar novo lembrete'}</DialogTitle>
        </DialogHeader>
        <DialogFooter className="flex flex-row gap-3 justify-start">
          <DialogClose asChild>
            <Button type="submit">Cancelar</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button className='bg-secondary text-secondary-foreground' type="submit">{reminderData ? 'Salvar alterações' : 'Criar lembrete'}</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
