import { postProjectForm } from "@/api/requestForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const formSchema = z.object({
  projectName: z.string().min(1, "Project Name is required"),
  twitterHandle: z.string().min(1, "Twitter handle is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  websiteLink: z.string().url("Invalid URL"),
  telegramLink: z.string().url("Invalid URL"),
  githubLink: z.string().url("Invalid URL"),
  contractAddress: z.string().min(32, "Aptos address is required"),
  category: z.string().min(1, "Category is required"),
  framework: z.string().min(1, "Framework information is required"),
  devTwitter: z.string().optional(),
  doxxed: z.enum(["yes", "no"]),
  hasToken: z.enum(["yes", "no"]),
  isOnTeam: z.enum(["yes", "no"]),
});

export type FormData = z.infer<typeof formSchema>;

export default function Request() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectName: "",
      twitterHandle: "",
      description: "",
      websiteLink: "",
      telegramLink: "",
      githubLink: "",
      contractAddress: "",
      category: "",
      framework: "",
      devTwitter: "",
      doxxed: undefined,
      hasToken: undefined,
      isOnTeam: undefined,
    },
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    await postProjectForm(data)
      .then(() => {
        alert(
          "Form submitted successfully 🚀\nMindshare data will be reflected within 24 hours"
        );
      })
      .catch(() => {
        alert("Something went wrong, please try again");
      });
    reset({
      projectName: "",
      twitterHandle: "",
      description: "",
      websiteLink: "",
      telegramLink: "",
      githubLink: "",
      contractAddress: "",
      category: undefined, // ✅ Clears Select
      framework: "",
      devTwitter: "",
      doxxed: undefined, // ✅ Clears RadioGroup
      hasToken: undefined, // ✅ Clears RadioGroup
      isOnTeam: undefined, // ✅ Clears RadioGroup
    });
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto bg-[#171717] p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold mb-4">Submit Your Project</h2>
        <button
          onClick={() => navigate("/")}
          className="hover:text-gray-600 cursor-pointer text-white transition duration-300"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 mt-8">
        {/* Project Name */}
        <div className="flex flex-col gap-3">
          <Label>Project Name *</Label>
          <Input
            {...register("projectName")}
            placeholder="Enter project name"
          />
          {errors.projectName && (
            <p className="text-red-500 text-sm">{errors.projectName.message}</p>
          )}
        </div>

        {/* Twitter Handle */}
        <div className="flex flex-col gap-3">
          <Label>Twitter Handle *</Label>
          <Input {...register("twitterHandle")} placeholder="@projectTwitter" />
          {errors.twitterHandle && (
            <p className="text-red-500 text-sm">
              {errors.twitterHandle.message}
            </p>
          )}
        </div>

        {/* Description */}
        <div className="flex flex-col gap-3">
          <Label>Description *</Label>
          <Textarea
            maxLength={500}
            cols={2}
            {...register("description")}
            placeholder="Describe the project..."
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>

        {/* Website */}
        <div className="flex flex-col gap-3">
          <Label>Website *</Label>
          <Input
            {...register("websiteLink")}
            placeholder="https://example.com"
          />
          {errors.websiteLink && (
            <p className="text-red-500 text-sm">{errors.websiteLink.message}</p>
          )}
        </div>

        {/* Telegram */}
        <div className="flex flex-col gap-3">
          <Label>Telegram *</Label>
          <Input
            {...register("telegramLink")}
            placeholder="https://t.me/project"
          />
          {errors.telegramLink && (
            <p className="text-red-500 text-sm">
              {errors.telegramLink.message}
            </p>
          )}
        </div>

        {/* GitHub */}
        <div className="flex flex-col gap-3">
          <Label>GitHub *</Label>
          <Input
            {...register("githubLink")}
            placeholder="https://github.com/project"
          />
          {errors.githubLink && (
            <p className="text-red-500 text-sm">{errors.githubLink.message}</p>
          )}
        </div>

        {/* GitHub */}
        <div className="flex flex-col gap-3">
          <Label>Address *</Label>
          <Input {...register("contractAddress")} placeholder="Aptos address" />
          {errors.contractAddress && (
            <p className="text-red-500 text-sm">
              {errors.contractAddress.message}
            </p>
          )}
        </div>

        {/* Category */}
        <div className="flex flex-col gap-3">
          <Label>Category *</Label>
          <Controller
            name="category"
            control={control}
            rules={{ required: "Category is required" }}
            render={({ field }) => (
              <Select
                onValueChange={field.onChange}
                value={field.value ?? undefined}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {[
                    "Agents",
                    "Apps",
                    "Framework",
                    "Platform",
                    "Data Provider",
                    "Memes",
                    "Others",
                    "Uncertain",
                  ].map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.category && (
            <p className="text-red-500 text-sm">{errors.category.message}</p>
          )}
        </div>

        {/* Framework */}
        <div className="flex flex-col gap-3">
          <Label>Framework *</Label>
          <Input
            {...register("framework")}
            placeholder="e.g., ai16z, Virtuals, Top Hat"
          />
          {errors.framework && (
            <p className="text-red-500 text-sm">{errors.framework.message}</p>
          )}
        </div>

        {/* Dev Twitter */}
        <div className="flex flex-col gap-3">
          <Label>Dev Twitter (Optional)</Label>
          <Input {...register("devTwitter")} placeholder="@devTwitter" />
        </div>

        {/* Dev Doxxed */}
        <div className="flex flex-col gap-3">
          <Label>Is the Dev doxxed? *</Label>
          <Controller
            name="doxxed"
            control={control}
            rules={{ required: "This field is required" }}
            render={({ field }) => (
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value ?? undefined}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="r1-doxxed" />
                  <Label htmlFor="r1-doxxed">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="r2-doxxed" />
                  <Label htmlFor="r2-doxxed">No</Label>
                </div>
              </RadioGroup>
            )}
          />
          {errors.doxxed && (
            <p className="text-red-500 text-sm">{errors.doxxed.message}</p>
          )}
        </div>

        {/* Has Token */}
        <div className="flex flex-col gap-3">
          <Label>Does the project have a Token? *</Label>
          <Controller
            name="hasToken"
            control={control}
            rules={{ required: "This field is required" }}
            render={({ field }) => (
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value ?? undefined}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="r1-hasToken" />
                  <Label htmlFor="r1-hasToken">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="r2-hasToken" />
                  <Label htmlFor="r2-hasToken">No</Label>
                </div>
              </RadioGroup>
            )}
          />

          {errors.hasToken && (
            <p className="text-red-500 text-sm">{errors.hasToken.message}</p>
          )}
        </div>

        {/* Team Member */}
        <div className="flex flex-col gap-3">
          <Label>Are you on the project's team? *</Label>
          <Controller
            name="isOnTeam"
            control={control}
            rules={{ required: "This field is required" }}
            render={({ field }) => (
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value ?? undefined}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="r1-teamMember" />
                  <Label htmlFor="r1-teamMember">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="r2-teamMember" />
                  <Label htmlFor="r2-teamMember">No</Label>
                </div>
              </RadioGroup>
            )}
          />
          {errors.isOnTeam && (
            <p className="text-red-500 text-sm">{errors.isOnTeam.message}</p>
          )}
        </div>

        {/* Submit Button */}
        {loading ? (
          <div className="w-full flex justify-center items-center">
            <Loader2 className="h-8 w-8 animate-spin text-gray-500 dark:text-gray-400" />
          </div>
        ) : (
          <Button type="submit" className="w-full cursor-pointer">
            Submit
          </Button>
        )}
      </form>
    </div>
  );
}
