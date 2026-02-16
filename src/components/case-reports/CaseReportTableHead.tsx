import { TableCell, TableHead, TableRow } from "@mui/material";

export default function CaseReportTableHead() {
  return (
    <TableHead>
      <TableRow>
        <TableCell>เลขเคส</TableCell>
        <TableCell>หมายเลข tracking</TableCell>
        <TableCell>รายละเอียด</TableCell>
        <TableCell>วันที่แจ้ง</TableCell>
        <TableCell>รูปประกอบ</TableCell>
        <TableCell>พืิ้นที่</TableCell>
        <TableCell>จัดการ</TableCell>
      </TableRow>
    </TableHead>
  );
}
