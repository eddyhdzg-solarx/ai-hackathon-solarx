<a href="https://ai.solarx.app/">
  <img alt="SolarX AI Chatbot Demo" src="https://gemini-chatbot.vercel.rocks/og.png FIXME">
  <h1 align="center">SolarX AI Chatbot Demo</h1>
</a>

<p align="center">
  An open-source AI Chatbot Demo app for analyzing sun radiation, transmission lines, electricity prices, and land use. Built with Next.js, the Vercel AI SDK, Google Gemini, Solar API, and Vercel KV.
</p>

<p align="center">
  <a href="#features"><strong>Features</strong></a> ·
  <a href="#model-providers"><strong>Model Providers</strong></a> ·
  <a href="#running-locally"><strong>Running locally</strong></a> ·
  <a href="#authors"><strong>Authors</strong></a>
</p>
<br/>

## Features

- [Next.js](https://nextjs.org) App Router
- React Server Components (RSCs), Suspense, and Server Actions
- [Vercel AI SDK](https://sdk.vercel.ai/docs) for streaming chat UI
- Support for Google Gemini (default), OpenAI, Anthropic, Cohere, Hugging Face, or custom AI chat models and/or LangChain
- [shadcn/ui](https://ui.shadcn.com)
  - Styling with [Tailwind CSS](https://tailwindcss.com)
  - [Radix UI](https://radix-ui.com) for headless component primitives
  - Icons from [Phosphor Icons](https://phosphoricons.com)
- Chat History, rate limiting, and session storage with [Vercel KV](https://vercel.com/storage/kv)
- [Solar API](https://developers.google.com/maps/documentation/solar/overview) for solar and energy analytics
- [Clerk](https://clerk.com/) for authentication

## Model Providers

This template ships with Google Gemini `models/gemini-1.0-pro-001` as the default. However, thanks to the [Vercel AI SDK](https://sdk.vercel.ai/docs), you can switch LLM providers to [OpenAI](https://openai.com), [Anthropic](https://anthropic.com), [Cohere](https://cohere.com/), [Hugging Face](https://huggingface.co), or using [LangChain](https://js.langchain.com) with just a few lines of code.

## Running locally

You will need to use the environment variables [defined in `.env.example`](.env.example) to run SolarX AI Chatbot. It's recommended you use [Vercel Environment Variables](https://vercel.com/docs/projects/environment-variables) for this, but a `.env` file is all that is necessary.

> Note: You should not commit your `.env` file or it will expose secrets that will allow others to control access to your various Google Cloud and authentication provider accounts.

1. Install Vercel CLI: `npm i -g vercel`
2. Link local instance with Vercel and GitHub accounts (creates `.vercel` directory): `vercel link`
3. Download your environment variables: `vercel env pull`

```bash
pnpm install
pnpm dev
```

Your app template should now be running on [localhost:3000](http://localhost:3000/).

## Authors

This AI demo was made during the AITX Hackathon by

- [Eddy Hernandez](https://github.com/eddyhdzg-solarx)

## Credits

For Hosting the AI ATX Hackathon

- [AITX](https://aitx.beehiiv.com/)
- [AI Tinkerers](https://aitinkerers.org/)
- [Jake O'Shea](https://www.linkedin.com/in/jake-oshea/)
- [Michael Daigler](https://www.linkedin.com/in/mdaigz/)
- [Achyut Sarma Boggaram](https://www.linkedin.com/in/achyutsarma/)

For Sponsoring the AI ATX Hackathon

- [Antler](https://www.antler.co/)
- [​Google Cloud ](https://cloud.google.com/)
- [​Lambda Labs](https://lambdalabs.com/)
