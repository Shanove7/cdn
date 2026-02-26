import { list } from '@vercel/blob'

export default async function handler(req, res){

  const data = await list()

  const files = data.blobs.map(v=>({
    url: v.url,
    size: v.size,
    uploaded: v.uploadedAt,
    pathname: v.pathname
  }))

  return res.json({
    status:true,
    total: files.length,
    files
  })

}
