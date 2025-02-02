const webPush = require("web-push")
const fs = require("fs")

const path = ".env"

// Function to parse .env content into an object
function parseEnv(content) {
  return content
    .split("\n")
    .filter(line => line.includes("=") && !line.startsWith("#"))
    .reduce((acc, line) => {
      const [key, value] = line.split("=")
      acc[key.trim()] = value.trim()
      return acc
    }, {})
}

// Read existing .env file if it exists
let existingEnv = {}
if (fs.existsSync(path)) {
  const existingData = fs.readFileSync(path, "utf8")
  existingEnv = parseEnv(existingData)
}

// Generate new VAPID keys
const vapidKeys = webPush.generateVAPIDKeys()

// Merge new keys with existing environment variables
const updatedEnv = {
  ...existingEnv, // Preserve existing values
  NEXT_PUBLIC_VAPID_PUBLIC_KEY: vapidKeys.publicKey,
  NEXT_PUBLIC_VAPID_PRIVATE_KEY: vapidKeys.privateKey,
}

// Convert object back to .env format
const updatedContent = Object.entries(updatedEnv)
  .map(([key, value]) => `${key}=${value}`)
  .join("\n")

// Write updated content back to .env file
fs.writeFileSync(path, updatedContent, { flag: "w" })

console.log("#### VAPID keys generated and saved to .env file ### \n")
console.table({ vapidKeys })
