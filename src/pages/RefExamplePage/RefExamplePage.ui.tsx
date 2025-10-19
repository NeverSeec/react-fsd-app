import {
  ClickTimer,
  DebouncedLogger,
  FocusTracker,
  PreviousInput,
  WebSocketLogger,
} from "features/refExamples";

export function RefExamplePage() {
  return (
    <div>
      <ClickTimer />
      <PreviousInput />
      <FocusTracker />
      <DebouncedLogger />
      <WebSocketLogger />
    </div>
  );
}
