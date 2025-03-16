import { toast } from "sonner";
import liff from "@line/liff";

export default function ShareMessage({ formData }) {
    const sendLineMessage = async () => {
        try {
            const flexMessage = {
                type: "flex",
                altText: "預約成功通知",
                contents: {
                    type: "bubble",
                    body: {
                        type: "box",
                        layout: "vertical",
                        contents: [
                            {
                                type: "text",
                                text: "預約資訊",
                                weight: "bold",
                                size: "xxl",
                                margin: "md"
                            },
                            {
                                type: "separator",
                                margin: "xxl"
                            },
                            {
                                type: "box",
                                layout: "vertical",
                                margin: "xxl",
                                spacing: "sm",
                                contents: [
                                    {
                                        type: "box",
                                        layout: "horizontal",
                                        contents: [
                                            {
                                                type: "text",
                                                text: "日期 Date",
                                                size: "sm",
                                                color: "#555555",
                                                flex: 0
                                            },
                                            {
                                                type: "text",
                                                text: formData.date,
                                                size: "sm",
                                                color: "#111111",
                                                align: "end"
                                            }
                                        ]
                                    },
                                    {
                                        type: "box",
                                        layout: "horizontal",
                                        contents: [
                                            {
                                                type: "text",
                                                text: "時間 Time",
                                                size: "sm",
                                                color: "#555555",
                                                flex: 0
                                            },
                                            {
                                                type: "text",
                                                text: formData.selectedTime,
                                                size: "sm",
                                                color: "#111111",
                                                align: "end"
                                            }
                                        ]
                                    },
                                    {
                                        type: "separator",
                                        margin: "xxl"
                                    },
                                    {
                                        type: "box",
                                        layout: "horizontal",
                                        margin: "xxl",
                                        contents: [
                                            {
                                                type: "text",
                                                text: "姓名 Name",
                                                size: "sm",
                                                color: "#555555"
                                            },
                                            {
                                                type: "text",
                                                text: formData.name,
                                                size: "sm",
                                                color: "#111111",
                                                align: "end"
                                            }
                                        ]
                                    },
                                    {
                                        type: "box",
                                        layout: "horizontal",
                                        contents: [
                                            {
                                                type: "text",
                                                text: "連絡電話 Phone",
                                                size: "sm",
                                                color: "#555555"
                                            },
                                            {
                                                type: "text",
                                                text: formData.phone,
                                                size: "sm",
                                                color: "#111111",
                                                align: "end"
                                            }
                                        ]
                                    },
                                    {
                                        type: "box",
                                        layout: "horizontal",
                                        contents: [
                                            {
                                                type: "text",
                                                text: "車牌號碼 License",
                                                size: "sm",
                                                color: "#555555"
                                            },
                                            {
                                                type: "text",
                                                text: formData.license,
                                                size: "sm",
                                                color: "#111111",
                                                align: "end"
                                            }
                                        ]
                                    },
                                    {
                                        type: "box",
                                        layout: "horizontal",
                                        contents: [
                                            {
                                                type: "text",
                                                text: "服務項目 Services",
                                                size: "sm",
                                                color: "#555555"
                                            },
                                            {
                                                type: "text",
                                                text: formData.selectedItems.join(', '),
                                                size: "sm",
                                                color: "#111111",
                                                align: "end"
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                type: "separator",
                                margin: "xxl"
                            },
                            {
                                type: "box",
                                layout: "horizontal",
                                margin: "md",
                                contents: [
                                    {
                                        type: "text",
                                        text: "到府牽車 Pickup Service",
                                        size: "xs",
                                        color: "#aaaaaa",
                                        flex: 0
                                    },
                                    {
                                        type: "text",
                                        color: "#aaaaaa",
                                        size: "xs",
                                        align: "end",
                                        text: formData.needPickup ? "是" : "否"
                                    }
                                ]
                            }
                        ]
                    },
                    styles: {
                        footer: {
                            separator: true
                        }
                    }
                }
            };

            const result = await liff.sendMessages([flexMessage]);
            if (result) {
                toast.success('已發送 LINE 通知');
                return true;
            }
            return false;
        } catch (error) {
            console.error('LINE 訊息發送失敗:', error);
            toast.error('LINE 通知發送失敗');
            return false;
        }
    };

    return { sendLineMessage };
}