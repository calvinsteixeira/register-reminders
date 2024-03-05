import axios, {AxiosResponse} from "axios";


interface IReminder {
  id?: number,
  title: string,
  subtitle?: string,
  description: string,
  date: Date
}

const API_URL = "http://localhost:4000";

const reminderService = {
  getAllReminders: async (): Promise<AxiosResponse> => {
    try {
      const result = await axios.get(API_URL + "/reminders");
      return result
    } catch (error) {
      console.error(error)
      throw error;
    }
  },
  createReminder: async(data: IReminder): Promise<AxiosResponse> => {
    try {
      const result = await axios.post(API_URL + '/reminders', data)
      return result
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}

export default reminderService
export type {
  IReminder
}