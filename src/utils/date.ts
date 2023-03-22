import { WEEK_DAYS_SHORT } from "../constants/weekDays";

export function prepareDate(time: Date) {
    const today = new Date()
    const currentYear = today.getFullYear()
    const currentMonth = today.getMonth()
    const currentDay = today.getDay()

    if (currentYear === time.getFullYear() && currentMonth === time.getMonth() && currentDay === time.getDay()) {
        return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    if (today.getFullYear() > time.getFullYear()) {
        return time.toLocaleString([], { day: "2-digit", month: 'long', year: 'numeric' });
    }

    return WEEK_DAYS_SHORT[time.getDay()];
}
