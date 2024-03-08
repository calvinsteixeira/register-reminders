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
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import reminderService from "@/api/remindersService";
import { AxiosResponse } from "axios";

import { Textarea } from "../ui/textarea";
import { Loader2, FilePlus2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { IReminder } from "@/api/remindersService";

export interface IReminderDialog {
  reminderData?: IReminder;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ReminderDialog({
  reminderData,
  open,
  onOpenChange,
}: IReminderDialog) {
  const [submitingForm, setSubmitingForm] = React.useState<boolean>(false);
  const [selectedDate, setSelectedDate] = React.useState<Date>(
    reminderData?.date || new Date()
  );

  const formSchema = z.object({
    id: z.number().optional(),
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
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    if (reminderData) {
      data.id = reminderData.id;
    }

    const result: AxiosResponse = await reminderService.createReminder({
      title: data.title,
      subtitle: data.subtitle,
      description: data.description,
      date: new Date(data.date),
    });

    resetForm();

    // setSubmitingForm(true)
    // const requestSchema: emailRequestType = {
    //   name: values.userName,
    //   message: values.userMessage,
    //   _template: 'table'
    // }
  }

  function resetForm() {
    form.reset({
      title: "",
      subtitle: "",
      description: "",
      date: "",
    });
  }

  React.useEffect(() => { resetForm() }, [open])

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
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
                      disabled={submitingForm ? true : false}
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
                      disabled={submitingForm ? true : false}
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
                      disabled={submitingForm ? true : false}
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
                      disabled={submitingForm ? true : false}
                      className={
                        form.formState.errors.subtitle ? "border-red-500" : ""
                      }
                      {...{
                        ...field,
                        value: format(
                          reminderData?.date || new Date(),
                          "yyyy-MM-dd"
                        ),
                      }}
                    />
                  </FormControl>
                  <FormMessage
                    className={form.formState.errors.date ? "text-red-500" : ""}
                  />
                </FormItem>
              )}
            />
            <div className="flex flex-row items-center gap-3 justify-start">
              <DialogClose asChild>
                <Button size={"sm"}>Cancelar</Button>
              </DialogClose>
              <Button
                size={"sm"}
                disabled={submitingForm ? true : false}
                className="bg-secondary text-secondary-foreground"
                type="submit"
              >
                {submitingForm ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                    {reminderData ? "Salvando informações" : "Criando lembrete"}
                  </>
                ) : (
                  <>
                    <FilePlus2 className="mr-2 h-4 w-4" />{" "}
                    {reminderData ? "Salvar os dados" : "Criar lembrete"}
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
