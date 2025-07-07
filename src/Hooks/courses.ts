import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { callApi } from "../api/apiService";
import { apiUrls } from "../api/apiUrl";
import type { ApiResponse } from "../Interface/interface";

export const useGetCoursesApi = () => {
  return useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      try {
        const response = await callApi(apiUrls.courses, "GET");
        return response as ApiResponse;
      } catch (error) {
        throw error;
      }
    },
  });
};
export const useCoursesAddApi = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      const response = await callApi(apiUrls.courses, "POST", data);
      return response as ApiResponse;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      queryClient.invalidateQueries({ queryKey: ["login"] });
    },
  });
};

export const coursesUpdateApi = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: { id: string; formData: FormData }) => {
      const response = await callApi(
        `${apiUrls.courses}/${payload.id}`,
        "PUT",
        payload.formData
      );
      return response as ApiResponse;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
    onError: (error) => {
      console.error(error);
    },
  });
};
// export const carrerStatusUpdateApi = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: async (payload: {
//       id: string;
//       status: string;
//     }) => {
//       const response = await callApi(
//         `${apiUrls.carrersStatus}/${payload.id}`,
//         "PUT",
//         {
//           status: payload.status,
//           id: payload.id,
//         }
//       );
//       return response as ApiResponse;
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["carrers"] });
//     },
//     onError: (error) => {
//       console.error(error);
//     },
//   });
// };

export const coursesDeleteApi = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await callApi(
        `${apiUrls.courses}/${id}`,
        "DELETE",
      );
      return response as ApiResponse;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
    onError: (error) => {
      console.error(error);
    },
  });
};
