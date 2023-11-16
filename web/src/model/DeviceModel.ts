export interface DeviceModel {
  code: string;
  brand?: string;
  name: string;
  type: "robot" | "drone";
  capabilities: "pick_delivery" | "surveillance";
}
