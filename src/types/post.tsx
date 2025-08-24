import type { Priority, SubmissionType, TopicArea } from "./input-type";

export default interface Post {
  id: string;
  submissionType: SubmissionType;
  topicArea: TopicArea;
  content: string;
  priority: Priority;
  publish?: boolean;
  createdAt: string;
  updatedAt?: string;
}
