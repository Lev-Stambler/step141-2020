import { ItemPosition } from '../measurements';

export interface GridItem {
  getPosition: () => ItemPosition;
  readonly name: string;
}
