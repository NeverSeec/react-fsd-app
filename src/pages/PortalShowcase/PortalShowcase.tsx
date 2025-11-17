import { Tooltip, TooltipPosition } from "shared/ui/Tooltip";
import { useConfirmDialog } from "shared/ui/ConfirmDialog";
import { useTheme } from "shared/ui/Theme";

export function PortalShowcase() {
  const { showConfirmDialog, ConfirmDialog } = useConfirmDialog();
  const { toggleTheme, theme } = useTheme();
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        gap: "8px",
        width: "100%",
      }}
    >
      <button onClick={toggleTheme}>Тема: {theme}</button>
      {ConfirmDialog}
      <Tooltip content={"Тултип"} placement={TooltipPosition.BOTTOM}>
        <button
          onClick={() =>
            showConfirmDialog({ title: "ConfirmDialog", description: "Круто" })
          }
        >
          Тултип внизу и ConfirmDialog
        </button>
      </Tooltip>
      <Tooltip content={"Тултип"} placement={TooltipPosition.TOP}>
        <button>Тултип сверху</button>
      </Tooltip>
      <Tooltip content={"Тултип"} placement={TooltipPosition.LEFT}>
        <button>Тултип слева</button>
      </Tooltip>
      <Tooltip content={"Тултип"} placement={TooltipPosition.RIGHT}>
        <button>Тултип справа</button>
      </Tooltip>
    </div>
  );
}
