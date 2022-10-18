import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
import { BE_BASE_URL } from '../../../lib/constants'
import { BackendResponse } from '../../../lib/types'

export default async function accountsHandler(
  req: NextApiRequest,
  res: NextApiResponse<BackendResponse>,
) {
  try {
    const BE_URL = `${BE_BASE_URL}/account/change-password`
    if (!BE_URL.toLowerCase().startsWith('http')) {
      res.status(500).json({ error: 'Backend URL undefined' })
      return
    }

    if (req.method === 'PUT') {
      const headers = req.headers.authorization
        ? {
            Authorization: `Bearer ${req.headers.authorization}`,
          }
        : undefined

      const data = {
        old_password: req.body.old_password,
        new_password: req.body.new_password,
      }

      const response = await axios.put(BE_URL, {
        headers,
        data,
      })
      res.status(response.status).json(response.data)
    }
  } catch (error) {
    res.status(500).json({
      error: 'Unknown Error. Please Contact Developer dianyehezkiel@gmail.com',
    })
  }
}
