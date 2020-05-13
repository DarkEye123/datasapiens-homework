import { Entry } from '../../types/budget';

export interface FormProps {
  onConfirm: (x: Partial<Entry>) => void;
}
