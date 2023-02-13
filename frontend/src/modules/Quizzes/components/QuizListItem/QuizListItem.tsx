import { Typography, List, Button, Popconfirm, Tag, Tooltip } from "antd";
import { CopyOutlined } from "@ant-design/icons";

import { Quiz } from "../../../types";
import { Link } from "react-router-dom";
import {
  QUIZ_DELETE_CONFIRM_TEXT,
  QUIZ_PUBLISH_CONFIRM_TEXT,
} from "../../../../utils/constants";

interface QuizListItemProps extends Quiz {
  onConfirmPublish: (e: any) => void;
  onConfirmDelete: (e: any) => void;
}

const QuizListItem = ({
  title,
  id,
  isPublished,
  quizPermalink,
  onConfirmPublish,
  onConfirmDelete,
}: QuizListItemProps) => {
  return (
    <List.Item
      actions={[
        <>
          {isPublished ? (
            <Tooltip title="copy git url">
              <Button
                onClick={() =>
                  navigator.clipboard.writeText(quizPermalink as string)
                }
                icon={<CopyOutlined />}
              >
                Link
              </Button>
            </Tooltip>
          ) : null}
        </>,
        <Button disabled={isPublished}>
          <Link to={`/update-quiz/${id}`}>Edit</Link>
        </Button>,
        <>
          {isPublished ? (
            <Tag color="green">Published</Tag>
          ) : (
            <Popconfirm
              placement="top"
              title={QUIZ_PUBLISH_CONFIRM_TEXT}
              onConfirm={onConfirmPublish}
              okText="Yes"
              cancelText="No"
            >
              <Button disabled={isPublished} type="primary">
                Publish
              </Button>
            </Popconfirm>
          )}
        </>,
        <Popconfirm
          placement="top"
          title={QUIZ_DELETE_CONFIRM_TEXT}
          onConfirm={onConfirmDelete}
          okText="Yes"
          cancelText="No"
        >
          <Button type="primary" danger>
            Delete
          </Button>
        </Popconfirm>,
      ]}
    >
      <List.Item.Meta title={title} />
    </List.Item>
  );
};

export default QuizListItem;
