import * as dotenv from 'dotenv'
dotenv.config()

export function getEnv(key: string, defaultValue: string | null = null): string {
    return process.env[key] ?? (defaultValue as string)
}