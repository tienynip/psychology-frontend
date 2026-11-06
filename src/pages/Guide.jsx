import Sidebar from "../components/Sidebar";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./Guide.module.css";

function Guide() {
  return (
    <div className="d-flex flex-column flex-md-row min-vh-100 bg-white">
      <Sidebar />
      <main className="flex-grow-1 min-w-0">
        <div
          className={`container py-4 ${styles.page}`}
          style={{ maxWidth: "780px" }}
        >
          <header className="mb-4 text-center">
            <h2 className="fw-bold fs-4 mb-2">Hướng dẫn sử dụng</h2>
          </header>

          <div
            className={`alert py-3 px-3 mb-4 ${styles.warningBox}`}
            role="alert"
          >
            <h6 className="alert-heading fw-bold small mb-2">
              Lưu ý quan trọng
            </h6>

            <p className="small lh-base mb-0">
              Hệ thống chỉ cung cấp thông tin tham khảo, không thay thế chuyên
              gia tâm lý, bác sĩ hoặc dịch vụ chăm sóc sức khỏe. Người dùng hoàn
              toàn tự chịu trách nhiệm về các quyết định khi áp dụng thông tin
              vào thực tế. Nếu giải pháp của hệ thống không mang lại hiệu quả
              hoặc phát sinh bất kỳ rủi ro và vấn đề, người dùng phải tự chịu
              hoàn toàn trách nhiệm cá nhân, hệ thống và tác giả hoàn toàn không
              chịu trách nhiệm.
            </p>
          </div>

          <section className="mb-3">
            <h5 className="fw-bold fs-6 mb-2">1. Giới thiệu</h5>

            <p className="text-secondary small lh-base mb-0">
              Hệ thống được thiết kế để hỗ trợ người dùng tìm hiểu về tâm lý,
              cảm xúc, hành vi con người và cách ứng xử trong mối quan hệ. Hệ
              thống cung cấp thông tin tham khảo dựa trên nguồn dữ liệu từ sách.
            </p>
          </section>

          <section className="mb-3">
            <h5 className="fw-bold fs-6 mb-2">2. Cách sử dụng</h5>

            <ul className="text-secondary small lh-base ps-4 mb-0">
              <li className="mb-1">
                Đặt câu hỏi rõ ràng, cung cấp đủ ngữ cảnh cần thiết.
              </li>

              <li className="mb-1">
                Mô tả cảm xúc, suy nghĩ hoặc tình huống bạn đang gặp phải.
              </li>

              <li>
                Ví dụ: Tôi hiện nay đang bị mắc tình trạng căng thẳng kéo dài
                nhiều ngày, chán ăn và mất ngủ. Tôi muốn bạn tư vấn và phân tích
                để hiểu rõ hơn về tình trạng của mình và đưa ra một số các giải
                pháp cải thiện.
              </li>
            </ul>
          </section>

          <section className="mb-3">
            <h5 className="fw-bold fs-6 mb-2">3. Phạm vi hỗ trợ</h5>

            <p className="text-secondary small mb-2">
              Hệ thống ưu tiên các chủ đề:
            </p>

            <ul className="text-secondary small lh-base ps-4 mb-0">
              <li className="mb-1">Tâm lý và hành vi con người.</li>
              <li className="mb-1">Nhận diện và điều tiết cảm xúc.</li>
              <li className="mb-1">Tình yêu, giao tiếp và các mối quan hệ.</li>
              <li>Các phương pháp hỗ trợ tâm lý phổ biến.</li>
            </ul>
          </section>

          <section className="mb-3">
            <h5 className="fw-bold fs-6 mb-2">4. Giới hạn của hệ thống</h5>

            <p className="text-secondary small lh-base mb-2">
              Nếu câu hỏi nằm ngoài phạm vi tâm lý hoặc không liên quan đến dữ
              liệu được tích hợp, hệ thống có thể không cung cấp được câu trả
              lời chính xác, đầy đủ hoặc phù hợp.
            </p>

            <p className="text-secondary small lh-base mb-0">
              Ngay cả khi câu hỏi thuộc lĩnh vực tâm lý chuyên sâu, kết quả vẫn
              có thể thiếu thông tin hoặc chưa phù hợp với hoàn cảnh cụ thể.
              Không nên xem nội dung do hệ thống cung cấp để kết luận và chuẩn
              đoán. Lúc này cần đến bệnh viện hoặc bác sĩ chuyên về tâm lý để có
              những giải pháp chuẩn và phù hơn.
            </p>
          </section>

          {/* 5. Lưu ý an toàn */}
          <section className="mb-3">
            <h5 className="fw-bold fs-6 mb-2">5. Lưu ý an toàn</h5>

            <p className="text-secondary small lh-base mb-0">
              Hệ thống chỉ cung cấp thông tin và hỗ trợ tham khảo, không thể
              thay thế chuyên gia tâm lý, bác sĩ hoặc dịch vụ chăm sóc sức khỏe.
              Khi gặp vấn đề nghiêm trọng hoặc trầm cảm về tâm lý, hãy tìm kiếm
              sự hỗ trợ từ những người có chuyên môn phù hợp.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Guide;
