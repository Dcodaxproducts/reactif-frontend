"use client";

import { useMemo, useState } from "react";
import {
  FiClock,
  FiLifeBuoy,
  FiMail,
  FiRefreshCw,
  FiSearch,
} from "react-icons/fi";

import { Container } from "@/components/common/Container";
import { StatusCard } from "@/components/common/StatusCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppTranslation } from "@/hooks/useAppTranslation";
import { useCustomerSupportRequests } from "@/hooks/useCustomerSupport";
import { cn } from "@/lib/utils";
import type { CustomerSupportRequest } from "@/types/support";

const getInitials = (name: string, fallback: string) =>
  (name || fallback)
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

const formatDate = (value: string, fallback: string) => {
  if (!value) return fallback;

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return fallback;

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
};

const isUnauthorizedError = (error: unknown) =>
  typeof error === "object" &&
  error !== null &&
  "response" in error &&
  (error as { response?: { status?: number } }).response?.status === 401;

export function SupportRequestsSection() {
  const { t } = useAppTranslation();
  const query = useCustomerSupportRequests();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRequests = useMemo(() => {
    const queryText = searchQuery.trim().toLowerCase();
    if (!queryText) return query.requests;

    return query.requests.filter((request) => {
      const values = [
        request.id,
        request.name,
        request.email,
        request.service,
        request.subject,
        request.message,
        request.status,
      ];

      return values.some((value) => value.toLowerCase().includes(queryText));
    });
  }, [query.requests, searchQuery]);

  const openTotal = query.requests.filter(
    (request) => request.status.toLowerCase() !== "closed",
  ).length;
  const errorMessage = isUnauthorizedError(query.rawError)
    ? t("supportRequests.signInRequired")
    : query.error || t("supportRequests.loadError");

  return (
    <section className="relative overflow-hidden py-14 md:py-20">
      <Container gutter="page" width="7xl">
        <div className="overflow-hidden rounded-3xl border border-neutral-50/15 bg-neutral-900/95 shadow-2xl shadow-black/20 lg:grid lg:grid-cols-[380px_1fr]">
          <aside className="border-b border-neutral-50/10 bg-neutral-950/70 p-5 sm:p-6 lg:border-b-0 lg:border-r">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-pink-300">
                  {t("supportRequests.eyebrow")}
                </p>
                <h2 className="mt-2 text-3xl font-semibold text-neutral-50 font-hk">
                  {t("supportRequests.title")}
                </h2>
                <p className="mt-2 text-sm leading-6 text-neutral-50/60">
                  {t("supportRequests.description")}
                </p>
              </div>

              <div className="rounded-2xl border border-pink-300/30 bg-pink-400/10 p-3 text-pink-200">
                <FiLifeBuoy size={22} />
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-neutral-50/10 bg-neutral-800/80 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-neutral-50/50">
                  {t("supportRequests.total")}
                </p>
                <p className="mt-1 text-2xl font-semibold text-neutral-50">
                  {query.requests.length}
                </p>
              </div>
              <div className="rounded-2xl border border-neutral-50/10 bg-neutral-800/80 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-neutral-50/50">
                  {t("supportRequests.open")}
                </p>
                <p className="mt-1 text-2xl font-semibold text-neutral-50">
                  {openTotal}
                </p>
              </div>
            </div>

            <label className="relative mt-5 block">
              <span className="sr-only">{t("supportRequests.search")}</span>
              <FiSearch
                aria-hidden
                className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-50/40"
                size={18}
              />
              <Input
                value={searchQuery}
                onChange={({ target }) => setSearchQuery(target.value)}
                placeholder={t("supportRequests.searchPlaceholder")}
                className="h-12 rounded-2xl border-neutral-50/10 bg-neutral-800 pl-11 text-neutral-50 placeholder:text-neutral-50/40"
              />
            </label>
          </aside>

          <div className="min-h-[420px] bg-[radial-gradient(circle_at_top_right,rgba(244,114,182,0.18),transparent_34%),linear-gradient(135deg,#171717,#0a0a0a)]">
            {query.loading ? (
              <div className="flex flex-col gap-3 p-5 sm:p-6">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className="h-24 animate-pulse rounded-2xl bg-neutral-800/80"
                  />
                ))}
              </div>
            ) : null}

            {!query.loading && query.error ? (
              <StatusCard
                tone="error"
                label={t("common.backendError")}
                title={errorMessage}
                action={
                  <Button
                    type="button"
                    variant="neutralOutline"
                    className="h-10 rounded-full px-5"
                    onClick={() => query.refetch()}
                  >
                    <FiRefreshCw size={16} />
                    {t("supportRequests.retry")}
                  </Button>
                }
                className="m-5 p-6 sm:m-6"
              />
            ) : null}

            {!query.loading && !query.error && filteredRequests.length === 0 ? (
              <div className="flex min-h-[420px] items-center p-5 sm:p-6">
                <StatusCard
                  tone="empty"
                  label={t("common.noDataFound")}
                  title={
                    searchQuery
                      ? t("supportRequests.noResultsTitle")
                      : t("supportRequests.emptyTitle")
                  }
                  description={
                    searchQuery
                      ? t("supportRequests.noResultsDescription")
                      : t("supportRequests.emptyDescription")
                  }
                  className="w-full p-6"
                />
              </div>
            ) : null}

            {!query.loading && !query.error && filteredRequests.length > 0 ? (
              <div className="divide-y divide-neutral-50/10">
                {filteredRequests.map((request) => (
                  <SupportRequestCard key={request.id} request={request} />
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}

function SupportRequestCard({
  request,
}: {
  request: CustomerSupportRequest;
}) {
  const { t } = useAppTranslation();
  const title =
    request.subject || request.service || t("supportRequests.requestFallback");
  const isClosed = request.status.toLowerCase() === "closed";

  return (
    <article className="group flex gap-4 p-5 transition hover:bg-neutral-800/60 sm:p-6">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-neutral-50/10 bg-neutral-800 text-sm font-semibold text-neutral-50">
        {getInitials(request.name, t("supportRequests.initialsFallback"))}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div className="min-w-0">
            <p className="truncate text-base font-semibold text-neutral-50">
              {title}
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-neutral-50/50">
              <span>{t("supportRequests.requestId", { id: request.id })}</span>
              <span className="hidden h-1 w-1 rounded-full bg-neutral-50/30 sm:block" />
              <span className="inline-flex items-center gap-1">
                <FiClock size={13} />
                {formatDate(
                  request.created_at,
                  t("supportRequests.dateFallback"),
                )}
              </span>
              {request.email ? (
                <>
                  <span className="hidden h-1 w-1 rounded-full bg-neutral-50/30 sm:block" />
                  <span className="inline-flex items-center gap-1">
                    <FiMail size={13} />
                    {request.email}
                  </span>
                </>
              ) : null}
            </div>
          </div>

          <Badge
            className={cn(
              "w-fit border px-3 py-1 text-xs capitalize",
              isClosed
                ? "border-neutral-50/15 bg-neutral-700/70 text-neutral-100"
                : "border-emerald-300/25 bg-emerald-400/10 text-emerald-100",
            )}
          >
            {request.status || t("supportRequests.statusFallback")}
          </Badge>
        </div>

        {request.service ? (
          <p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-pink-200/80">
            {request.service}
          </p>
        ) : null}

        <p className="mt-3 line-clamp-3 text-sm leading-6 text-neutral-50/60">
          {request.message || t("supportRequests.messageFallback")}
        </p>
      </div>
    </article>
  );
}
