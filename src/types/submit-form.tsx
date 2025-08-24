import type { Priority, SubmissionType, TopicArea } from "./input-type";

export default interface SubmitForm {
  submissionType: SubmissionType | "";
  topicArea: TopicArea | "";
  content: string;
  priority: Priority | "";
  publish: boolean;
}
