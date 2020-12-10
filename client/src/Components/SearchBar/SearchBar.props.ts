import { ISearchObject } from "../../Store/models";

export interface ISearchBarState {
  focused: boolean;
  searchText: string;
  searchData?: ISearchObject[];
}
