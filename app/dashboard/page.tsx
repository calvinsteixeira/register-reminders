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

type Props = {};
const dialogDefaultValues: IDialog = {
  title: '',
  description: '',
  open: false,
  onOpenChange(open) {},
};

export default function page({}: Props) {
  const [loadingFilterRequest, setLoadingFiltarRequest] =
    React.useState<boolean>(false);
  const [dialogSettings, setDialogSettings] = React.useState<IDialog>(dialogDefaultValues)

  return (
    <main className="w-screen h-screen background">
      <ConfirmationDialog open={dialogSettings.open} onOpenChange={() => {
        setDialogSettings((prevState) => ({
          ...prevState,
          open: !dialogSettings.open
        }))
      }}  title={dialogSettings.title} description={dialogSettings.description}/>
      <h1 className="text-lg font-bold text-secondary mt-12">
        Register Reminder
      </h1>
      <div className="w-full h-full mt-16 flex flex-col">
        <div className="space-y-4">
          <span className="text-sm text-secondary">
            Selecione uma data para filtrar
          </span>
          <div className="flex gap-2">
            <DatePicker />
            <Button
              disabled={loadingFilterRequest}
              className="bg-secondary"
              size={"icon"}
            >
              {loadingFilterRequest ? (
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
            <div className="flex items-baseline gap-1">
              <CalendarIcon className="h-[0.85rem] w-[0.85rem]" />
              <p className="text-xs">31/01/2024</p>
            </div>
          </div>
          <ReminderCard
            title="Faculdade"
            subtitle="Documentos pendentes"
            description="Pedir para a escola os documentos necessário para efetivar minha matrícula"
            // primaryAction={}
            secondaryAction={() => {
              setDialogSettings((prevState) => ({
                ...prevState,
                title:'Confirmar exclusão',
                description:'Essa ação não poderá ser revertida, deseja continuar?',
                open: true
              }))             
            }}
          />
        </div>
      </div>
    </main>
  );
}
