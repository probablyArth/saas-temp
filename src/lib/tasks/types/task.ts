interface Task {
  id: number;
  name: string;
  organizationId: number;
  done: boolean;
  pdf_path: string;
  enrich: string;
}

export default Task;
