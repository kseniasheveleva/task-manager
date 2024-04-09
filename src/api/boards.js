import { API_URLS } from "../constants/api-urls"
import { apiService } from "../services/Api"

export const createBoard = (userId, data) => {
    return apiService.post(`${userId}/${API_URLS.boards}`, data);

}

export const getBoards = (userId) => {
    return apiService.get(`${userId}/${API_URLS.boards}`);
}

export const deleteBoard = (userId, boardId) => {
    return apiService.delete(`${userId}/${API_URLS.boards}/${boardId}`);
}