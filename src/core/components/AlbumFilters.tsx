import { Search, X, Bookmark, Heart, RotateCcw } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import TextInput from "@/components/custom/TextInput";
import IconController from "@/features/collection/components/IconController";
import { FiltersFormData } from "../types/FiltersTypes";

interface AlbumFiltersProps {
  form: UseFormReturn<FiltersFormData, unknown, undefined>;
}

export default function AlbumFilters({ form }: AlbumFiltersProps) {
  const { control, register, resetField, watch, reset } = form;
  const query = watch("query");

  const handleReset = () => {
    reset();
  };

  return (
    <form
      onSubmit={(event) => event.preventDefault()}
      className="w-full flex gap-4 p-4 sticky top-0 z-20 bg-gradient h-[70px] lg:sticky lg:top-[70px] lg:z-20"
    >
      <div className="relative lg:w-80">
        <TextInput {...register("query")} className="!px-12 " placeholder="Filter by name..." />
        <div className="absolute h-full top-0 items-center flex left-4">
          <Search size={20} strokeWidth={2.25} />
        </div>
        <div className="absolute h-full top-0 items-center flex right-4 cursor-pointer">
          {query.length > 0 && (
            <X
              className="cursor-pointer"
              size={20}
              strokeWidth={3}
              onClick={() => resetField("query")}
            />
          )}
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <IconController name="owned" control={control} IconComponent={Bookmark} />
        <IconController name="liked" control={control} IconComponent={Heart} />
        <button onClick={handleReset} className="text-cream mx-2">
          <RotateCcw size={25} color="currentColor" strokeWidth={2} />
        </button>
      </div>
    </form>
  );
}
