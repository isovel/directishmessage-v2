import crypto from 'crypto';
import type { NextApiRequest, NextApiResponse } from 'next';

const messages: any[] = [{ author: "SYSTEM", content: "test", timestamp: Date.now() }]

export default (req: NextApiRequest, res: NextApiResponse) => {
    console.debug(`{\n    headers: {\n        Authorization: ${req.headers.authorization === process.env['DXM_AUTH_TOKEN']}\n    }\n}`);
    if (req.headers.authorization !== process.env['DXM_AUTH_TOKEN']) {
        res.status(403).send('The maze was not meant for you.');
    } else {
        res.status(200).json({messages: messages, hash: crypto.createHmac('sha256', messages.toString()).digest('hex')});
    }
}