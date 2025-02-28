import React, { useState, useEffect } from 'react';
import { Calendar } from "./ui/calendar";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function Select_time({ formData, setFormData }) {
  const [reservedTimes, setReservedTimes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const times = [
    "08:30", "09:00", "09:30",
    "10:00", "10:30", "11:00",
    "13:00", "14:00", "15:00"
  ];
  const fromDate = new Date();
  const toDate = new Date(new Date().getFullYear(), 11, 31);

  useEffect(() => {
    if (!formData.date) return;
    const checkAvailability = async () => {
      setIsLoading(true);
      try {
        const selectedDate = formData.date;
        const response = await fetch(`https://mega-reserve-backend.vercel.app/api/reservations/check-availability?date=${selectedDate}`);
        const data = await response.json();
        console.log('API返回數據：', data);
        if (data.success) {
          setReservedTimes(data.reservedTimes);
        }
      } catch (error) {
        toast.error('檢查時間段可用性時發生錯誤，請稍後再試');
      } finally {
        setIsLoading(false);
      }
    };
    checkAvailability();
  }, [formData.date]);

  const isTimeExpired = (time) => {
    if (!formData.date) return false;

    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    const selectedDate = new Date(formData.date);
    const selectedDateStr = selectedDate.toISOString().split('T')[0];

    if (selectedDateStr > todayStr) return false;
    if (selectedDateStr < todayStr) return true;

    // 如果是當天，檢查時間是否已過
    const [hours, minutes] = time.split(':').map(Number);
    const timeToCheck = new Date(today.getFullYear(), today.getMonth(), today.getDate(), hours, minutes);

    return today > timeToCheck;
  };
  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <h2 className="text-2xl text-center font-semibold text-blue-600">日期 & 時間</h2>
      <Calendar
        mode="single"
        selected={formData.date ? new Date(formData.date) : null}
        onSelect={(date) => {
          if (!date) {
            setFormData({ ...formData, date: null, selectedTime: null });
            setReservedTimes([]);
            return;
          }
          const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
          setFormData({ ...formData, date: formattedDate, selectedTime: null });
          setReservedTimes([]);
        }}
        fromDate={fromDate}
        toDate={toDate}
        className="rounded-md"
        disabled={(date) => date.getDay() === 0}
      />

      <div className="w-full border border-gray-400"></div>

      {formData.date && !isLoading ? (
        <div className="grid grid-cols-3 gap-4 w-full max-w-md">
          {times.map((time) => {
            const isReserved = reservedTimes.includes(time);
            const expired = isTimeExpired(time);
            return (
              <button
                key={time}
                onClick={() => !isReserved && !expired && setFormData({ ...formData, selectedTime: time })}
                disabled={isReserved || expired}
                className={cn(
                  "rounded-lg py-2 px-4 text-sm font-medium border",
                  isReserved || expired
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
          {isLoading ? "載入時間段中..." : "請選擇日期"}
        </div>
      )}
    </div>
  );
}
