import { put } from '@vercel/blob'
import formidable from 'formidable'
import fs from 'fs'

export const config = {
  api: {
    bodyParser: false
  }
}

function randomName(length = 6){
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  let result = ""
  for(let i=0;i<length;i++){
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

export default async function handler(req, res){

  if(req.method !== 'POST'){
    return res.status(405).json({ status:false })
  }

  const form = formidable()

  form.parse(req, async (err, fields, files)=>{

    try {

      if(err){
        return res.status(500).json({ status:false })
      }

      const file = files.file?.[0] || files.file

      if(!file){
        return res.status(400).json({ status:false })
      }

      const ext = file.originalFilename.split('.').pop()

      const filename =
        randomName(7) + "." + ext

      const stream = fs.createReadStream(file.filepath)

      const blob = await put(
        filename,
        stream,
        { access: 'public' }
      )

      const url =
        `https://cdn.snx.biz.id/${blob.pathname}`

      return res.json({
        status: true,
        url,
        pathname: blob.pathname
      })

    } catch(e){

      return res.status(500).json({
        status:false
      })

    }

  })

}
