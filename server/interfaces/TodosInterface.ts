export interface TodosInterface {
  id: number;
  name: string;
  status: {
    done: boolean;
  };
  is_deleted?: boolean;
}
