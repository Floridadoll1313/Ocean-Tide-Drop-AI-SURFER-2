type SellRoute = {
  path: string;
  cta: string;
};

const ROUTES: Array<{ match: RegExp; route: SellRoute }> = [
  { match: /wave scout/i, route: { path: "/members/products/wave-scout", cta: "See How Wave Scout Can Help" } },
  { match: /sales rider/i, route: { path: "/members/products/sales-rider", cta: "Fix My Sales Follow-Up" } },
  { match: /content creator/i, route: { path: "/members/products/content-creator", cta: "Build My Authority Content" } },
  { match: /customer care cove/i, route: { path: "/members/products/customer-care-cove", cta: "Improve My Customer Support" } },
  { match: /automation architect/i, route: { path: "/members/products/automation-architect", cta: "Map My Automation Plan" } },
  { match: /big kahuna/i, route: { path: "/members/products/big-kahuna", cta: "Talk Strategy With Big Kahuna" } },
];

export function getReportSellRoute(recommendation: string): SellRoute {
  return ROUTES.find(({ match }) => match.test(recommendation))?.route ?? {
    path: "/members",
    cta: "Help Me Implement This",
  };
}
