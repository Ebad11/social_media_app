import {connectToDB} from '../../../../../lib/mongodb/mongoose'
import User from '../../../../../lib/models/User'
export const GET = async (req, {params})=>{
    const {query} = params;

    try {
        await connectToDB()

        const searcherdUsers = await User.find({
            $or:[
                {userName:{$regex: query, $options:"i"}},
                {firstName:{$regex: query, $options:"i"}},
                {lastName:{$regex: query, $options:"i"}},
            ],
        }).populate("posts savedPosts likedPosts followers following").exec();

        return new Response(JSON.stringify(searcherdUsers), {status: 200})
    } catch (error) {
        console.error(error)
        return new Response('Failed to search users', {status: 500})
    }
}