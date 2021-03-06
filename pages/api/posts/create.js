import database from "../../../library/connection"
import authorizeToken from "../../../middlewares/AuthToken"

const handler = async(request, response) => {
    if (request.method !== "POST") response.status(405).end()

    const auth = await authorizeToken(request, response)
    console.log(auth);

    const { title, content } = request.body

    const createPost = await database("posts").insert({
        title: title,
        content: content
    })

    const postCreated = await database("posts").where("id", createPost).first()

    response.status(200)
    response.json({
        message: "Post create successfully",
        data: postCreated
    })
}

export default handler