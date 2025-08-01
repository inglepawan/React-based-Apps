import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar } from "@/components/ui/calendar"; // optional for date picker
import { getAttendanceReport } from "@/api/attendance";
import { format } from "date-fns";

const AttendanceReport = () => {
  const [data, setData] = useState([]);
  const [dateRange, setDateRange] = useState([]);

  const fetchReport = useCallback(async () => {
    if (dateRange.length !== 2) return;
    try {
      const report = await getAttendanceReport(
        'current-user-id',
        format(dateRange[0], 'yyyy-MM-dd'),
        format(dateRange[1], 'yyyy-MM-dd')
      );
      setData(report);
    } catch (error) {
      console.error(error);
    }
  }, [dateRange]);

  useEffect(() => {
    fetchReport();
  }, [fetchReport]);

  const stats = data.reduce((acc, rec) => {
    if (rec.status === "Present") acc.present++;
    if (rec.status === "Absent") acc.absent++;
    if (rec.status === "Half Day") acc.halfDay++;
    return acc;
  }, { present: 0, absent: 0, halfDay: 0 });

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Attendance Report</h1>

      <div className="flex items-center gap-4">
        <Calendar
          mode="range"
          selected={dateRange}
          onSelect={setDateRange}
          className="border rounded-md"
        />
        <Button disabled={!data.length}>Export</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-4">
          <p className="text-muted-foreground">Present Days</p>
          <p className="text-xl font-bold text-green-600">{stats.present}</p>
        </Card>
        <Card className="p-4">
          <p className="text-muted-foreground">Absent Days</p>
          <p className="text-xl font-bold text-red-600">{stats.absent}</p>
        </Card>
        <Card className="p-4">
          <p className="text-muted-foreground">Half Days</p>
          <p className="text-xl font-bold text-yellow-500">{stats.halfDay}</p>
        </Card>
      </div>

      <Card className="p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Check In</TableHead>
              <TableHead>Check Out</TableHead>
              <TableHead>Hours</TableHead>
              <TableHead>Overtime</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, i) => (
              <TableRow key={i}>
                <TableCell>{row.date}</TableCell>
                <TableCell>
                  <span className={`rounded px-2 py-1 text-xs ${row.status === 'Present' ? 'bg-green-100 text-green-800' : row.status === 'Absent' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {row.status}
                  </span>
                </TableCell>
                <TableCell>{row.checkIn}</TableCell>
                <TableCell>{row.checkOut}</TableCell>
                <TableCell>{row.hours}</TableCell>
                <TableCell>{row.overtime}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default AttendanceReport;
