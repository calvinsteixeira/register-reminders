"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import reminderService from "@/api/remindersService";
import { AxiosResponse } from "axios";

import { Textarea } from "../ui/textarea";
import { FilePlus2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { AlertContainer, LoaderScreen } from "../";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { IReminder } from "@/api/remindersService";
import { AlertProps } from "../content/AlertContainer";

export interface IReminderDialog {
  reminderData?: IReminder | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onFormSubmited: () => void;
}

export default function ReminderDialog({
  reminderData,
  open,
  onOpenChange,
  onFormSubmited,
}: IReminderDialog) {
  const [alertSettings, setAlertSettings] = React.useState<AlertProps>({
    visible: false,
    type: "success",
    title: "",
    description: "",
  });

  const [loaderOpen, setLoaderOpen] = React.useState<boolean>(false);

  const formSchema = z.object({
    id: z.string().optional(),
    title: z.string().min(1, { message: "Campo obrigatório" }),
    subtitle: z.string().optional(),
    description: z.string().optional(),
    date: z.string().refine((value) => {
      if (!value) {
      } else {
        let selectedDate: Date | String = format(value, "dd/MM/yyyy", {
          locale: ptBR,
        });
        let today: Date | String = format(new Date(), "dd/MM/yyyy", {
          locale: ptBR,
        });
        if (selectedDate >= today) {
          return true;
        } else {
          return false;
        }
      }
    }, "Selecione uma data válida"),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: reminderData?.title || "",
      subtitle: reminderData?.subtitle || "",
      description: reminderData?.description || "",
      date: format(new Date(), "yyyy-MM-dd"),
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    const dateObject = parseISO(data.date);

    data.date = format(dateObject, "dd-MM-yyyy", { locale: ptBR });

    console.log(data);
    return;

    onOpenChange(false);
    setLoaderOpen(true);

    setTimeout(async () => {
      const result: AxiosResponse = await reminderService.createReminder({
        id: reminderData ? reminderData.id : undefined,
        title: data.title,
        subtitle: data.subtitle,
        description: data.description,
        date: new Date(data.date),
      });

      if (result) {
        setLoaderOpen(false);
        setAlertSettings({
          visible: true,
          type: "success",
          title: "Sucesso!",
          description: `O lembrete foi ${
            reminderData ? "alterado" : "criado"
          } com sucesso!`,
        });

        setTimeout(() => {
          setAlertSettings({
            visible: false,
            type: "success",
            title: "",
            description: "",
          });
        }, 3000);

        onFormSubmited();
      } else {
        let description = reminderData
          ? "Não foi possível salvar os dados do lembrete"
          : "Não foi possível criar o lembrete";
        setLoaderOpen(false);
        setAlertSettings({
          visible: true,
          type: "destructive",
          title: "Erro",
          description: `${description}, tente novamente`,
        });

        setTimeout(() => {
          setAlertSettings({
            visible: false,
            type: "success",
            title: "",
            description: "",
          });
        }, 3000);

        onFormSubmited();
      }
      resetForm();
    }, 4000);
  }

  function resetForm() {
    form.reset({
      title: "",
      subtitle: "",
      description: "",
      date: "",
    });
  }

  React.useEffect(() => {
    resetForm();
  }, [open]);

  return (
    <>
      <LoaderScreen
        show={loaderOpen}
        label={`${reminderData ? "Alterando" : "Criando"} lembrete`}
      />
      <AlertContainer
        visible={alertSettings.visible}
        description={alertSettings.description}
        title={alertSettings.title}
        type={alertSettings.type}
      />
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-[90%]">
          <DialogHeader>
            <DialogTitle className="text-start">
              {reminderData ? "Editar lembrete" : "Criar novo lembrete"}
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 md:max-w-[45%] lg:max-w-[30%]"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        autoFocus={true}
                        placeholder="informe o título"
                        className={
                          form.formState.errors.title ? "border-red-500" : ""
                        }
                        {...{ ...field, value: reminderData?.title }}
                      />
                    </FormControl>
                    <FormMessage
                      className={
                        form.formState.errors.title ? "text-red-500" : ""
                      }
                    />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="subtitle"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="informe o subtítulo"
                        className={
                          form.formState.errors.subtitle ? "border-red-500" : ""
                        }
                        {...{ ...field, value: reminderData?.subtitle }}
                      />
                    </FormControl>
                    <FormMessage
                      className={
                        form.formState.errors.subtitle ? "text-red-500" : ""
                      }
                    />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="informe a descrição"
                        className={
                          form.formState.errors.description
                            ? "border-red-500"
                            : ""
                        }
                        {...{ ...field, value: reminderData?.description }}
                      />
                    </FormControl>
                    <FormMessage
                      className={
                        form.formState.errors.description ? "text-red-500" : ""
                      }
                    />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="date"
                        min={new Date().toJSON().slice(0, 10)}
                        className={
                          form.formState.errors.subtitle ? "border-red-500" : ""
                        }
                        {...{
                          ...field,
                        }}
                      />
                    </FormControl>
                    <FormMessage
                      className={
                        form.formState.errors.date ? "text-red-500" : ""
                      }
                    />
                  </FormItem>
                )}
              />
              <DialogFooter className="flex flex-row items-center gap-3 justify-start">
                <DialogClose asChild>
                  <Button size={"sm"}>Cancelar</Button>
                </DialogClose>
                <Button
                  size={"sm"}
                  className="bg-secondary text-secondary-foreground"
                  type="submit"
                >
                  <>
                    <FilePlus2 className="mr-2 h-4 w-4" />{" "}
                    {reminderData ? "Salvar os dados" : "Criar lembrete"}
                  </>
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
