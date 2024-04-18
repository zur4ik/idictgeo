import type { RedisClientType } from "redis";
import redis from "redis";

let client: RedisClientType;

function getRedisClient(host: string, port: string) {
    if (!client) {
        client = redis.createClient({
            url: `redis://${host}:${port}/0`,
        });
        client.on("error", (err) => console.log("Redis Client Error", err));
    }
    return client;
}

export default async function connectRedis(
    host: string = "localhost",
    port: string = "6379",
): Promise<RedisClientType> {
    let client = getRedisClient(host, port);

    // connect to redis
    if (!client.isOpen) {
        await client.connect();
    }

    return client;
}
