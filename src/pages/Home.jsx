import { useNavigate } from "react-router-dom";
import { MessageSquare, Network, FileText, ArrowRight } from "lucide-react";
import Sidebar from "../components/Sidebar";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./Home.module.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div
      className={`${styles.layout} d-flex flex-column flex-md-row min-vh-100`}
    >
      <Sidebar />

      <main className={`${styles.main} flex-grow-1 min-w-0`}>
        <div className="container-fluid px-3 px-md-4 px-lg-5 py-4 py-md-5">
          <section className={`${styles.hero} mb-5`}>
            <h1 className="display-5 fw-bold mb-3">
              Khám phá tri thức
              <br />
              cùng <span>GraphRAG AI</span>
            </h1>

            <p className="text-secondary fs-6 lh-lg mb-0">
              Trợ lý AI giúp bạn tìm kiếm thông tin, kết nối kiến thức và khai
              thác nội dung từ tài liệu một cách thông minh.
            </p>
          </section>

          <section className={styles.features}>
            <h2 className="h4 fw-bold mb-4">Bạn có thể làm gì?</h2>

            <div className="row g-3 g-lg-4">
              <div className="col-12 col-md-4">
                <article className={`${styles.featureCard} h-100`}>
                  <div className={styles.featureIcon}>
                    <MessageSquare size={23} />
                  </div>

                  <h3 className="h6 fw-bold mb-3">Trò chuyện thông minh</h3>

                  <p className="text-secondary small lh-lg flex-grow-1">
                    Đặt câu hỏi bằng ngôn ngữ tự nhiên và nhận câu trả lời từ hệ
                    thống AI.
                  </p>

                  <button
                    type="button"
                    className={styles.cardButton}
                    onClick={() => navigate("/chat")}
                  >
                    Trò chuyện
                    <ArrowRight size={16} />
                  </button>
                </article>
              </div>

              <div className="col-12 col-md-4">
                <article className={`${styles.featureCard} h-100`}>
                  <div className={styles.featureIcon}>
                    <Network size={23} />
                  </div>

                  <h3 className="h6 fw-bold mb-3">Kết nối tri thức</h3>

                  <p className="text-secondary small lh-lg flex-grow-1">
                    Khai thác mối quan hệ giữa các thông tin để hỗ trợ tìm kiếm
                    và tổng hợp kiến thức.
                  </p>

                  <button
                    type="button"
                    className={styles.cardButton}
                    onClick={() => navigate("/guide")}
                  >
                    Tìm hiểu thêm
                    <ArrowRight size={16} />
                  </button>
                </article>
              </div>

              <div className="col-12 col-md-4">
                <article className={`${styles.featureCard} h-100`}>
                  <div className={styles.featureIcon}>
                    <FileText size={23} />
                  </div>

                  <h3 className="h6 fw-bold mb-3">Tra cứu tài liệu</h3>

                  <p className="text-secondary small lh-lg flex-grow-1">
                    Hỗ trợ tìm kiếm nội dung tài liệu và hiểu thông tin theo ngữ
                    cảnh.
                  </p>

                  <button
                    type="button"
                    className={styles.cardButton}
                    onClick={() => navigate("/guide")}
                  >
                    Xem hướng dẫn
                    <ArrowRight size={16} />
                  </button>
                </article>
              </div>
            </div>

            <div className={styles.bottomAction}>
              <button
                type="button"
                className={styles.primaryButton}
                onClick={() => navigate("/chat")}
              >
                Bắt đầu trò chuyện
                <ArrowRight size={18} />
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Home;
