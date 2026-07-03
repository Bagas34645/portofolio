"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2, Send, XCircle } from "lucide-react";
import { contactSchema, type ContactInput } from "@/lib/contact-schema";
import { siteConfig } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type SubmitState =
  | { status: "idle" }
  | { status: "success"; fallback: boolean }
  | { status: "error"; message: string };

const inputClasses =
  "w-full rounded-lg border border-border bg-card px-3.5 py-2.5 text-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-ring aria-[invalid=true]:border-red-500";

export function ContactForm() {
  const [state, setState] = useState<SubmitState>({ status: "idle" });

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactInput) => {
    setState({ status: "idle" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();

      if (!res.ok) {
        setState({
          status: "error",
          message: json.error ?? "Terjadi kesalahan. Coba lagi nanti.",
        });
        return;
      }

      setState({ status: "success", fallback: Boolean(json.fallback) });
      if (!json.fallback) reset();
    } catch {
      setState({
        status: "error",
        message: "Tidak dapat terhubung ke server. Periksa koneksi Anda.",
      });
    }
  };

  const mailtoHref = () => {
    const { name, message } = getValues();
    const subject = encodeURIComponent(`Pesan portofolio dari ${name}`);
    const body = encodeURIComponent(message);
    return `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
          Nama
        </label>
        <input
          id="name"
          type="text"
          autoComplete="name"
          placeholder="Nama Anda"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "name-error" : undefined}
          className={inputClasses}
          {...register("name")}
        />
        {errors.name && (
          <p id="name-error" role="alert" className="mt-1.5 text-xs text-red-500">
            {errors.name.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="nama@email.com"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
          className={inputClasses}
          {...register("email")}
        />
        {errors.email && (
          <p id="email-error" role="alert" className="mt-1.5 text-xs text-red-500">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium">
          Pesan
        </label>
        <textarea
          id="message"
          rows={6}
          placeholder="Ceritakan proyek atau peluang yang ingin Anda diskusikan..."
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={cn(inputClasses, "resize-y")}
          {...register("message")}
        />
        {errors.message && (
          <p id="message-error" role="alert" className="mt-1.5 text-xs text-red-500">
            {errors.message.message}
          </p>
        )}
      </div>

      <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">
        {isSubmitting ? (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
        ) : (
          <Send className="h-4 w-4" aria-hidden="true" />
        )}
        {isSubmitting ? "Mengirim..." : "Kirim Pesan"}
      </Button>

      <div aria-live="polite">
        {state.status === "success" && !state.fallback && (
          <div className="flex items-start gap-2.5 rounded-lg border border-green-500/30 bg-green-500/10 p-4 text-sm text-green-600 dark:text-green-400">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            <p>Pesan berhasil dikirim. Saya akan membalas secepatnya!</p>
          </div>
        )}
        {state.status === "success" && state.fallback && (
          <div className="flex items-start gap-2.5 rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-600 dark:text-amber-400">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            <p>
              Layanan email belum aktif di server ini. Silakan kirim langsung
              lewat{" "}
              <a href={mailtoHref()} className="font-semibold underline">
                aplikasi email Anda
              </a>
              .
            </p>
          </div>
        )}
        {state.status === "error" && (
          <div className="flex items-start gap-2.5 rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-600 dark:text-red-400">
            <XCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            <p>{state.message}</p>
          </div>
        )}
      </div>
    </form>
  );
}
