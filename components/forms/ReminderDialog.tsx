'use client'

import React from 'react'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import DatePicker from '../inputs/DatePicker';
import { SelectSingleEventHandler } from "react-day-picker";

import { Textarea } from "../ui/textarea";
import { Loader2, Send, Check } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input"

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog"
import { IReminder } from "@/api/remindersService"


export interface IReminderDialog {
  reminderData?: IReminder
  open: boolean,
  onOpenChange: (open: boolean) => void
}

export default function ReminderDialog({ reminderData, open, onOpenChange }: IReminderDialog) {
  const [submitingForm, setSubmitingForm] = React.useState<boolean>(false);
  const [selectedDate, setSelectedDate] = React.useState<Date>(reminderData?.date || new Date)

  const formSchema = z.object({
    title: z.string().min(2, { message: "O título deve ter pelo menos 2 caracteres" }),
    subtitle: z.string().min(2, { message: "O subtítulo deve ter pelo menos 2 caracteres." }),
    description: z.string().min(1, { message: "A descrição não pode ser vazia" }).max(80, { message: "A mensagem precisa conter no máximo 80 caracteres" }),
    date: z.date().min(new Date(new Date()), { message: "Datas passadas são inválidas" })
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      subtitle: "",
      description: "",
      date: new Date()
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // setSubmitingForm(true)
    // const requestSchema: emailRequestType = {
    //   name: values.userName,
    //   message: values.userMessage,
    //   _template: 'table'
    // }
  }

  const handleSelectDate: SelectSingleEventHandler = (event, day) => {
    if (day) setSelectedDate(day);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[90%]">
        <DialogHeader>
          <DialogTitle className="text-start">{reminderData ? 'Editar lembrete' : 'Criar novo lembrete'}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 md:max-w-[45%] lg:max-w-[30%]">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={submitingForm ? true : false}
                      placeholder="informe o título"
                      className={
                        form.formState.errors.title ? "border-red-500" : ""
                      }
                      {...field}
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
                      {...field}
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
                        form.formState.errors.description ? "border-red-500" : ""
                      }
                      {...field}
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
                    <DatePicker
                      selected={selectedDate}
                      onSelect={handleSelectDate}
                    />
                    {/* <Input
                      disabled={submitingForm ? true : false}
                      placeholder="informe o subtítulo"
                      className={
                        form.formState.errors.subtitle ? "border-red-500" : ""
                      }
                      {...field}
                    /> */}
                  </FormControl>
                  <FormMessage
                    className={
                      form.formState.errors.date ? "text-red-500" : ""
                    }
                  />
                </FormItem>
              )}
            />
            <div className='flex flex-row items-center gap-3 justify-start'>
            <DialogClose asChild>
              <Button size={'sm'}>Cancelar</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button size={'sm'} disabled={submitingForm ? true : false} className='bg-secondary text-secondary-foreground' type="submit">{submitingForm ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> {reminderData ? 'Salvando informações' : 'Criando lembrete'}
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" /> {reminderData ? 'Salvar os dados' : 'Criar lembrete'}
                </>
              )}</Button>
            </DialogClose>
            </div>            
          </form>
        </Form>        
      </DialogContent>
    </Dialog>
  )
}
