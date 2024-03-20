import fs from 'fs-extra';
// Define source and destination directories
const sourceDirectories = ['./Audio', './Models', './Images', './Assets'];
const destinationDirectory = './build/';

// Copy directories recursively
async function copyDirectories() {
  try {
    for (const directory of sourceDirectories) {
      await fs.copy(`./${directory}`, `./${destinationDirectory}/${directory}`);
      console.log(`Copied ${directory} directory successfully.`);
    }
    console.log('All directories copied successfully.');
  } catch (err) {
    console.error('Error copying directories:', err);
  }
}
// Call the copyDirectories function
copyDirectories();