import {connectToDB} from '../../../lib/mongodb/mongoose'
import Post from '../../../lib/models/Post'

export const GET = async (req) => {

    try {
        await connectToDB();
        const feedPosts = await Post.find().populate("creator likes").exec();
        return new Response(JSON.stringify(feedPosts), {status: 200});

    } catch (err) {

        console.error(err);
        return new Response("Failed to fetch posts", {status: 500});
        
    }

}