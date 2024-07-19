import { ExternalLink } from '@/components/external-link'

export function EmptyScreen() {
  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="flex flex-col gap-2 rounded-2xl bg-neutral-50 p-4 text-sm sm:p-8 sm:text-base">
        <h1 className="inline-block max-w-fit text-2xl font-semibold tracking-tight sm:text-3xl">
          SolarX AI Chatbot Demo
        </h1>
        <p className="leading-normal text-neutral-900">
          This is an open-source AI chatbot demo app template built with{' '}
          <ExternalLink href="https://nextjs.org" className="underline">
            Next.js
          </ExternalLink>
          , the{' '}
          <ExternalLink href="https://sdk.vercel.ai" className="underline">
            Vercel AI SDK
          </ExternalLink>
          ,{' '}
          <ExternalLink href="https://ai.google.dev" className="underline">
            Google Gemini
          </ExternalLink>
          , and{' '}
          <ExternalLink
            href="https://developers.google.com/maps/documentation/solar/overview"
            className="underline"
          >
            Solar API
          </ExternalLink>
          .
        </p>
      </div>
    </div>
  )
}
