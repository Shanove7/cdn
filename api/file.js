import { list } from '@vercel/blob'

export default async function handler(req, res){

  try{

    const { name } = req.query

    if(!name){
      return res.status(404).send("Not found")
    }

    const data = await list()

    const file = data.blobs.find(v => v.pathname === name)

    if(!file){
      return res.status(404).send("File not found")
    }

    return res.redirect(file.url)

  }catch{

    return res.status(500).send("Error")

  }

}
