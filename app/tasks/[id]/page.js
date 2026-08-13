import TaskDetailClient from "../../../components/TaskDetailClient";

export const metadata = {
  title: "Task Details | Task Tracker",
};

export default async function TaskDetailPage({ params }) {
  const { id } = await params;

  return <TaskDetailClient id={id} />;
}
