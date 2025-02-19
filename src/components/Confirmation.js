import { Card, CardContent } from "@/components/ui/card";

export default function Confirmation({ formData }) {
  return (
    <div className="flex flex-col items-center w-full h-full p-4">
      <h2 className="text-2xl font-semibold text-blue-600 mb-4">預約資訊 info</h2>
      <Card className="w-full">
        <CardContent className="p-4">
          <div className="space-y-3">
            <div>
              <p className="text-gray-500">預約日期 Date</p>
              <p className="font-medium">{formData.date.toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-gray-500">預約時間 Time</p>
              <p className="font-medium">{formData.selectedTime}</p>
            </div>
            <div>
              <p className="text-gray-500">服務項目 Services</p>
              <p className="font-medium">{formData.selectedItems.join(", ")}</p>
            </div>
            <div>
              <p className="text-gray-500">聯絡電話 Phone</p>
              <p className="font-medium">{formData.phone}</p>
            </div>
            <div>
              <p className="text-gray-500">車牌號碼 License</p>
              <p className="font-medium">{formData.license}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}