"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

export function CalendarEmbed({ onBookingSuccess }: { onBookingSuccess: () => void }) {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({"namespace":"quant-partners-dental-edition"});
      cal("ui", {"theme":"dark","hideEventTypeDetails":false,"layout":"month_view"});
      
      cal("on", {
        action: "bookingSuccessful",
        callback: () => {
          onBookingSuccess();
        }
      });
    })();
  }, [onBookingSuccess]);

  return (
    <div className="w-full h-full rounded-2xl overflow-hidden shadow-sm">
      <Cal 
        namespace="quant-partners-dental-edition"
        calLink="the-quant-partners/quant-partners-dental-edition"
        style={{ width: "100%", height: "100%", overflow: "scroll" }}
        config={{ "layout": "month_view", "useSlotsViewOnSmallScreen": "true", "theme": "dark" }}
      />
    </div>
  );
}
