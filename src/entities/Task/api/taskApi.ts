import { baseApi } from "shared/api";
import type { Tasks } from "entities/Task";

export const tasksApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query<Tasks, void>({
      query: () => "/todos",
      transformResponse: (response: Tasks) => response,
    }),
  }),
});

export const { useGetTasksQuery } = tasksApi;
