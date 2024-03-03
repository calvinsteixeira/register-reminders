import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface IReminders {
  id: number;
  title: string;
  subtitle?: string;
  description: string;
  date: string;
}

type RemindersList = IReminders[];

const remindersList: RemindersList = [
  {
    id: 1,
    title: "Faculdade",
    subtitle: "Documentos pendentes",
    description:
      "Pedir para a escola os documentos necessáios para efetivar a matrícula na faculdade",
    date: '23/03/2024',
  },
  {
    id: 2,
    title: "Pets",
    subtitle: "Sachê",
    description: "Dar sachê para os pets às 19:30",
    date: '03/03/2024',
  },
];

export { remindersList };
export type { IReminders };
