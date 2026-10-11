import { describe, expect, it } from "vitest";
import { getAdminNotificationTemplate, getUserConfirmationTemplate } from "../email-templates";

const hostile = {
  name: '<img src=x onerror="alert(1)">',
  email: "evil@example.com",
  company: "<b>ACME</b>",
  message: "</p><script>steal()</script>",
};

describe.each([
  ["admin notification", getAdminNotificationTemplate],
  ["user confirmation", getUserConfirmationTemplate],
])("%s template", (_, render) => {
  it("escapes user-supplied fields", () => {
    const html = render(hostile);
    expect(html).not.toContain("<script>");
    expect(html).not.toContain("<img");
    expect(html).not.toContain("<b>ACME</b>");
    expect(html).toContain("&lt;script&gt;steal()&lt;/script&gt;");
  });

  it("renders the sender name and falls back to N/A for company", () => {
    const html = render({ name: "Ana", email: "ana@example.co", message: "Hola" });
    expect(html).toContain("Ana");
    expect(html).toContain("N/A");
  });
});
