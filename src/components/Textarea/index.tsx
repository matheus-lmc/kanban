import { ComponentProps, useEffect, useRef } from "react";

interface TextAreaProps extends ComponentProps<"textarea"> {
  stateValue: string;
}

// Auto growing textarea

function TextArea({ stateValue, ...props }: TextAreaProps) {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "0px";
      const scrollHeight = textAreaRef.current.scrollHeight;
      textAreaRef.current.style.height = scrollHeight + "px";
    }
  }, [textAreaRef, stateValue]);

  return <textarea rows={1} ref={textAreaRef} {...props}></textarea>;
}

export default TextArea;
