declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GOOGLE_GENERATIVE_AI_API_KEY: string

      // Clerk
      NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: string
      CLERK_SECRET_KEY: string

      NEXT_PUBLIC_CLERK_SIGN_IN_URL: string
      NEXT_PUBLIC_CLERK_SIGN_UP_URL: string
      NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL: string
      NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL: string

      // Solar API
      GOOGLE_API_KEY: string
      NEXT_PUBLIC_GOOGLE_API_KEY: string

      // KV
      KV_URL: string
      KV_REST_API_URL: string
      KV_REST_API_TOKEN: string
      KV_REST_API_READ_ONLY_TOKEN: string
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}
