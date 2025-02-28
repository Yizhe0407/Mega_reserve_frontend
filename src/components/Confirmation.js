import { Card, CardContent } from "@/components/ui/card";

export default function Confirmation({ formData }) {
  return (
    <div className="flex flex-col gap-4 items-center w-full">
      <h2 className="text-2xl font-semibold text-blue-600">預約資訊</h2>
      <Card className="w-[250px] bg-transparent border-gray-300">
        <CardContent className="p-4">
          <div className="space-y-3">
            <div>
              <p className="text-gray-500">預約日期 Date</p>
              <p className="font-medium">{new Date(formData.date).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-gray-500">預約時間 Time</p>
              <p className="font-medium">{formData.selectedTime}</p>
            </div>
            <div>
              <p className="text-gray-500">姓名 Name</p>
              <p className="font-medium">{formData.name}</p>
            </div>
            <div>
              <p className="text-gray-500">聯絡電話 Phone</p>
              <p className="font-medium">{formData.phone}</p>
            </div>
            <div>
              <p className="text-gray-500">服務項目 Services</p>
              <p className="font-medium">{formData.selectedItems.join(", ")}</p>
            </div>
            <div>
              <p className="text-gray-500">車牌號碼 License</p>
              <p className="font-medium">{formData.license}</p>
            </div>
            <div>
              <p className="text-gray-500">到府牽車 Pickup Service</p>
              <p className="font-medium">{formData.needPickup ? "是" : "否"}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <p className="text-sm text-end  text-gray-400">請再次檢查預約資訊是否正確無誤</p>
    </div>
  );
}