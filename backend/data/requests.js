import fs from 'fs/promises';

export async function getStoredRequests() {
  try {
    const rawFileContent = await fs.readFile('requests.json', { encoding: 'utf-8' });
    const data = JSON.parse(rawFileContent);
    return data  ?? [];
  } catch (err) {
    throw new Error('Error reading the file: ' + err.message);
  }
}

export async function storeRequests(requests) {
  try {
    await fs.writeFile('requests.json', JSON.stringify(requests, null, 2));
  } catch (err) {
    throw new Error('Error writing to the file: ' + err.message);
  }
}
