import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type AlertProps = {
  title: string;
  description: string;
  type: "destructive" | "success";
  visible: boolean;
};

export default function AlertContainer({
  title,
  description,
  type,
  visible,
}: AlertProps) {
  const alertTypeStyle =
    type == "destructive" ? "bg-red-700 text-white" : "bg-green-600 text-white";

  return (
    <Alert
      className={`${
        visible ? "fixed" : "hidden"
      } ${alertTypeStyle} border-transparent rounded right-3 top-3 max-w-[80%] shadow-lg`}
    >
      <AlertTitle className='text-sm'>{title}</AlertTitle>
      <AlertDescription className="mt-2 text-sm">{description}</AlertDescription>
    </Alert>
  );
}

export type {
  AlertProps
}