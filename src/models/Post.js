class Post {
    constructor(authorId, authorName, content, date = new Date(), id = Math.random(), replies = []) {
        this.authorId = authorId;
        this.authorName = authorName;
        this.content = content;
        this.date = date;
        this.id = id;
        this.replies = replies;
    }
}

export default Post;