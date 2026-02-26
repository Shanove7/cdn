import { put } from '@vercel/blob'
import formidable from 'formidable'
import fs from 'fs'

export const config = {
  api: {
    bodyParser: false
  }
}

export default async function handler(req, res){

  if(req.method !== 'POST'){
    return res.status(405).json({ status:false })
  }

  const form = formidable()

  form.parse(req, async (err, fields, files)=>{

    if(err){
      return res.status(500).json({ status:false })
    }

    const file = files.file?.[0] || files.file

    if(!file){
      return res.status(400).json({ status:false })
    }

    const stream = fs.createReadStream(file.filepath)

    const blob = await put(
      Date.now() + "_" + file.originalFilename,
      stream,
      { access: 'public' }
    )

    return res.json({
      status:true,
      url: blob.url,
      pathname: blob.pathname
    })

  })

}
