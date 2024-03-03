"use client";

import React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { ptBR } from "date-fns/locale";
import { DayPickerDefaultProps, SelectSingleEventHandler } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type Props = {
  label?: string;
  selected: Date,
  onSelect: SelectSingleEventHandler
};

export default function DatePicker({ label, selected, onSelect }: Props) {

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[210px] justify-start text-left font-normal",
            !selected && "text-muted-foreground"
          )}
        >
          <>
            <CalendarIcon className="mr-2 h-4 w-4" />
            {selected ? (
              format(selected, "dd/MM/yyyy", { locale: ptBR })
            ) : (
              <span>{label || "Selecione uma data"}</span>
            )}
          </>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={selected}
          locale={ptBR}
          onSelect={onSelect}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
