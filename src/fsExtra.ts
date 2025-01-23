const fs = require('fs')
const path = require('path')

// Helper function to extract the timestamp from the filename
const extractTimestamp = (filename: string): number | null => {
   // Match patterns like 'Marvel's Spider-Man 2_20241124144743' or 'Rising Heat_2025011210502800.webm'
   const regex = /_(\d{14,16})\.webm$/
   const match = filename.match(regex)
   if (match) {
      // Convert timestamp (YYYYMMDDHHMMSS) into a Date object
      const timestampStr = match[1]
      const year = parseInt(timestampStr.substring(0, 4), 10)
      const month = parseInt(timestampStr.substring(4, 6), 10) - 1 // Months are 0-indexed in JavaScript
      const day = parseInt(timestampStr.substring(6, 8), 10)
      const hours = parseInt(timestampStr.substring(8, 10), 10)
      const minutes = parseInt(timestampStr.substring(10, 12), 10)
      const seconds = parseInt(timestampStr.substring(12, 14), 10)

      return new Date(year, month, day, hours, minutes, seconds).getTime()
   }
   return null
}

// Function to change the timestamps of all `.webm` files in a folder
const changeFileTimestamps = (folderPath: string): void => {
   // Read all files in the folder
   const files = fs.readdirSync(folderPath)

   files.forEach((file: string) => {
      const filePath = path.join(folderPath, file)

      // Only process .webm files
      if (file.endsWith('.webm')) {
         const timestamp = extractTimestamp(file)
         if (timestamp !== null) {
            try {
               // Change the file's creation and modification times
               fs.utimesSync(filePath, new Date(timestamp), new Date(timestamp))
               console.log(`Updated timestamps for: ${file}`)
            } catch (err) {
               console.error(`Error updating timestamps for ${file}:`, err)
            }
         } else {
            console.log(`No valid timestamp found in filename: ${file}`)
         }
      }
   })
}

// Specify the folder path (can be changed to any directory path)
const folderPath = "C:\\Users\\admin\\Videos" // Replace with your folder path
changeFileTimestamps(folderPath)
