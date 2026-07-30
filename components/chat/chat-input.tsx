import { ArrowUp, Square } from "lucide-react";

import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

interface ChatInputProps {
  input: string;
  setInput: (value: string) => void;
  onSubmit: () => void;
  isStreaming: boolean;
  onStop: () => void;
}

const ChatInput = ({
  input,
  setInput,
  onSubmit,
  isStreaming,
  onStop,
}: ChatInputProps) => {
  return (
    <div className="border-t bg-background pt-4">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit();
        }}
        className="
          relative rounded-2xl border bg-background shadow-sm
          transition-all
          focus-within:border-primary/60
          focus-within:ring-2
          focus-within:ring-primary/15
        "
      >
        <Textarea
          value={input}
          disabled={isStreaming}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();

              if (!isStreaming) {
                event.currentTarget.form?.requestSubmit();
              }
            }
          }}
          placeholder="Ask about your spending..."
          className="
            min-h-[64px]
            resize-none
            border-0
            bg-transparent
            py-5
            pl-4
            pr-16
            shadow-none
            focus-visible:ring-0
          "
        />

        {isStreaming ? (
          <Button
            type="button"
            size="icon"
            variant="secondary"
            onClick={onStop}
            className="
              absolute right-3 top-1/2
              size-9 -translate-y-1/2
              rounded-xl
            "
          >
            <Square className="size-3.5 fill-current" />
          </Button>
        ) : (
          <Button
            type="submit"
            size="icon"
            disabled={!input.trim()}
            className="
              absolute right-3 top-1/2
              size-9 -translate-y-1/2
              rounded-xl
            "
          >
            <ArrowUp className="size-4" />
          </Button>
        )}
      </form>

      <p className="mt-2 text-center text-xs text-muted-foreground">
        AI can make mistakes. Verify important financial information.
      </p>
    </div>
  );
};

export default ChatInput;
