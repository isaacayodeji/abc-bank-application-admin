import { useCallback } from "react";
import SearchDatatable from "../fuction/searchData";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setAllGlobalState } from "../app/store";

export const useFilter = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => {
    return state.globalState;
  });

  const onChangeSearch = useCallback(
    async (value: string) => {
      let originalData = state.originalResponse as any;
      let data = await SearchDatatable.Search(originalData ?? [], value);
      const dataSource = data?.map((x: any, index: any) => ({
        ...x,
        key: index + 1,
      }));
      dispatch(
        setAllGlobalState({
          ...state,
          response: dataSource,
        })
      );
    },
    [dispatch, state]
  );

  return { onChangeSearch };
};
