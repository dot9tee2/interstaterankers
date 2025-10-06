/**
* This configuration file lets you run `$ sanity [command]` in this folder
* Go to https://www.sanity.io/docs/cli to learn more.
**/
import { defineCliConfig } from 'sanity/cli'
import { readFileSync } from 'fs'
import { join } from 'path'

// Load environment variables from .env.local
function loadEnvFile() {
  try {
    const envPath = join(process.cwd(), '.env.local')
    const envContent = readFileSync(envPath, 'utf8')
    
    envContent.split('\n').forEach(line => {
      const [key, ...valueParts] = line.split('=')
      if (key && valueParts.length > 0) {
        const value = valueParts.join('=').trim()
        if (!process.env[key]) {
          process.env[key] = value
        }
      }
    })
  } catch (error) {
    console.warn('Could not load .env.local file:', error.message)
  }
}

// Load environment variables
loadEnvFile()

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET

export default defineCliConfig({ api: { projectId, dataset } })
