export function useDateFormat(dateString: string) {
    const date = new Date(dateString);

    const formattedDate = date.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
    });

    return formattedDate;
}

export function useTimeFormat(timeString: string) {
    const [hours, minutes] = timeString.split(":");
    let period = "AM";
    let hour = parseInt(hours, 10);

    if (hour === 0) {
        hour = 12;
    } else if (hour > 12) {
        hour -= 12;
        period = "PM";
    }

    return `${hour}:${minutes} ${period}`;
}
