import { API_URLS } from "../constants/api-urls"
import { apiService } from "../services/Api"

export const createTaskApi = ({ userId, boardId, data }) => {
    return apiService.post(`${userId}/${API_URLS.tasks}/${boardId}`, data);

}

export const getTasksApi = (userId, boardId) => {
    return apiService.get(`${userId}/${API_URLS.tasks}/${boardId}`);
}
