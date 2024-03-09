"use client";

import React from "react";
import {
  DatePicker,
  Divider,
  ReminderCard,
  ConfirmationDialog,
  ReminderDialog,
} from "@/components/index";
import { IDialog } from "@/components/content/ConfirmationDialog";
import { IReminderDialog } from "@/components/forms/ReminderDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CalendarIcon } from "lucide-react";
import { IoMdAdd } from "react-icons/io";
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
  const [reminderRequestSettings, setReminderRequestSettings] =
    React.useState<ReminderRequestSettings>({
      data: [],
      status: null,
      loadingRequest: true,
    });
  const [selectedDateFilter, setSelectedDateFilter] = React.useState<string>(format(new Date(), 'yyyy-MM-dd'));
  const [deleteDialogSettings, setDeleteDialogSettings] =
    React.useState<IDialog>({
      title: "",
      reminderId: "",
      description: "",
      open: false,
      onOpenChange() { },
      onReminderDeleted: getAllReminders
    });
  const [reminderDialogSettings, setReminderDialogSettings] =
    React.useState<IReminderDialog>({
      open: false,
      onOpenChange() {},
      onFormSubmited: getAllReminders
    });

  function getAllReminders() {
    setReminderRequestSettings((prevState) => ({
      ...prevState,
      loadingRequest: true,
    }));

    setTimeout(async () => {
      const result: AxiosResponse = await reminderService.getAllReminders();

      setReminderRequestSettings({
        data: result.data,
        status: result.status,
        loadingRequest: false,
      });
    }, 2000)
  }

  React.useEffect(() => {
    getAllReminders();
  }, []);

  function handleContent(): React.ReactNode {
    if (
      !reminderRequestSettings.data ||
      (reminderRequestSettings.data.length == 0 &&
        !reminderRequestSettings.loadingRequest)
    ) {
      return (
        <div className="w-full text-center mt-16">
          <p className="text-sm">Não há dados para a data informada.</p>
        </div>
      );
    } else if (reminderRequestSettings.loadingRequest) {
      return (
        <div className=" flex w-full h-full justify-center mt-16">
          <div className="flex gap-2 items-center">
            <p className="text-sm">Carregando os dados</p>
            <Loader2 className="h-4 w-4 animate-spin" />
          </div>
        </div>
      );
    } else if (reminderRequestSettings.data.length > 0) {
      return reminderRequestSettings.data.map((reminder, index) => (
        <ReminderCard
          key={index}
          title={reminder.title}
          subtitle={reminder.subtitle}
          description={reminder.description}
          reminderId={reminder.id}
          primaryAction={() => {
            setReminderDialogSettings((prevStates) => ({
              ...prevStates,
              open: true,
              reminderData: reminder,
            }));
          }}
          secondaryAction={() => {
            setDeleteDialogSettings((prevStates) => ({
              ...prevStates,
              reminderId: reminder.id,
              title: "Confirmar exclusão",
              description: "Essa ação não poderá ser revertida, deseja continuar?",
              open: true,
            }));
          }}
        />
      ));
    }
  }

  return (
    <div className="w-screen h-screen background">
      <ConfirmationDialog
        open={deleteDialogSettings.open}
        onOpenChange={() => {
          setDeleteDialogSettings((prevState) => ({
            ...prevState,
            open: !deleteDialogSettings.open,
          }));
        }}
        onReminderDeleted={() => {
          getAllReminders()
        }}
        reminderId={deleteDialogSettings.reminderId}
        title={deleteDialogSettings.title}
        description={deleteDialogSettings.description}
      />
      <ReminderDialog
        reminderData={reminderDialogSettings.reminderData}
        open={reminderDialogSettings.open}
        onOpenChange={() => {
          setReminderDialogSettings((prevState) => ({
            ...prevState,
            open: !reminderDialogSettings.open,
          }));
        }}
        onFormSubmited={() => {
          getAllReminders()
        }}
      />
      <main>
        <h1 className="text-lg font-bold text-secondary mt-12">
          Register Reminder
        </h1>
        <div className="w-full h-full mt-16 flex flex-col">
          <div className="space-y-4">
            <span className="text-sm text-secondary">
              Selecione uma data para filtrar
            </span>
            <div className="flex gap-2">
              <Input
                type="date"
                className="max-w-[12rem]"
                onChange={(e) => {
                  setSelectedDateFilter(e.target.value)
                }}
                disabled={reminderRequestSettings.loadingRequest ? true : false}
                value={selectedDateFilter}
              />
              {/* <DatePicker
              selected={selectedDateFilter}
              onSelect={handleSelectDate}
              disabled={reminderRequestSettings.loadingRequest}
            /> */}
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
            <Button
              onClick={() => {
                setReminderDialogSettings((prevStates) => ({
                  ...prevStates,
                  onOpenChange(open) {},
                  open: !reminderDialogSettings.open,
                }));
              }}
              variant={"ghost"}
              className="text-secondary gap-2 p-0"
              disabled={reminderRequestSettings.loadingRequest}
              size={"sm"}
            >
              <IoMdAdd className="text-xl" />
              Adicionar novo lembrete
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

    </div>
  );
}
