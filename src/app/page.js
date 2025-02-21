"use client";
import { useState } from "react";
import { toast } from "sonner";
import PhoneLicense from "@/components/PhoneLicense";
import Select_item from "@/components/Select_item";
import Select_time from "@/components/Select_time";
import Confirmation from "@/components/Confirmation";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    phone: "",
    license: "",
    selectedItems: [],
    date: null,
    selectedTime: null
  });

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleNext = () => {
    // 驗證當前步驟
    if (step === 1 && (!formData.phone || !formData.license)) {
      toast.error('請填寫手機和車牌號碼');
      return;
    }
    if (step === 2 && formData.selectedItems.length === 0) {
      toast.error('請至少選擇一項服務');
      return;
    }
    if (step === 3 && !formData.selectedTime) {
      toast.error('請選擇預約時間');
      return;
    }
    if (step < 4) setStep(step + 1);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('https://mega-reserve-backend.vercel.app/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || '預約失敗，請稍後再試');
      }

      toast.success('預約成功！感謝您的預約');
      setSuccess(true);
      // 清空表單數據
      setFormData({
        phone: "",
        license: "",
        selectedItems: [],
        date: new Date(),
        selectedTime: null
      });
      
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setStep(1);
    setSuccess(false);
    setError(null);
  };

  if (success) {
    return (
      <div className="flex justify-center items-center p-4 h-full">
        <div className="flex flex-col items-center border-2 rounded-lg p-4 w-[300px]">
          <h2 className="text-xl font-bold text-green-600 mb-4">預約成功！</h2>
          <p className="text-gray-600 mb-4">感謝您的預約</p>
          <Button 
            className="w-full bg-blue-600 text-white hover:bg-blue-700"
            onClick={handleReset}
          >
            返回首頁
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center px-16 py-4 h-[630px]">
      <div className="flex flex-col items-center w-[500px] h-full">


        {step === 1 && <PhoneLicense formData={formData} setFormData={setFormData} />}
        {step === 2 && <Select_item formData={formData} setFormData={setFormData} />}
        {step === 3 && <Select_time formData={formData} setFormData={setFormData} />}
        {step === 4 && <Confirmation formData={formData} />}

        <div className="flex justify-between w-full mt-auto">
          <Button 
            className="bg-white text-blue-600 border border-blue-600 hover:bg-white hover:text-blue-600 hover:border-blue-600"
            onClick={handlePrev}
            disabled={step === 1}
          >
            上一步
          </Button>
          <Button 
            className=" bg-white text-blue-600 border border-blue-600 hover:bg-white hover:text-blue-600 hover:border-blue-600"
            onClick={step === 4 ? handleSubmit : handleNext}
            disabled={loading}
          >
            {step === 4 ? (loading ? "提交中..." : "確認預約") : "下一步"}
          </Button>
        </div>
      </div>
    </div>
  );
}
