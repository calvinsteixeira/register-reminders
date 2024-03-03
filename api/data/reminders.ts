interface IReminders {
  id: number;
  title: string;
  subtitle?: string;
  description: string;
}

type RemindersList = IReminders[];

const remindersList = [
  {
    id: 1,
    title: "Faculdade",
    subtitle: "Documentos pendentes",
    description:
      "Pedir para a escola os documentos necessáios para efetivar a matrícula na faculdade",
  },
  {
    id: 2,
    title: "Pets",
    subtitle: "Sachê",
    description: "Dar sachê para os pets às 19:30",
  },
];

export { remindersList };
export type { IReminders };
