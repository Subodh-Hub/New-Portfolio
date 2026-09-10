"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";
import { contactCopy, type ContactIntent } from "@/lib/contact";

type ContactFormProps = {
  intent: ContactIntent;
};

const schema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required!!!"),
  message: Yup.string().required("Message is required!!!"),
});

async function saveToSupabase(payload: {
  email: string;
  message: string;
  intent: ContactIntent;
}) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anon) return;

  const res = await fetch(`${url}/functions/v1/contact`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${anon}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const data = (await res.json().catch(() => null)) as { error?: string } | null;
    throw new Error(data?.error ?? "Failed to save message");
  }
}

export function ContactForm({ intent }: ContactFormProps) {
  const copy = contactCopy[intent];

  const formik = useFormik({
    initialValues: { email: "", message: "" },
    validationSchema: schema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
      const templateId =
        intent === "talk"
          ? process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_TALK
          : process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_COLLABORATE;

      if (!serviceId || !templateId || !publicKey) {
        toast.error("Contact form is not configured yet.");
        setSubmitting(false);
        return;
      }

      const toastId = toast.loading("Sending message…");
      const payload = { ...values, intent };

      try {
        await emailjs.send(serviceId, templateId, payload, publicKey);
        try {
          await saveToSupabase(payload);
        } catch {
          // email ok
        }
        toast.success("Message sent successfully!", { id: toastId });
        resetForm();
      } catch (error) {
        const raw =
          error && typeof error === "object" && "text" in error
            ? String((error as { text: string }).text)
            : error instanceof Error
              ? error.message
              : "Something went wrong";

        const gmailDead = /invalid grant|reconnect your gmail/i.test(raw);

        try {
          await saveToSupabase(payload);
          toast.success(
            gmailDead
              ? "Saved. Reconnect Gmail in EmailJS to also email you."
              : "Message saved. Email delivery failed.",
            { id: toastId },
          );
          resetForm();
        } catch {
          toast.error(
            gmailDead
              ? "Gmail disconnected in EmailJS — reconnect the service, then retry."
              : `Failed to send message: ${raw}`,
            { id: toastId },
          );
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const errors = await formik.validateForm();

    if (Object.keys(errors).length > 0) {
      formik.setTouched({ email: true, message: true });
      const firstError = Object.values(errors)[0];
      if (typeof firstError === "string") toast.error(firstError);
      return;
    }

    await formik.submitForm();
  };

  return (
    <form
      id={`contact-${intent}`}
      className="contact-form"
      onSubmit={handleSubmit}
      noValidate
    >
      <h3>{copy.title}</h3>
      <p>{copy.blurb}</p>

      <label className="contact-field">
        <span>Email</span>
        <input
          type="email"
          name="email"
          autoComplete="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="you@email.com"
        />
        {formik.touched.email && formik.errors.email ? (
          <em>{formik.errors.email}</em>
        ) : null}
      </label>

      <label className="contact-field">
        <span>Message</span>
        <textarea
          name="message"
          rows={5}
          value={formik.values.message}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="What are you building?"
        />
        {formik.touched.message && formik.errors.message ? (
          <em>{formik.errors.message}</em>
        ) : null}
      </label>

      <button
        type="submit"
        className="contact-submit"
        disabled={formik.isSubmitting}
      >
        {formik.isSubmitting ? "Sending…" : copy.submit}
      </button>
    </form>
  );
}
