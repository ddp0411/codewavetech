import { CheckIcon } from "@/components/ui/Icons";
import { ChartBars } from "./ChartBars";

/** Decorative dashboard + phone mockup built in HTML/CSS (hidden from assistive tech). */
export function ProductMockup() {
  return (
    <div className="mock" aria-hidden="true">
      <div className="win">
        <div className="win-bar">
          <i />
          <i />
          <i />
          <span>app.yourbusiness.in/dashboard</span>
        </div>
        <div className="win-body">
          <div className="win-side">
            <i className="on" />
            <i />
            <i />
            <i />
            <i />
          </div>
          <div className="win-main">
            <div className="wt">
              Today&apos;s overview <span>3 outlets · live</span>
            </div>
            <div className="kpis">
              <div>
                <small>Sales</small>
                <b>₹48,250</b>
                <em>▲ 12%</em>
              </div>
              <div>
                <small>Orders</small>
                <b>126</b>
                <em>▲ 8%</em>
              </div>
              <div>
                <small>GST collected</small>
                <b>₹7,360</b>
                <em>Auto-filed</em>
              </div>
            </div>
            <ChartBars />
            <div className="rows">
              <div>
                <span>#1042 · Table 6</span>
                <b>₹1,840</b>
                <span className="st">Paid · UPI</span>
              </div>
              <div>
                <span>#1041 · Online</span>
                <b>₹960</b>
                <span className="st">Out for delivery</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="phone-m">
        <div className="scr">
          <small>9:41</small>
          <div className="notif wa">
            <b>WhatsApp order bot</b>New order #1043 confirmed. ETA 25 min.
          </div>
          <div className="notif">
            <b>Razorpay</b>₹1,840 received
          </div>
          <div className="notif">
            <b>Stock alert</b>Paneer below 2 kg
          </div>
        </div>
      </div>
      <div className="float">
        <i>
          <CheckIcon size={14} />
        </i>
        <span>
          Deployed to production<small>build passed · 42s</small>
        </span>
      </div>
    </div>
  );
}
