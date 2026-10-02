import { createClient } from 'redis';

const client = createClient({
    url: process.env.SRM_REDIS_URL,
});

client.on('error', (err) => {
    console.error('Redis Client Error', err);
});

let connectPromise;

async function getRedis() {
    if (!connectPromise) {
        connectPromise = client.connect();
    }

    await connectPromise;
    return client;
}

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');

    try {
        const redis = await getRedis();

        const count = await redis.incr('srm_menu_visitors');

        return res.status(200).json({ count });
    } catch (error) {
        console.error('Visitor counter error:', error);

        return res.status(200).json({ count: null });
    }
}