"use client";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import PhoneLicense from "@/components/PhoneLicense";
import Select_item from "@/components/Select_item";
import Select_time from "@/components/Select_time";
import Confirmation from "@/components/Confirmation";
import { Button } from "@/components/ui/button";
import { init, sendMessages } from "@line/liff";

export default function Home() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const initializeLiff = async () => {
      try {
        await init({ liffId: process.env.NEXT_PUBLIC_LIFF_ID });
      } catch (error) {
        console.error('LIFF 初始化失敗:', error);
      }
    };
    initializeLiff();
  }, []);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    license: "",
    selectedItems: [],
    date: null,
    selectedTime: null,
    needPickup: false
  });

  const handlePrev = () => step > 1 && setStep(step - 1);

  const handleNext = () => {
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
      const response = await fetch('https://mega-reserve-backend.vercel.app/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || '預約失敗，請稍後再試');

      toast.success('預約成功！感謝您的預約');
      try {
        await sendMessages([{
          type: 'text',
          text: `預約成功通知！\n\n預約人：${formData.name}\n手機：${formData.phone}\n車牌：${formData.license}\n預約日期：${formData.date}\n預約時間：${formData.selectedTime}\n服務項目：${formData.selectedItems.join(', ')}${formData.needPickup ? '\n需要到府牽車' : ''}`
        }]);
      } catch (error) {
        console.error('LINE 訊息發送失敗:', error);
      }
      setSuccess(true);
      setFormData({
        name: "",
        phone: "",
        license: "",
        selectedItems: [],
        date: null,
        selectedTime: null,
        needPickup: false
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
  };

  const currentStep = {
    1: <PhoneLicense formData={formData} setFormData={setFormData} />,
    2: <Select_item formData={formData} setFormData={setFormData} />,
    3: <Select_time formData={formData} setFormData={setFormData} />,
    4: <Confirmation formData={formData} />
  }[step];

  return success ? (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col items-center border-2 rounded-lg p-4 w-[300px] backdrop-blur-xl bg-white/20 shadow-xl">
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
  ) : (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col items-center w-[300px] gap-4 h-full backdrop-blur-xl bg-white/20 p-4 rounded-lg shadow-xl">
        {currentStep}
        <div className="flex justify-between w-full mt-auto pb-4">
          <Button
            className="bg-white/70 text-blue-600 border border-blue-600 hover:bg-white/80 hover:text-blue-600 hover:border-blue-600"
            onClick={handlePrev}
            disabled={step === 1}
          >
            上一步
          </Button>
          <Button
            className="bg-white/70 text-blue-600 border border-blue-600 hover:bg-white/80 hover:text-blue-600 hover:border-blue-600"
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
