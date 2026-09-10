export type ContactIntent = "talk" | "collaborate";

export const contactCopy: Record<
  ContactIntent,
  { title: string; blurb: string; submit: string }
> = {
  talk: {
    title: "Let's talk",
    blurb: "Quick hello, a role, or something you want to ship together.",
    submit: "Send message",
  },
  collaborate: {
    title: "Let's collaborate",
    blurb: "Got a product idea or build in progress? Tell me what you need.",
    submit: "Start collaboration",
  },
};
