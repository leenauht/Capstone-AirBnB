import Avatar from "./../../_component/Avatar";

export default function CommentMessage(props) {
  const { imgAvatar, message } = props;

  return (
    <div>
      <Avatar imgAvatar={imgAvatar} width={56} height={56}>
        <div>
          <div>Ten NHan vat</div>
          <div>xyz</div>
        </div>
      </Avatar>
      <div>
        <div>Ngy than nam</div>
        <div>{message}</div>
      </div>
    </div>
  );
}
