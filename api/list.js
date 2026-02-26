import { list } from '@vercel/blob'

export default async function handler(req, res){

  const data = await list()

  const files = data.blobs.map(v => ({
    url: `https://${req.headers.host}/${v.pathname}`,
    pathname: v.pathname,
    size: v.size,
    uploaded: v.uploadedAt
  }))

  res.json({
    status:true,
    total: files.length,
    files
  })

}
