import { list } from '@vercel/blob'

export default async function handler(req, res){

  const data = await list()

  const files = data.blobs.map(v=>({

    url: `https://cdn.khasan.biz.id/${v.pathname}`,
    pathname: v.pathname,
    size: v.size,
    uploaded: v.uploadedAt

  }))

  return res.json({
    status:true,
    total: files.length,
    files
  })

}
