
import api from "./api";

// Gửi câu hỏi đến GraphRAG
export const sendMessage = (message, conversationId = null) => {
    return api.post("/api/chat", {
        message,
        conversation_id: conversationId,
        use_context: true,
    });
};

// Lấy lịch sử tin nhắn
export const getMessages = (conversationId) => {
    return api.get(`/api/chat/conversations/${conversationId}/messages`);
};
