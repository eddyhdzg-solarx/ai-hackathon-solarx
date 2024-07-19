import { format, parseISO } from "date-fns"

interface Event {
  date: string
  headline: string
  description: string
}

export function Events({ props: events }: { props: Event[] }) {
  return (
    <div className="-mt-2 flex w-full flex-col gap-2 py-4">
      {events.map(event => (
        <div
          key={event.date}
          className="flex shrink-0 flex-col gap-1 rounded-xl bg-neutral-800 p-4"
        >
          <div className="text-sm text-neutral-400">
            {format(parseISO(event.date), "dd LLL, yyyy")}
          </div>
          <div className="text-base font-bold text-neutral-200">
            {event.headline}
          </div>
          <div className="text-neutral-500">
            {event.description.slice(0, 70)}...
          </div>
        </div>
      ))}
    </div>
  )
}
