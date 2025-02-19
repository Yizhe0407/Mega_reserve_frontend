
import React, { useState, useEffect } from 'react';
import { Calendar } from "./ui/calendar";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function Select_time({ formData, setFormData }) {
  const [reservedTimes, setReservedTimes] = useState([]);

  const times = [
    "09:00", "10:00", "11:00",
    "12:00", "13:00", "14:00",
    "15:00", "16:00", "17:00"
  ];
  const fromDate = new Date();
  const toDate = new Date(new Date().getFullYear(), 11, 31);

  useEffect(() => {
    const checkAvailability = async () => {
      if (!formData.date) return;
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
    <div className="flex flex-col items-center gap-4 p-4">
      <Calendar
        mode="single"
        selected={formData.date}
        onSelect={(date) => setFormData({ ...formData, date })}
        fromDate={fromDate}
        toDate={toDate}
        className="rounded-md border"
      />
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
              {isReserved}
            </button>
          );
        })}
      </div>
    </div>
  );
}
