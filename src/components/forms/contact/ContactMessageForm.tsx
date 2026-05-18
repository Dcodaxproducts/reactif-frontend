import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { contactFields } from "@/data/contact";
import { FormField } from "./FormField";

export function ContactMessageForm() {
  return (
    <div className="relative flex-1 overflow-hidden">
      <div
        className="absolute inset-0 blur-[20px]"
        style={{
          background:
            "conic-gradient(from 162deg at 58% 96%, rgba(255,172,136,0.5) 0deg, rgba(242,98,181,0) 125deg, rgba(95,197,255,0.5) 193deg, rgba(128,84,255,0.5) 236deg, rgba(119,157,255,0.5) 260deg, rgba(159,115,241,0) 311deg)",
        }}
      />

      <div className="relative z-10 flex flex-col gap-6 md:gap-8 bg-black/40 backdrop-blur-xl border-t md:border-t-0 md:border-l border-stone-500 p-6 sm:p-8 md:p-10">
        <FormField label="Full Name" />

        <div className="flex flex-col sm:flex-row gap-4 md:gap-5">
          {contactFields.map((field) => (
            <FormField key={field.name} label={field.label} type={field.type} />
          ))}
        </div>

        <div className="flex flex-col gap-2">
          <Label className="text-[#F5F5F580] text-xs md:text-sm font-medium">
            Service Interested In
          </Label>
          <Select>
            <SelectTrigger className="h-11 md:h-12 rounded-xl bg-zinc-800/25 border border-blue-600 px-4 text-white outline-none">
              <SelectValue placeholder="Select a service" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="vehicle-wraps">Select a service</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <Label className="text-[#F5F5F580] text-xs md:text-sm font-medium">
            Message
          </Label>
          <Textarea className="h-32 md:h-40 rounded-2xl bg-zinc-800/25 border border-white/10 px-4 py-3 text-white outline-none resize-none focus:border-blue-500 transition" />
        </div>

        <Button className="h-11 md:h-12 bg-white rounded-xl text-zinc-800 text-base md:text-lg font-semibold flex justify-center items-center gap-2 hover:scale-[1.02] transition hover:bg-white">
          Send Message →
        </Button>
      </div>
    </div>
  );
}
