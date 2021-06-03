import type { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method.toLowerCase() === 'get') {
        if (process.env["DXM_DEVELOPMENT"]) {
            res.status(200).setHeader('Set-Cookie', `auth_token=${process.env["DXM_AUTH_TOKEN"]}`);
        } else {
            res.status(403).send('The maze was not meant for you.');
        }
    } else {
        res.status(400).send('Invalid method.');
    }
}
