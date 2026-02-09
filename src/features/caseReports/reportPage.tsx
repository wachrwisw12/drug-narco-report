import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchReportsThunk } from "./reportSlice";

export default function ReportList() {
  const dispatch = useAppDispatch();
  const { list, loading } = useAppSelector((s) => s.report);

  useEffect(() => {
    dispatch(fetchReportsThunk());
  }, [dispatch]);

  if (loading) return <div>loading...</div>;

  return (
    <div>
      <h2>รายการแจ้งเบาะแส</h2>

      {list.map((r) => (
        <div key={r.id} style={{ borderBottom: "1px solid #ddd", padding: 8 }}>
          <div>📌 {r.tracking_code}</div>
          <div>{r.details}</div>
          <div>{new Date(r.created_at).toLocaleString("th-TH")}</div>
        </div>
      ))}
    </div>
  );
}
