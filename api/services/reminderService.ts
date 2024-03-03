import axios from 'axios'

async function getAllReminders() {
  try {
    const { data } = await axios.get('http://localhost:4000/reminders')
    return data
  } catch (error) {
    console.log(error)
  }
}

export {
  getAllReminders
}