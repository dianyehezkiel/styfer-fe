import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
import { BE_BASE_URL } from '../../../lib/constants'
import { BackendResponse } from '../../../lib/types'

export default async function accountsHandler(
  req: NextApiRequest,
  res: NextApiResponse<BackendResponse>,
) {
  try {
    const BE_URL = `${BE_BASE_URL}/posts/${req.query.pid}`
    if (!BE_URL.toLowerCase().startsWith('http')) {
      res.status(500).json({ error: 'Backend URL undefined' })
      return
    }

    if (req.method === 'GET') {
      const response = await axios.get(BE_URL)
      res.status(response.status).json(response.data)
    } else if (req.method === 'DELETE') {
      const headers = req.headers.authorization
        ? {
            Authorization: `Bearer ${req.headers.authorization}`,
          }
        : undefined

      const response = await axios.delete(BE_URL, { headers })
      res.status(response.status).json(response.data)
    }
  } catch (error) {
    res.status(500).json({
      error: 'Unknown Error. Please Contact Developer dianyehezkiel@gmail.com',
    })
  }
}
