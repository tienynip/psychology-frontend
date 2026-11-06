import { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  House,
  MessageSquare,
  BookOpen,
  Network,
  ChevronUp,
  UserRound,
  Settings,
  LogOut,
  Trash2,
  Menu,
  Plus,
} from "lucide-react";
import styles from "./Sidebar.module.css";
import { getCurrentUser } from "../services/authService";
import {
  getConversations,
  deleteConversation,
} from "../services/conversationService";

const FIRST_PAGE = 10; // số đoạn chat hiện lúc đầu
const LOAD_STEP = 5; // mỗi lần bấm "Xem thêm" mở thêm

// TODO: thay bằng dữ liệu lấy từ API

function Sidebar({ onNavigate }) {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Ngăn kéo thanh bên trên điện thoại (máy tính không dùng state này)
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [chats, setChats] = useState([]);
  const [visibleCount, setVisibleCount] = useState(FIRST_PAGE);
  const [activeChatId, setActiveChatId] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [user, setUser] = useState(null);

  const visibleChats = chats.slice(0, visibleCount);
  const hasMore = chats.length > visibleCount;

  // Đóng ngăn kéo (gọi sau khi chuyển trang / chọn đoạn chat)
  const closeDrawer = () => {
    setDrawerOpen(false);
    onNavigate?.();
  };

  // Khóa cuộn trang phía sau khi ngăn kéo đang mở
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getCurrentUser();
        setUser(response.data);
      } catch (error) {
        console.error("Lỗi lấy thông tin user:", error);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await getConversations();
        setChats(response.data);
      } catch (error) {
        console.error("Lỗi lấy danh sách conversation:", error);
      }
    };
    fetchConversations();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    window.location.href = "/login";
  };

  const handleSelectChat = (id) => {
    setActiveChatId(id);
    setConfirmDeleteId(null);
    navigate(`/chat/${id}`);
    closeDrawer();
  };

  const handleDeleteChat = async (id) => {
    try {
      await deleteConversation(id);
      setChats((prev) => prev.filter((chat) => chat.id !== id));
      if (activeChatId === id) {
        setActiveChatId(null);
      }
      setConfirmDeleteId(null);
    } catch (error) {
      console.error("Lỗi xóa conversation:", error);
    }
  };

  return (
    <>
      {/* ===== Thanh trên cùng (chỉ hiện trên điện thoại) ===== */}
      <header className={styles.mobileHeader}>
        <button
          type="button"
          className={styles.mobileMenuButton}
          onClick={() => setDrawerOpen(true)}
          aria-label="Mở menu"
        >
          <Menu size={22} />
        </button>

        <NavLink to="/" end className={styles.mobileBrand}>
          <Network size={20} />
          <span>GraphRAG AI</span>
        </NavLink>

        <button
          type="button"
          className={styles.mobileMenuButton}
          onClick={() => navigate("/chat")}
          aria-label="Cuộc trò chuyện mới"
        >
          <Plus size={22} />
        </button>
      </header>

      {/* Lớp nền mờ: bấm vào để đóng ngăn kéo */}
      <div
        className={`${styles.backdrop} ${
          drawerOpen ? styles.backdropVisible : ""
        }`}
        onClick={() => setDrawerOpen(false)}
        aria-hidden="true"
      />

      <aside
        className={`${styles.sidebar} ${drawerOpen ? styles.sidebarOpen : ""}`}
      >
        <NavLink to="/" end className={styles.logo} onClick={closeDrawer}>
          <Network size={27} />
          <span>GraphRAG AI</span>
        </NavLink>

        <nav className={styles.navigation}>
          <NavLink
            to="/home"
            onClick={closeDrawer}
            className={({ isActive }) =>
              `${styles.navItem} ${isActive ? styles.active : ""}`
            }
          >
            <House size={19} />
            <span>Trang chủ</span>
          </NavLink>

          <NavLink
            to="/chat"
            onClick={closeDrawer}
            className={({ isActive }) =>
              `${styles.navItem} ${isActive ? styles.active : ""}`
            }
          >
            <MessageSquare size={19} />
            <span>Trò chuyện</span>
          </NavLink>

          <NavLink
            to="/guide"
            onClick={closeDrawer}
            className={({ isActive }) =>
              `${styles.navItem} ${isActive ? styles.active : ""}`
            }
          >
            <BookOpen size={19} />
            <span>Hướng dẫn sử dụng</span>
          </NavLink>
        </nav>

        {/* ===== Lịch sử chat ===== */}
        <div className={styles.history}>
          <p className={styles.historyTitle}>Gần đây</p>

          {chats.length === 0 ? (
            <p className={styles.historyEmpty}>Chưa có đoạn chat nào</p>
          ) : (
            <ul className={styles.historyList}>
              {visibleChats.map((chat) => (
                <li key={chat.id}>
                  {confirmDeleteId === chat.id ? (
                    <div className={styles.confirmRow}>
                      <span>Xóa đoạn chat này?</span>
                      <div className={styles.confirmActions}>
                        <button
                          type="button"
                          className={styles.confirmYes}
                          onClick={() => handleDeleteChat(chat.id)}
                        >
                          Xóa
                        </button>
                        <button
                          type="button"
                          className={styles.confirmNo}
                          onClick={() => setConfirmDeleteId(null)}
                        >
                          Hủy
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div
                      className={`${styles.historyItem} ${
                        activeChatId === chat.id ? styles.historyActive : ""
                      }`}
                    >
                      <button
                        type="button"
                        className={styles.historyLink}
                        onClick={() => handleSelectChat(chat.id)}
                        title={chat.title}
                      >
                        {chat.title}
                      </button>

                      <button
                        type="button"
                        className={styles.deleteButton}
                        onClick={() => setConfirmDeleteId(chat.id)}
                        aria-label={`Xóa đoạn chat ${chat.title}`}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}

          {hasMore && (
            <button
              type="button"
              className={styles.loadMore}
              onClick={() => setVisibleCount((count) => count + LOAD_STEP)}
            >
              Xem thêm
            </button>
          )}
        </div>

        {/* ===== Tài khoản ===== */}
        <div className={styles.sidebarBottom} ref={menuRef}>
          {menuOpen && (
            <div className={styles.accountMenu}>
              <div className={styles.accountInfo}>
                <div className={styles.avatar}>U</div>
                <div>
                  <strong>{user?.username}</strong>
                  {/* <small>Tài khoản GraphRAG AI</small> */}
                </div>
              </div>

              <div className={styles.divider} />

              <button
                type="button"
                className={styles.menuItem}
                onClick={() => setMenuOpen(false)}
              >
                <UserRound size={17} />
                Tài khoản
              </button>

              <button
                type="button"
                className={styles.menuItem}
                onClick={() => setMenuOpen(false)}
              >
                <Settings size={17} />
                Cài đặt
              </button>

              <div className={styles.divider} />

              <button
                type="button"
                className={`${styles.menuItem} ${styles.logout}`}
                onClick={handleLogout}
              >
                <LogOut size={17} />
                Đăng xuất
              </button>
            </div>
          )}

          <button
            type="button"
            className={styles.accountButton}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
          >
            <div className={styles.avatar}>U</div>

            <div className={styles.accountText}>
              <strong>{user?.username}</strong>
              {/* <small>GraphRAG AI</small> */}
            </div>

            <ChevronUp
              size={17}
              className={menuOpen ? styles.chevronDown : ""}
            />
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
