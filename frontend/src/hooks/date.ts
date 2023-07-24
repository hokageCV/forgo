export function useFormatedDate(dateString: string) {
    const date = new Date(dateString);

    const formattedDate = date.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
    });

    const formattedTime = date.toLocaleTimeString("en-IN", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
    });

    return { formattedDate, formattedTime };
}
