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
import { Label } from "@/components/ui/label";

export interface IDialog {
  description: string;
  title?: string;  
  open: boolean,
  onOpenChange: (open: boolean) => void
}

export default function ConfirmationDialog({
  description,
  title,
  open,
  onOpenChange
}: IDialog) {
  return (
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
            <Button className="bg-destructive" size={"sm"} type="submit">
              Confirmar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
