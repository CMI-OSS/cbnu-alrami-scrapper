export interface DomitoryScript {
  baseUrl: string;
  site: string;
  category: string;
  domitory: string;
  typeQuery: string;
  timeIndex: { morning: number; lunch: number; evening: number };
  waitMainTableSelector: string;
  getFoodList: Function;
  getDateInfo: Function;
  getFoodInfo: Function;
}
