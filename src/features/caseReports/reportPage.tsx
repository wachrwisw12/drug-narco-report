import { useEffect } from "react";
import { useAppDispatch } from "../../store/hooks";
import { fetchReportsThunk } from "./reportSlice";
import { Container, Typography } from "@mui/material";
import CaseReportTable from "../../components/case-reports/CaseReportTable";

export default function ReportList() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchReportsThunk({ status: 0 }));
  }, [dispatch]);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography>รายการเคสแจ้งเบาะแส</Typography>
      <CaseReportTable />
    </Container>
  );
}
