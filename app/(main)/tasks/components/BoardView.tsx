import classNames from "classnames/bind";
import { TaskStatus } from "@/types/TaskStatus";
import { Task } from "@/types/entities";
import styles from "./BoardView.module.css";
import TaskItem from "./TaskItem";

const cx = classNames.bind(styles);

const filterTaskByStatus = (tasks: Task[]) => {
  console.log("📦 전체 tasks:", tasks);

  const result: Record<TaskStatus, Task[]> = {
    [TaskStatus.todo]: [],
    [TaskStatus.inProgress]: [],
    [TaskStatus.done]: [],
  };
  for (const task of tasks) {
    console.log("👉 task.status =", task.status, typeof task.status);
    result[task.status].push(task);
  }
  return result;
};

const BoardView = ({
  className,
  tasks,
}: {
  className?: string;
  tasks: Task[];
}) => {
  const {
    [TaskStatus.todo]: todos,
    [TaskStatus.inProgress]: inProgress,
    [TaskStatus.done]: done,
  } = filterTaskByStatus(tasks);

  return (
    <div className={cx("container", className)}>
      <div className={cx("column")}>
        <div className={cx("header", "todo")}>진행 전</div>
        {todos.map((task) => (
          <TaskItem key={task.id} projectId={task.projectId} task={task} />
        ))}
      </div>
      <div className={cx("column")}>
        <div className={cx("header", "inProgress")}>진행 중</div>
        {inProgress.map((task) => (
          <TaskItem key={task.id} projectId={task.projectId} task={task} />
        ))}
      </div>
      <div className={cx("column")}>
        <div className={cx("header", "done")}>완료</div>
        {done.map((task) => (
          <TaskItem key={task.id} projectId={task.projectId} task={task} />
        ))}
      </div>
    </div>
  );
};

export default BoardView;
