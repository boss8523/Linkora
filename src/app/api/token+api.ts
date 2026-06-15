import {StreamChat} from 'stream-chat';
const API_KEY = process.env.EXPO_PUBLIC_STREAM_API_KEY!;
const SECRET_KEY= process.env.STREAM_API_SECRET!;

export async function POST(request: Request) {
    const client = StreamChat.getInstance(API_KEY, SECRET_KEY);
    const body = await request.json();
    const userId=body?.userId;
    if (!userId) {
        return new Response(JSON.stringify({error: 'Missing userId'}), {status: 400});
    }

    const token=await client.createToken(userId);
    return new Response(JSON.stringify({token}), {status: 200});
}