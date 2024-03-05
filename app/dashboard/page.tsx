"use client";

import React from "react";
import {
  DatePicker,
  Divider,
  ReminderCard,
  ConfirmationDialog,
  ReminderDialog
} from "@/components/index";
import { IDialog } from "@/components/content/ConfirmationDialog";
import { IReminderDialog } from "@/components/forms/ReminderDialog";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { IoMdAdd } from "react-icons/io"
import { FaSearch } from "react-icons/fa";
import { Loader2 } from "lucide-react";
import { SelectSingleEventHandler } from "react-day-picker";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import reminderService from "@/api/remindersService";
import { IReminder } from "@/api/remindersService";
import { AxiosResponse } from "axios";

type ReminderRequestSettings = {
  data: IReminder[];
  status: number | null;
  loadingRequest: boolean;
};

export default function page() {
  const [reminderRequestSettings, setReminderRequestSettings] = React.useState<ReminderRequestSettings>({
    data: [],
    status: null,
    loadingRequest: true
  });
  const [selectedDateFilter, setSelectedDateFilter] = React.useState<Date>(new Date());
  const [deleteDialogSettings, setDeleteDialogSettings] = React.useState<IDialog>({
    title: "",
    description: "",
    open: false,
    onOpenChange() { }
  });
  const [reminderDialogSettings, setReminderDialogSettings] = React.useState<IReminderDialog>({    
    open: false,
    onOpenChange() { },
  })
  const [selectedReminder, setSelectedReminder] = React.useState<IReminder>()

  const handleSelectDate: SelectSingleEventHandler = (event, day) => {
    if (day) setSelectedDateFilter(day);
  };

  async function getAllReminders() {
    const result: AxiosResponse = await reminderService.getAllReminders();

    setReminderRequestSettings({
      data: result.data,
      status: result.status,
      loadingRequest: false,
    });
  }

  async function createReminder(data: IReminder) {
    const result: AxiosResponse = await reminderService.createReminder(data)

    // TODO: Atualizar o estado conforme o retorno do create
  }

  React.useEffect(() => {
    setReminderRequestSettings((prevState) => ({
      ...prevState,
      loadingRequest: true,
    }));

    setTimeout(() => {
      getAllReminders();
    }, 2000)
  }, []);

  function handleContent(): React.ReactNode {
    if (!reminderRequestSettings.data || reminderRequestSettings.data.length == 0 && !reminderRequestSettings.loadingRequest) {
      return (
        <div className="w-full text-center mt-16">
          <p className='text-sm'>Não há dados para a data informada.</p>
        </div>
      )
    } else if (reminderRequestSettings.loadingRequest) {
      return (
        <div className=" flex w-full h-full justify-center mt-16">
          <div className='flex gap-2 items-center'>
            <p className='text-sm'>Carregando os dados</p>
            <Loader2 className="h-4 w-4 animate-spin" />
          </div>
        </div>
      )
    } else if (reminderRequestSettings.data.length > 0) {
      return (
        reminderRequestSettings.data.map((reminder, index) => (
          <ReminderCard
            title={reminder.title}
            subtitle={reminder.subtitle}
            description={reminder.description}
            primaryAction={() => {
              setReminderDialogSettings((prevStates) => ({
                ...prevStates,
                open: true,
                reminderData: reminder
              }))
            }}
            secondaryAction={() => {
              setDeleteDialogSettings((prevState) => ({
                ...prevState,
                title: "Confirmar exclusão",
                description:
                  "Essa ação não poderá ser revertida, deseja continuar?",
                open: true,
              }));
            }}
          />
        ))
      )
    }
  }

  return (
    <main className="w-screen h-screen background">
      <ConfirmationDialog
        open={deleteDialogSettings.open}
        onOpenChange={() => {
          setDeleteDialogSettings((prevState) => ({
            ...prevState,
            open: !deleteDialogSettings.open,
          }));
        }}
        title={deleteDialogSettings.title}
        description={deleteDialogSettings.description}
      />
      <ReminderDialog reminderData={reminderDialogSettings.reminderData} open={reminderDialogSettings.open} onOpenChange={() => {
        setReminderDialogSettings((prevState) => ({
          ...prevState,
          open: !reminderDialogSettings.open,
        }));
      }} />
      <h1 className="text-lg font-bold text-secondary mt-12">
        Register Reminder
      </h1>
      <div className="w-full h-full mt-16 flex flex-col">
        <div className="space-y-4">
          <span className="text-sm text-secondary">
            Selecione uma data para filtrar
          </span>
          <div className="flex gap-2">
            <DatePicker
              selected={selectedDateFilter}
              onSelect={handleSelectDate}
              disabled={reminderRequestSettings.loadingRequest}
            />
            <Button
              disabled={reminderRequestSettings.loadingRequest}
              className="bg-secondary"
              size={"icon"}
            >
              {reminderRequestSettings.loadingRequest ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <FaSearch />
              )}
            </Button>
          </div>
          <Button onClick={() => {
            setReminderDialogSettings((prevStates) => ({
              ...prevStates,
              open: !reminderDialogSettings.open
            }))
          }} variant={"ghost"} className='text-secondary gap-2 p-0' disabled={reminderRequestSettings.loadingRequest} size={"sm"}>
            <IoMdAdd className='text-xl' />Adicionar novo lembrete
          </Button>
          <Divider />
        </div>
        <div className="flex flex-col gap-4 mt-4">
          <div className="flex flex-col gap-0.5 text-secondary">
            <h2>Meus lembretes</h2>
          </div>
          {handleContent()}
        </div>
      </div>
    </main>
  );
}
