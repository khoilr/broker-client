declare namespace NodeJS {
    export interface ProcessEnv {
        readonly NEXT_PUBLIC_API_URL: string
        readonly NEXT_PUBLIC_TELEGRAM_BOT_URL: string
    }
}
