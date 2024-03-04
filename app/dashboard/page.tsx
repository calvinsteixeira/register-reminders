"use client";

import React from "react";
import {
  DatePicker,
  Divider,
  ReminderCard,
  ConfirmationDialog,
} from "@/components/index";
import { IDialog } from "@/components/content/ConfirmationDialog";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
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

const reminderRequestSettingsDefaultValues: ReminderRequestSettings = {
  data: [],
  status: null,
  loadingRequest: true,
};
const dialogDefaultValues: IDialog = {
  title: "",
  description: "",
  open: false,
  onOpenChange(open) { },
};

export default function page() {
  const [reminderRequestSettings, setReminderRequestSettings] =
    React.useState<ReminderRequestSettings>(
      reminderRequestSettingsDefaultValues
    );
  const [selectedDateFilter, setSelectedDateFilter] = React.useState<Date>(
    new Date()
  );
  const [dialogSettings, setDialogSettings] =
    React.useState<IDialog>(dialogDefaultValues);

  const handleSelectDate: SelectSingleEventHandler = (event, day) => {
    if (day) setSelectedDateFilter(day);
  };

  React.useEffect(() => {
    setReminderRequestSettings((prevState) => ({
      ...prevState,
      loadingRequest: true,
    }));

    async function get() {
      const result: AxiosResponse = await reminderService.getAllReminders();

      setReminderRequestSettings({
        data: result.data,
        status: result.status,
        loadingRequest: false,
      });
    }

    setTimeout(() => {
      get();
    }, 2000)
  }, []);

  function handleContent(): React.ReactNode {
    if (reminderRequestSettings.status || reminderRequestSettings.data.length == 0 && !reminderRequestSettings.loadingRequest) {
      return (
        <div className="w-full text-center mt-16">
          <p>Não há dados</p>
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
            // primaryAction={}
            secondaryAction={() => {
              setDialogSettings((prevState) => ({
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
        open={dialogSettings.open}
        onOpenChange={() => {
          setDialogSettings((prevState) => ({
            ...prevState,
            open: !dialogSettings.open,
          }));
        }}
        title={dialogSettings.title}
        description={dialogSettings.description}
      />
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
