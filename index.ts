import express from 'express'
import { Web3Storage, getFilesFromPath, Service } from 'web3.storage'

const app = express()
const port = 3000

app.get('/upload', async (req, res) => {
  res.send(`Upload Success with CID >>> ${await upload()}`)
})

async function upload (): Promise<string> {
  const token = {token: 'Your token...'}
  const storage = new Web3Storage(token as Service)
  const files = []
  const list = ['test1.txt', 'test2.txt']

  for (const path of list) {
    const pathFiles = await getFilesFromPath(path)
    files.push(...pathFiles)
  }

  console.log(`Uploading ${files.length} files`)
  const cid = await storage.put(files)
  console.log('Content added with CID:', cid)

  return cid
}

app.listen(port, () => {       
    console.log( `server started at http://localhost:${port}`)
})