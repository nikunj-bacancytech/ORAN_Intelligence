import { format, formatDistanceToNowStrict } from "date-fns";

export function formatDateLabel(value: string) {
  return format(new Date(value), "MMM d, yyyy");
}

export function formatRelativeTime(value: string) {
  return formatDistanceToNowStrict(new Date(value), { addSuffix: true });
}
