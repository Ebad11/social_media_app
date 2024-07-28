import {connectToDB} from '../../../../../lib/mongodb/mongoose'
import Post from '../../../../../lib/models/Post'
export const GET = async (req, {params}) => {
    const { query} = params;
    try {
        await connectToDB();

        const searchedPosts = await Post.find({
            $or:[
                {caption : {$regex : query, $options: "i" }},
                {tag : {$regex : query, $options: "i" }},
            ]
        }).populate("creator likes").exec();

        return new Response(JSON.stringify(searchedPosts), {status: 200});
    } catch (error) {

    
        console.error(error);
        return new Response("Failed to get posts by search", {status: 500});
        
    }
}