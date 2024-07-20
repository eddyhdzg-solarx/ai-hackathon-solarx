import { NoraDemo } from "@/client/solar/NoraDemo"

export const metadata = {
  title: "SolarX AI Chatbot Demo"
}

export default async function Page() {
  return (
    <div className="flex w-full items-center justify-center p-10">
      <NoraDemo />
    </div>
  )
}
