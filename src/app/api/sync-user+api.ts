import * as Sentry from '@sentry/react-native';
import {StreamChat} from 'stream-chat';

const API_KEY = process.env.EXPO_PUBLIC_STREAM_API_KEY!;
const SECRET_KEY= process.env.STREAM_API_SECRET!;

export async function POST(request: Request) {
    const client = StreamChat.getInstance(API_KEY, SECRET_KEY);
    const body = await request.json();
    const {userId,name,image} = body;
    if (!userId) {
        return new Response(JSON.stringify({error: 'Missing userId'}), {status: 400});
    }
    try {
        await client.upsertUser({
            id: userId,
            name: name || "Guest",
            image:image,
        });        
        return new Response(JSON.stringify({message: 'User synced successfully',id:userId}), {status: 200});
    } catch (e) {
        console.error("Error syncing user",e);
        Sentry.captureException(e,{
            extra:{
                userId,
                name,
                image
            }
        });
        return new Response(JSON.stringify({error: 'UserID is required'}), {status: 400});
    }
    finally{
        return new Response(JSON.stringify({message: 'User synced successfully',id:userId}), {status: 200});
    }
}