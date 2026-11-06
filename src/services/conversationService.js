
import api from "./api";

// Lấy danh sách conversation
export const getConversations = () => {
    return api.get("/api/chat/conversations");
};

// Lấy lịch sử tin nhắn
export const getMessages = (conversationId) => {
    return api.get(`/api/chat/conversations/${conversationId}/messages`);
};

// Xóa conversation
export const deleteConversation = (conversationId) => {
    return api.delete(`/api/chat/conversations/${conversationId}`);
};
