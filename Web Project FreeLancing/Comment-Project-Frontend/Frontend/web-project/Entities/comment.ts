export interface NewCommentProp {
  topic: String;
  comment: String;
}

export interface CommentProp {
  id: React.Key;
  comment: String;
  topic: String;
  username: String;
}
