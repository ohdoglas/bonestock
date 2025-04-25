import { isValid, parse } from "date-fns";


export function formatDateOfBirth(dateString: string): Date | null {
    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(dateString)) return null;

    const parseDate = parse(dateString, "dd/MM/yyyy", new Date());
    return isValid(parseDate) ? parseDate : null;
}