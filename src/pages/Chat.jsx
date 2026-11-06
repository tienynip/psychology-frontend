import { useRef, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import styles from "./Chat.module.css";

import { getMessages, sendMessage } from "../services/chatService";

function Chat() {
  const { conversationId } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const textareaRef = useRef(null);

  // 1. Lấy lịch sử tin nhắn khi chọn conversation
  useEffect(() => {
    const fetchMessages = async () => {
      if (!conversationId) {
        setMessages([]);
        return;
      }

      try {
        const response = await getMessages(conversationId);
        setMessages(response.data);
      } catch (error) {
        console.error(
          "Lỗi lấy lịch sử chat:",
          error.response?.data || error.message,
        );
      }
    };

    fetchMessages();
  }, [conversationId]);

  // 2. Gửi câu hỏi đến Backend / GraphRAG
  const handleSubmit = async (e) => {
    e.preventDefault();

    const content = message.trim();

    if (!content || loading) return;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: content,
      },
    ]);

    setMessage("");
    setLoading(true);

    if (textareaRef.current) {
      textareaRef.current.style.height = "";
    }

    try {
      const response = await sendMessage(content, conversationId || null);

      const data = response.data;

      // Đồng bộ conversation ID với React Router
      if (!conversationId && data.conversation_id) {
        navigate(`/chat/${data.conversation_id}`, {
          replace: true,
        });
      }

      setMessages(data.messages);
    } catch (error) {
      console.error("Lỗi gửi tin nhắn:", error.response?.data || error.message);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Hệ thống đang gặp lỗi. Vui lòng thử lại sau.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // 3. Xử lý nhập nội dung và tự động tăng chiều cao textarea
  const handleChange = (e) => {
    const textarea = e.target;

    setMessage(textarea.value);

    textarea.style.height = "auto";
    textarea.style.height = Math.min(textarea.scrollHeight, 200) + "px";
  };

  return (
    <div className={`d-flex flex-column flex-md-row ${styles.layout}`}>
      <Sidebar />

      <div className={styles.main}>
        <main className={`px-3 px-md-4 px-lg-5 ${styles.chatPage}`}>
          <section className={`py-3 py-md-4 ${styles.messages}`}>
            <div className={styles.welcome}>
              <h5>Hihi, rất vui được trò chuyện với bạn!</h5>
            </div>

            {/* Hiển thị tin nhắn */}
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`${styles.messageExample} ${
                  msg.role === "user" ? styles.userMessage : styles.aiMessage
                }`}
              >
                <div className={styles.messageContent}>
                  <p>{msg.content}</p>
                </div>
              </div>
            ))}

            {/* Loading khi AI đang trả lời */}
            {loading && (
              <div className={`${styles.messageExample} ${styles.aiMessage}`}>
                <div className={styles.messageContent}>
                  <p>Đang suy nghĩ...</p>
                </div>
              </div>
            )}
          </section>

          {/* Khu vực nhập câu hỏi */}
          <div className={`pt-2 pb-3 pb-md-4 ${styles.inputWrapper}`}>
            <form className={styles.inputArea} onSubmit={handleSubmit}>
              <textarea
                ref={textareaRef}
                value={message}
                onChange={handleChange}
                placeholder="Nhập câu hỏi của bạn..."
                rows={1}
                disabled={loading}
              />

              <div className={styles.inputActions}>
                <button
                  type="submit"
                  className={styles.sendButton}
                  disabled={!message.trim() || loading}
                >
                  {loading ? "Đang gửi..." : "Gửi"}
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Chat;
