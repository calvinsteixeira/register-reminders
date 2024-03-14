import React, { ReactElement } from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { MdEdit, MdDelete } from "react-icons/md";

type Props = {
  reminderId?: string,
  title: string,
  subtitle?: string,
  description: string,
  date: string,
  tags?: ReactElement,
  primaryAction: () => void
  secondaryAction: () => void
}

export default function ReminderCard({ reminderId, title, subtitle, description, date, tags, primaryAction, secondaryAction }: Props) {

  return (
    <Card className="max-w-[100%] bg-card text-card-foreground shadow-xl border">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {subtitle && <CardDescription>{subtitle}</CardDescription>}
      </CardHeader>
      <CardContent>
        <p>{description}</p>
      </CardContent>
      <CardFooter className="flex  justify-start gap-2">
        <Button onClick={secondaryAction} size={"icon"} className='bg-destructive text-destructive-foreground'><MdDelete className='text-base' /></Button>
        <Button onClick={primaryAction} size={"icon"} className='bg-secondary'><MdEdit className='text-base' /></Button>
      </CardFooter>
    </Card>
  )
}
