"use client";

import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  Headphones,
  Building,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useTranslations } from "next-intl";

const ContactPage = () => {
  const t = useTranslations("contact");

  const contactInfo = [
    {
      icon: Phone,
      title: t("info.phone.title"),
      detail: t("info.phone.detail"),
      sub: t("info.phone.sub"),
    },
    {
      icon: Mail,
      title: t("info.email.title"),
      detail: t("info.email.detail"),
      sub: t("info.email.sub"),
    },
    {
      icon: MapPin,
      title: t("info.location.title"),
      detail: t("info.location.detail"),
      sub: t("info.location.sub"),
    },
    {
      icon: Clock,
      title: t("info.hours.title"),
      detail: t("info.hours.detail"),
      sub: t("info.hours.sub"),
    },
  ];

  const supportTopics = [
    {
      icon: MessageSquare,
      title: t("support.general.title"),
      desc: t("support.general.desc"),
    },
    {
      icon: Headphones,
      title: t("support.loan.title"),
      desc: t("support.loan.desc"),
    },
    {
      icon: Building,
      title: t("support.partnership.title"),
      desc: t("support.partnership.desc"),
    },
    {
      icon: Send,
      title: t("support.press.title"),
      desc: t("support.press.desc"),
    },
  ];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="pt-12 pb-16 md:pt-15 md:pb-25 bg-[hsl(215,28%,12%)] relative overflow-hidden">
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.03]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="contact-cross"
              x="0"
              y="0"
              width="28"
              height="28"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M14 6v16M6 14h16"
                stroke="currentColor"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#contact-cross)" />
        </svg>
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-[hsl(160,84%,39%)]/8 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[hsl(160,84%,39%)]/5 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge with corner brackets */}
            <div className="flex justify-center mb-6">
              <div
                className="group inline-block text-sm font-medium text-[hsl(160,84%,35%)] px-4 py-1 rounded-full relative hover:px-6 transition-[padding] duration-500 ease-in-out"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                <span
                  className="absolute top-0 left-1 w-3 h-3 border-l-2 border-t-2 rounded-tl-sm group-hover:left-0 transition-[left] duration-500 ease-in-out"
                  style={{ borderColor: "hsl(160, 84%, 39%)" }}
                ></span>
                <span
                  className="absolute bottom-0 right-1 w-3 h-3 border-r-2 border-b-2 rounded-br-sm group-hover:right-0 transition-[right] duration-500 ease-in-out"
                  style={{ borderColor: "hsl(160, 84%, 39%)" }}
                ></span>
                <span className="uppercase tracking-wider font-semibold">
                  {t("hero.badge")}
                </span>
              </div>
            </div>

            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-3 mb-6"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {t("hero.title1")}{" "}
              <span className="text-[hsl(160,84%,39%)]">{t("hero.title2")}</span>
            </h1>
            <p
              className="text-white/60 text-lg max-w-2xl mx-auto"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {t("hero.description")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 pt-24 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 -mt-12 relative z-20">
            {contactInfo.map((c, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="bg-white border border-[hsl(214,20%,90%)] rounded-xl p-6 text-center transition-all group relative overflow-hidden"
                style={{
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.07)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 20px 40px hsla(160, 84%, 39%, 0.12)";

                  const topBar =
                    e.currentTarget.querySelector(".contact-top-bar") as HTMLElement;
                  if (topBar) {
                    topBar.style.transform = "scaleX(1)";
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 4px 6px rgba(0, 0, 0, 0.07)";

                  const topBar =
                    e.currentTarget.querySelector(".contact-top-bar") as HTMLElement;
                  if (topBar) {
                    topBar.style.transform = "scaleX(0)";
                  }
                }}
              >
                <div
                  className="contact-top-bar absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-[hsl(160,84%,39%)]/60 via-[hsl(160,84%,39%)] to-[hsl(160,84%,39%)]/60 transition-transform duration-300 origin-left"
                  style={{ transform: "scaleX(0)" }}
                />
                <div className="w-12 h-12 rounded-xl bg-linear-to-br from-[hsl(160,84%,39%)]/20 to-[hsl(160,84%,39%)]/5 flex items-center justify-center mx-auto mb-4">
                  <c.icon className="text-[hsl(160,84%,39%)]" size={22} />
                </div>
                <h3
                  className="font-semibold text-[hsl(215,28%,12%)] mb-1"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {c.title}
                </h3>
                <p
                  className="text-[hsl(215,28%,12%)] font-medium text-sm"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {c.detail}
                </p>
                <p
                  className="text-[hsl(215,14%,46%)] text-xs mt-1"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {c.sub}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Form + Support Topics */}
      <section className="py-20 md:py-28 bg-[hsl(210,25%,97%)] relative overflow-hidden">
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.02]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="form-dots"
              x="0"
              y="0"
              width="24"
              height="24"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="2" cy="2" r="1" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#form-dots)" />
        </svg>

        {/* Background Gradient Blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-1/4 w-96 h-96 rounded-full bg-[hsl(160,84%,39%)]/6 blur-3xl" />
          <div className="absolute bottom-20 left-1/4 w-80 h-80 rounded-full bg-[hsl(160,84%,39%)]/4 blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-5 gap-12 items-start">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-3"
            >
              <h2
                className="text-2xl md:text-3xl font-bold text-[hsl(215,28%,12%)] mb-2"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {t("form.heading")}
              </h2>
              <p
                className="text-[hsl(215,14%,46%)] mb-8"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {t("form.description")}
              </p>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      className="text-sm font-medium text-[hsl(215,28%,12%)] mb-2 block"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {t("form.fields.name.label")}
                    </label>
                    <Input
                      placeholder={t("form.fields.name.placeholder")}
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="bg-white border-[hsl(214,20%,90%)] focus:ring-2 focus:ring-[hsl(160,84%,39%)] focus:border-transparent h-12"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    />
                  </div>
                  <div>
                    <label
                      className="text-sm font-medium text-[hsl(215,28%,12%)] mb-2 block"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {t("form.fields.email.label")}
                    </label>
                    <Input
                      type="email"
                      placeholder={t("form.fields.email.placeholder")}
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="bg-white border-[hsl(214,20%,90%)] focus:ring-2 focus:ring-[hsl(160,84%,39%)] focus:border-transparent h-12"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      className="text-sm font-medium text-[hsl(215,28%,12%)] mb-2 block"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {t("form.fields.phone.label")}
                    </label>
                    <Input
                      type="tel"
                      placeholder={t("form.fields.phone.placeholder")}
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="bg-white border-[hsl(214,20%,90%)] focus:ring-2 focus:ring-[hsl(160,84%,39%)] focus:border-transparent h-12"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    />
                  </div>
                  <div>
                    <label
                      className="text-sm font-medium text-[hsl(215,28%,12%)] mb-2 block"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {t("form.fields.subject.label")}
                    </label>
                    <Input
                      placeholder={t("form.fields.subject.placeholder")}
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      className="bg-white border-[hsl(214,20%,90%)] focus:ring-2 focus:ring-[hsl(160,84%,39%)] focus:border-transparent h-12"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    />
                  </div>
                </div>
                <div>
                  <label
                    className="text-sm font-medium text-[hsl(215,28%,12%)] mb-2 block"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {t("form.fields.message.label")}
                  </label>
                  <Textarea
                    placeholder={t("form.fields.message.placeholder")}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="bg-white border-[hsl(214,20%,90%)] focus:ring-2 focus:ring-[hsl(160,84%,39%)] focus:border-transparent resize-none h-101.25"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  />
                </div>
                <div className="flex justify-start sm:justify-end">
                  <Button
                    variant="default"
                    size="lg"
                    type="submit"
                    className="gap-2 w-full sm:w-auto bg-[hsl(160,84%,39%)] text-white hover:bg-[hsl(160,84%,35%)] ring-2 ring-[hsl(160,84%,39%)] ring-offset-2 ring-offset-[hsl(210,25%,97%)] outline-none h-11 px-6 rounded-lg text-sm"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {t("form.button")} <Send size={18} />
                  </Button>
                </div>
              </form>
            </motion.div>

            {/* Support Topics */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2 space-y-5"
            >
              <h3
                className="text-xl font-bold text-[hsl(215,28%,12%)] mb-6"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {t("support.heading")}
              </h3>
              {supportTopics.map((topic, index) => (
                <div
                  key={index}
                  className="bg-white border border-[hsl(214,20%,90%)] rounded-xl p-5 hover:border-[hsl(160,84%,39%)]/30 transition-colors group cursor-pointer"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-linear-to-br from-[hsl(160,84%,39%)]/20 to-[hsl(160,84%,39%)]/5 flex items-center justify-center shrink-0">
                      <topic.icon className="text-[hsl(160,84%,39%)]" size={18} />
                    </div>
                    <div>
                      <h4
                        className="font-semibold text-[hsl(215,28%,12%)] text-sm mb-1"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                      >
                        {topic.title}
                      </h4>
                      <p
                        className="text-[hsl(215,14%,46%)] text-xs leading-relaxed"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                      >
                        {topic.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Map placeholder */}
              <div className="bg-white border border-[hsl(214,20%,90%)] rounded-xl overflow-hidden mt-6">
                <div className="h-64 bg-linear-to-br from-[hsl(215,28%,12%)]/10 to-[hsl(160,84%,39%)]/5 flex items-center justify-center relative">
                  <div className="absolute inset-0 opacity-10">
                    <svg
                      className="w-full h-full"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <defs>
                        <pattern
                          id="map-grid"
                          x="0"
                          y="0"
                          width="20"
                          height="20"
                          patternUnits="userSpaceOnUse"
                        >
                          <path
                            d="M 20 0 L 0 0 0 20"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="0.3"
                          />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#map-grid)" />
                    </svg>
                  </div>
                  <div className="text-center relative z-10">
                    <MapPin
                      className="text-[hsl(160,84%,39%)] mx-auto mb-2"
                      size={32}
                    />
                    <p
                      className="text-[hsl(215,28%,12%)] font-semibold text-base"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {t("info.location.detail")}, {t("info.location.sub")}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ CTA */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h3
            className="text-2xl font-bold text-[hsl(215,28%,12%)] mb-3"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {t("faq.heading")}
          </h3>
          <p
            className="text-[hsl(215,14%,46%)] mb-6 max-w-md mx-auto"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {t("faq.description")}
          </p>
          <Button
            variant="outline"
            size="lg"
            onClick={() => (window.location.href = "/#faq")}
            className="border-2 border-[hsl(214,20%,90%)] text-[hsl(215,28%,12%)] hover:border-[hsl(160,84%,39%)] hover:text-[hsl(160,84%,39%)] hover:bg-[hsl(160,84%,39%)]/5 h-11 px-6 rounded-lg text-sm"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {t("faq.button")}
          </Button>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
