import { remindersList, IReminders } from "../data/reminders";

let dataSource = remindersList

type getReminderByIdProps = {
  date: string
}


async function getAllReminders() {
  return dataSource
}

async function getReminderByDate({ date }: getReminderByIdProps) {
  const result = dataSource.find(reminder => reminder.date == date)
  return result
}

export {
  getAllReminders,
  getReminderByDate
}