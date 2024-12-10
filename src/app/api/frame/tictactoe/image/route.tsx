import { ImageResponse } from "next/og";
import { GameState } from "~/types/game";

export const runtime = "edge";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const stateParam = searchParams.get("state");
  const state: GameState = stateParam ? JSON.parse(decodeURIComponent(stateParam)) : null;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          backgroundColor: "#1a1a1a",
          color: "white",
          padding: "40px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "10px",
            width: "300px",
            height: "300px",
          }}
        >
          {state?.board.map((cell, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#333",
                fontSize: "48px",
                fontWeight: "bold",
                border: "2px solid #7C65C1",
                borderRadius: "8px",
              }}
            >
              {cell || ""}
            </div>
          ))}
        </div>
        <div
          style={{
            marginTop: "20px",
            fontSize: "24px",
            fontWeight: "bold",
          }}
        >
          {state?.winner
            ? state.winner === "draw"
              ? "It's a draw!"
              : `Player ${state.winner} wins!`
            : `Player ${state?.currentPlayer}'s turn`}
        </div>
      </div>
    ),
    {
      width: 400,
      height: 500,
    }
  );
} 