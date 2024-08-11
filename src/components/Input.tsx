import AddImage from "@/icons/add_image.svg";
import MicrophoneIcon from "@/icons/microphone.svg";
import SendIcon from "@/icons/send.svg";
import {
  InputHTMLAttributes,
  LegacyRef,
  useEffect,
  useRef,
  useState,
} from "react";

export const AppInput = (
  props: InputHTMLAttributes<HTMLInputElement> & {
    handleSendMessageClick: (content: string) => void;
  }
) => {
  const [input, setInput] = useState("");
  const refInput = useRef<HTMLInputElement>();

  useEffect(() => {
    if (props.value) {
      refInput.current?.focus();
      setInput(props.value as string);
    }
  }, [props.value]);

  const onSendMessageClick = (e: any) => {
    e.preventDefault();
    props.handleSendMessageClick(input);
    setInput("");
  };

  return (
    <form onSubmit={onSendMessageClick}>
      <div className="w-full">
        <div className="flex bg-grey1 has-[:focus]:bg-grey2 py-2 pr-2 pl-6 rounded-full w-full animate-scaleXIn outline-none">
          <input
            {...props}
            autoFocus
            ref={refInput as LegacyRef<HTMLInputElement>}
            className="bg-grey1 bg-transparent w-full outline-none"
            placeholder={props?.placeholder ?? "Enter a prompt here"}
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
          />
          <div className="flex transition-colors">
            <button
              type="button"
              className="hover:bg-grey3 focus:bg-blue1 p-3 rounded-full transition-colors"
            >
              <AddImage />
            </button>
            <button
              type="button"
              className="hover:bg-grey3 focus:bg-blue1 p-3 rounded-full transition-colors"
            >
              <MicrophoneIcon />
            </button>
            {input ? (
              <button
                type="submit"
                onClick={onSendMessageClick}
                style={{ transformOrigin: "50% 50%" }}
                className="hover:bg-grey3 p-3 rounded-full transition-all animate-slide-in-right"
              >
                <SendIcon />
              </button>
            ) : null}
          </div>
        </div>
        <p className="px-0.5 py-4 text-center text-xs">
          Gemini may display inaccurate info, including about people, so
          double-check its responses. Your privacy and Gemini Apps
        </p>
      </div>
    </form>
  );
};
