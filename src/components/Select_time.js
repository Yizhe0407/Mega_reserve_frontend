import React, { useState, useEffect } from 'react';
import { Calendar } from "./ui/calendar";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function Select_time({ formData, setFormData }) {
  const [reservedTimes, setReservedTimes] = useState([]);

  const times = [
    "08:30", "09:00", "09:30",
    "10:00", "10:30", "11:00",
    "13:00", "14:00", "15:00"
  ];
  const fromDate = new Date();
  const toDate = new Date(new Date().getFullYear(), 11, 31);

  useEffect(() => {
    if (!formData.date) return; // 如果沒有選擇日期，不執行檢查
    const checkAvailability = async () => {
      try {
        const response = await fetch(`https://mega-reserve-backend.vercel.app/api/reservations/check-availability?date=${formData.date.toISOString()}`);
        const data = await response.json();
        if (data.success) {
          setReservedTimes(data.reservedTimes);
        }
      } catch (error) {
        toast.error('檢查時間段可用性時發生錯誤，請稍後再試');
      }
    };
    checkAvailability();
  }, [formData.date]);
  return (
    <div className="flex flex-col items-center gap-4 w-[250px]">
      <h2 className="text-2xl text-center font-semibold text-blue-600">日期 & 時間</h2>
      <Calendar
        mode="single"
        selected={formData.date}
        onSelect={(date) => setFormData({ ...formData, date, selectedTime: null })}
        fromDate={fromDate}
        toDate={toDate}
        className="rounded-md border"
        disabled={(date) => date.getDay() === 0}
      />
      {formData.date ? (
        <div className="grid grid-cols-3 gap-4 w-full max-w-md">
          {times.map((time) => {
            const isReserved = reservedTimes.includes(time);
            return (
              <button
                key={time}
                onClick={() => !isReserved && setFormData({ ...formData, selectedTime: time })}
                disabled={isReserved}
                className={cn(
                  "rounded-lg py-2 px-4 text-sm font-medium border",
                  isReserved
                    ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                    : formData.selectedTime === time
                    ? "bg-blue-600 text-white border-blue-600"
                    : "border-blue-200 hover:border-blue-600"
                )}
              >
                {time}
              </button>
            );
          })}
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-4">
          請選擇日期
        </div>
      )}
    </div>
  );
}
