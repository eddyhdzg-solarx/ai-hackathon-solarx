import { NoraDemo } from "@/client/NoraDemo"

export const metadata = {
  title: "SolarX AI Chatbot Demo"
}

export default async function Page() {
  return (
    <div className="flex">
      <NoraDemo />
    </div>
  )
}
