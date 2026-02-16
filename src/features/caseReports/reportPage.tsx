import { useEffect } from "react";
import { useAppDispatch } from "../../store/hooks";
import { fetchReportsThunk } from "./reportSlice";
import { Container, Typography } from "@mui/material";
import CaseReportTable from "../../components/case-reports/CaseReportTable";

export default function ReportList() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchReportsThunk());
  }, [dispatch]);

  return (
    <Container>
      <Typography>รายการเคสแจ้งเบาะแส</Typography>
      <CaseReportTable />
    </Container>
  );
}
