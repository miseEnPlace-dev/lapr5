import { ValueObject } from '../../core/domain/ValueObject';
import { Result } from '../../core/logic/Result';

interface TaskProps {
  [key: string]: string;
  value: string;
}

export class Task extends ValueObject<TaskProps> {
  get value(): string {
    return this.props.value;
  }

  private constructor(props: TaskProps) {
    super(props);
  }

  public static create(task: string): Result<Task> {
    if (task !== 'pick_delivery' && task !== 'surveillance')
      return Result.fail<Task>('Task must be pick_delivery or surveillance');
    return Result.ok<Task>(new Task({ value: task }));
  }
}
